// Copyright 2002-2014, University of Colorado Boulder

/**
 * Scenery node that displays a JSmol viewer.
 * Jmol scripting language is documented at http://chemapps.stolaf.edu/jmol/docs
 *
 * NOTE: This implementation requires JSmol 14.2.4, which incorrectly identifies itself
 * as 14.2.3 when Jmol._version is inspected in the debugger.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // inherit
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var DOM = require( 'SCENERY/nodes/DOM' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var DELTA = '\u03B4';

  // Jmol is loaded via <script> in the .html file, this prevents lint from complaining the Jmol is undefined.
  var Jmol = window.Jmol;

  // each Jmol object instance is given a new identifier, numbered sequentially
  var instanceNumber = 0;

  // function to call when the Jmol object has been created and is ready to receive commands
  var readyFunction = function( applet ) {
    console.log( applet._id + ' is ready' );
  };

  /**
   * Loads a molecule by URL, then sets things that must be set whenever molecule changes
   * @param {RealMolecule} molecule
   * @returns {string} JSmol script
   */
  var createLoadScript = function( molecule ) {
    var URL = window.URL || window.webkitURL || window;  // identify a URL object, not standardized across browsers
    var url = URL.createObjectURL( new Blob( [molecule.mol2Data], { type: 'plain/text', endings: 'native' } ) );
    return 'load ' + url + '\n' +  // load molecule
           'select oxygen; color [255,85,0]\n' + // colorblind red oxygen
           'select all\n' + // be polite to other commands that assume that everything is selected
           'wireframe 0.1\n' +
           'spacefill 25%\n' +
           'color bonds [128,128,128]\n' + // gray bonds
           'hover off\n'; // don't show atom label when hovering with mouse
  };

  // Jmol actions to unbind, all except _rotate
  var unbindActions = [
    '_clickFrank',
    '_depth',
    '_dragDrawObject',
    '_dragDrawPoint',
    '_dragLabel',
    '_dragSelected',
    '_navTranslate',
    '_pickAtom',
    '_pickIsosurface',
    '_pickLabel',
    '_pickMeasure',
    '_pickNavigate',
    '_pickPoint',
    '_popupMenu',
    '_reset',
    '_rotateSelected',
    '_rotateZ',
    '_rotateZorZoom',
    '_select',
    '_selectAndNot',
    '_selectNone',
    '_selectOr',
    '_selectToggle',
    '_selectToggleOr',
    '_setMeasure',
    '_slab',
    '_slabAndDepth',
    '_slideZoom',
    '_spinDrawObjectCCW',
    '_spinDrawObjectCW',
    '_swipe',
    '_translate',
    '_wheelZoom'
  ];

  /**
   * Creates a script for unbinding mouse actions from JSmol actions.
   * @returns {string} JSmol script
   */
  var createUnbindScript = function( actions ) {
    var script = '';
    actions.forEach( function( action ) {
      script += 'unbind ' + action + '\n';
    } );
    return script;
  };

  /**
   * Script to run when the Jmol object has finished loading
   * @param {RealMolecule} molecule
   * @returns {string} JSmol script
   */
  var createInitScript = function( molecule ) {
    return 'set autobond off\n' +
           'set frank off\n' +  // hide the Jmol logo
           'set dipoleScale 0.75\n' +  // so that molecular dipole isn't clipped by viewer or extend beyond isosurface
//           'set antialiasDisplay on\n' +  //TODO significant performance hit, is this necessary?
           createUnbindScript( unbindActions ) +
           createLoadScript( molecule );
  };

  /**
   * Converts a JavaScript or Scenery color to a Jmol color.
   * @param {string|Color} colorSpec
   * @returns {string} of the form [r,g,b]
   */
  var toJmolColor = function( colorSpec ) {
      var color = Color.toColor( colorSpec );
    return '[' + color.red + ',' + color.green + ',' + color.blue + ']';
  };

  /**
   * When any dipole is visible, make the atoms and bonds translucent, so we can see the dipoles through them.
   * @param applet
   * @param {boolean} bondDipolesVisible
   * @param {boolean} molecularDipoleVisible
   */
  var updateTranslucency = function( applet, bondDipolesVisible, molecularDipoleVisible ) {
    var arg = ( bondDipolesVisible || molecularDipoleVisible ) ? '0.25' : '0.0'; // 0.0=opaque, 1.0=transparent
    Jmol.script( applet, 'color atoms translucent ' + arg );
    Jmol.script( applet, 'color bonds translucent ' + arg );
  };

  var updateDipoles = function( applet, bondDipolesVisible, molecularDipoleVisible ) {
    if ( bondDipolesVisible ) {
      Jmol.script( applet, 'dipole bonds on width 0.05' );
    }
    else {
      Jmol.script( applet, 'dipole bonds off' );
    }

    if ( molecularDipoleVisible ) {
      Jmol.script( applet, 'dipole molecular on width 0.05' );
    }
    else {
      Jmol.script( applet, 'dipole molecular off' );
    }

    updateTranslucency( applet, bondDipolesVisible, molecularDipoleVisible );
  };

  var updateAtomLabelsAndPartialCharges = function( applet, atomLabelsVisible, partialChargesVisible ) {
    var args = '';
    if ( atomLabelsVisible || partialChargesVisible ) {
      if ( atomLabelsVisible ) {
        args += ' %[atomName]'; // show element and sequential atom index
      }
      if ( partialChargesVisible ) {
        if ( atomLabelsVisible ) {
          args += '|'; // line separator
        }
        args += DELTA + '=%.2[partialCharge]'; // show partial charges
      }
      //TODO try combining into 1 script so that labels don't jump around
      Jmol.script( applet, 'label ' + args );
      Jmol.script( applet, 'set labelalignment center; set labeloffset 0 0' );  // center labels on atoms
      Jmol.script( applet, 'color labels black' ); // color for all labels
      Jmol.script( applet, 'font labels 18 sanserif' ); // font for all labels
    }
    else {
      Jmol.script( applet, 'label off' );
    }
  };

  var updateSurface = function( applet, surfaceType ) {
    var diatomic = false; //XXX isHomogeneousDiatomic();
    if ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL_ROYGB ) {
      if ( diatomic ) {
        Jmol.script( applet, 'isosurface VDW color ' + toJmolColor( MPColors.NEUTRAL_POTENTIAL ) + ' translucent' );
      }
      else {
        Jmol.script( applet, 'isosurface VDW map MEP translucent' );
      }
    }
    else if ( surfaceType == SurfaceType.ELECTROSTATIC_POTENTIAL_RWB ) {
      if ( diatomic ) {
        Jmol.script( applet, 'isosurface VDW color white translucent' );
      }
      else {
        Jmol.script( applet, 'isosurface VDW map MEP colorscheme \"RWB\" translucent' );
      }
    }
    else if ( surfaceType == SurfaceType.ELECTRON_DENSITY ) {
      if ( diatomic ) {
        Jmol.script( applet, 'isosurface VDW color ' + toJmolColor( MPColors.NEUTRAL_GRAY ) + ' translucent' );
      }
      else {
        Jmol.script( applet, 'isosurface VDW map MEP colorscheme \"BW\" translucent' );
      }
    }
    else {
      Jmol.script( applet, 'isosurface off' );
    }
  };

  /**
   * @param {Property.<RealMolecule>} moleculeProperty
   * @param {JSmolProperties} jsmolProperties
   * @param {Object} [options]
   * @constructor
   */
  function JSmolViewerNode( moleculeProperty, jsmolProperties, options ) {

    options = _.extend( {
      viewerFill: 'white',
      viewerStroke: 'black', // {String} color of the viewer's background
      viewerSize: new Dimension2( 200, 200 )
    }, options );

    this.moleculeProperty = moleculeProperty; // @private
    this.jsmolProperties = jsmolProperties; // @private
    this.options = options; // @private

    // @private Put the Jmol object in a div, sized to match the Jmol object
    this.div = document.createElement( 'div' );
    this.div.style.width = options.viewerSize.width + 'px';
    this.div.style.height = options.viewerSize.height + 'px';
    this.div.style.border = '1px solid black';

    // @public JSmol must be added to the document after the sim is running
    this.initialized = false;

    options.preventTransform = true;
    DOM.call( this, this.div, options );
  }

  return inherit( DOM, JSmolViewerNode, {

    // Call this after the sim has started running
    initialize: function() {

      assert && assert( !this.initialized );

      var thisNode = this;

      // configuration for the JSmol object, called Info by convention
      var Info = {
        color: toJmolColor( this.options.viewerFill ), // background color of the JSmol object
        width: this.options.viewerSize.width, // width of the Jmol object in pixels or expressed as percent of its container width as a string in quotes: '100%'.
        height: this.options.viewerSize.width, // height, similar format as width
        debug: false, // Set this value to true if you are having problems getting your page to show the Jmol object
        j2sPath: 'jsmol-14.2.4/j2s', // path to the suite of JavaScript libraries needed for JSmol
        use: 'HTML5', // determines the various options to be tried (applet and surrogates) and the order in which to try them
        script: createInitScript( this.moleculeProperty.get() ), // script to run when the Jmol object has finished loading
        readyFunction: readyFunction, // function to call when the Jmol object has been created and is ready to receive commands
        disableJ2SLoadMonitor: true, // disable display of messages in a single line, colored, at bottom-left of the page
        disableInitialConsole: true // avoids the display of messages in the Jmol panel while the Jmol object is being built initially
      };

      Jmol.setDocument( false );
      var appletId = 'jmolApplet' + instanceNumber++;
      Jmol.getApplet( appletId, Info );
      this.div.innerHTML = Jmol.getAppletHtml( window[appletId] ); // creates window[appletId]
      var applet = window[appletId];
      applet._cover( false ); //TODO why do we need to call this?

      this.jsmolProperties.bondDipolesVisibleProperty.link( function( visible ) {
        updateDipoles( applet, visible, thisNode.jsmolProperties.molecularDipoleVisibleProperty.get() );
      } );

      this.jsmolProperties.molecularDipoleVisibleProperty.link( function( visible ) {
        updateDipoles( applet, thisNode.jsmolProperties.bondDipolesVisibleProperty.get(), visible );
      } );

      this.jsmolProperties.partialChargesVisibleProperty.link( function( visible ) {
        updateAtomLabelsAndPartialCharges( applet, thisNode.jsmolProperties.atomLabelsVisibleProperty.get(), visible );
      } );

      this.jsmolProperties.atomLabelsVisibleProperty.link( function( visible ) {
        updateAtomLabelsAndPartialCharges( applet, visible, thisNode.jsmolProperties.partialChargesVisibleProperty.get() );
      } );

      this.jsmolProperties.surfaceTypeProperty.link( function( surfaceType ) {
        console.log( 'surface type: ' + surfaceType );//TODO
        updateSurface( applet, surfaceType );
      } );

      this.initialized = true;
    },

    // @return {Array<Element>}
    getElements: function() {
      return []; //TODO
    }
  } );
} );
