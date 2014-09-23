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
  var RESULT_TRUE = 'true';
  var RESULT_FALSE = 'false';

  // constants
  var PRINT_DEBUG = true;

  // Jmol is loaded via <script> in the .html file, this prevents lint from complaining the Jmol is undefined.
  var Jmol = window.Jmol;

  // each Jmol object instance is given a new identifier, numbered sequentially
  var instanceNumber = 0;

  // identify a URL object, not standardized across browsers
  var URL = window.URL || window.webkitURL || window;

  var debug = function( message ) {
      if ( PRINT_DEBUG ) {
        console.log( message );
      }
  };

  var doScript = function( applet, script ) {
    Jmol.script( applet, script );
  };

  // Script to run when the Jmol object has finished loading
  var SCRIPT_INIT =
    'set autobond off\n' +
    'set frank off\n' +  // hide the Jmol logo
    'set dipoleScale 0.75\n';  // so that molecular dipole isn't clipped by viewer or extend beyond isosurface

  // Determines the element number and color of each atom in the current molecule.
  var SCRIPT_GET_ELEMENT_NUMBERS_AND_COLORS =
    'n = {*}.length\n' +
    'for ( i = 0; i < n; i++ ) {\n' +
    '    print {*}[i].elemno\n' +
    '    print {*}[i].color\n' +
    '}';

  // Jmol actions to unbind, all except _rotate
  var ACTIONS = [
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
   * Unbinds mouse actions from JSmol actions.
   * @param applet
   * @param {Array.<string>} actions
   */
  var unbindActions = function( applet, actions ) {
    var script = '';
    actions.forEach( function( action ) {
      script += 'unbind ' + action + '\n';
    } );
    doScript( applet, script );
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
   * Loads a molecule by URL, then sets things that must be set whenever molecule changes.
   * @param applet
   * @param {RealMolecule} molecule
   * @returns {string} JSmol script
   */
  var updateMolecule = function( applet, molecule, jsmolProperties ) {
    debug( 'updateMolecule' );

    var url = URL.createObjectURL( new Blob( [molecule.mol2Data], { type: 'plain/text', endings: 'native' } ) );

    // load molecule
    doScript( applet, 'load ' + url + '\n' );

    // reset misc settings that don't persist
    doScript( applet,
                 'select oxygen; color [255,85,0]\n' + // colorblind red oxygen
                 'select all\n' + // be polite to other commands that assume that everything is selected
                 'wireframe 0.1\n' + // draw bonds as lines
                 'spacefill 25%\n' +  // render atoms as a percentage of the van der Waals radius
                 'color bonds [128,128,128]\n' + // gray bonds
                 'hover off' ); // don't show atom label when hovering with mouse

    // rest more settings that don't persist
    updateDipoles( applet, jsmolProperties.bondDipolesVisibleProperty.get(), jsmolProperties.molecularDipoleVisibleProperty.get() );
    updateAtomLabelsAndPartialCharges( applet, jsmolProperties.atomLabelsVisibleProperty.get(), jsmolProperties.partialChargesVisibleProperty.get() );
    updateSurface( applet, jsmolProperties.surfaceTypeProperty.get() );
  };

  /**
   * When any dipole is visible, make the atoms and bonds translucent, so we can see the dipoles through them.
   * @param applet
   * @param {boolean} bondDipolesVisible
   * @param {boolean} molecularDipoleVisible
   */
  var updateTranslucency = function( applet, bondDipolesVisible, molecularDipoleVisible ) {
    debug( 'updateTransparency' );
    var arg = ( bondDipolesVisible || molecularDipoleVisible ) ? '0.25' : '0.0'; // 0.0=opaque, 1.0=transparent
    doScript( applet, 'color atoms translucent ' + arg );
    doScript( applet, 'color bonds translucent ' + arg );
  };

  /**
   * Updates visibility of dipoles
   * @param applet
   * @param {boolean} bondDipolesVisible
   * @param {boolean} molecularDipoleVisible
   */
  var updateDipoles = function( applet, bondDipolesVisible, molecularDipoleVisible ) {
    debug( 'updateDipoles' );
    if ( bondDipolesVisible ) {
      doScript( applet, 'dipole bonds on width 0.05' );
    }
    else {
      doScript( applet, 'dipole bonds off' );
    }

    if ( molecularDipoleVisible ) {
      doScript( applet, 'dipole molecular on width 0.05' );
    }
    else {
      doScript( applet, 'dipole molecular off' );
    }

    updateTranslucency( applet, bondDipolesVisible, molecularDipoleVisible );
  };

  /**
   * Updates visibility of atom labels and partial charges.
   * @param applet
   * @param {boolean} atomLabelsVisible
   * @param {boolean} partialChargesVisible
   */
  var updateAtomLabelsAndPartialCharges = function( applet, atomLabelsVisible, partialChargesVisible ) {
    debug( 'updateAtomLabelsAndPartialCharges' );
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
      doScript( applet, 'label ' + args );
      doScript( applet, 'set labelalignment center; set labeloffset 0 0' );  // center labels on atoms
      doScript( applet, 'color labels black' ); // color for all labels
      doScript( applet, 'font labels 18 sanserif' ); // font for all labels
    }
    else {
      doScript( applet, 'label off' );
    }
  };

  /**
   * Updates the type of surface displayed.
   * @param applet
   * @param {SurfaceType} surfaceType
   */
  var updateSurface = function( applet, surfaceType ) {
    debug( 'updateSurface' );
    var diatomic = isHomogeneousDiatomic( applet );
    if ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL_ROYGB ) {
      if ( diatomic ) {
        doScript( applet, 'isosurface VDW color ' + toJmolColor( MPColors.NEUTRAL_POTENTIAL ) + ' translucent' );
      }
      else {
        doScript( applet, 'isosurface VDW map MEP translucent' );
      }
    }
    else if ( surfaceType == SurfaceType.ELECTROSTATIC_POTENTIAL_RWB ) {
      if ( diatomic ) {
        doScript( applet, 'isosurface VDW color white translucent' );
      }
      else {
        doScript( applet, 'isosurface VDW map MEP colorscheme \"RWB\" translucent' );
      }
    }
    else if ( surfaceType == SurfaceType.ELECTRON_DENSITY ) {
      if ( diatomic ) {
        doScript( applet, 'isosurface VDW color ' + toJmolColor( MPColors.NEUTRAL_GRAY ) + ' translucent' );
      }
      else {
        doScript( applet, 'isosurface VDW map MEP colorscheme \"BW\" translucent' );
      }
    }
    else {
      doScript( applet, 'isosurface off' );
    }
  };

  /**
   * Determines if the current molecule is homogeneous diatomic (2 atoms of the same type.)
   * @param applet
   * @returns {boolean}
   */
  var isHomogeneousDiatomic = function( applet ) {
    debug( 'isHomogeneousDiatomic' );

    var status = Jmol.evaluateVar( applet,
        "script('" +
        "numberOfAtoms = {*}.length\n" +
        "homogeneousDiatomic = \"" + RESULT_TRUE + "\"\n" +
        "if ( numberOfAtoms == 2 ) {\n" +
        "    firstElement = {*}[0].element\n" +
        "    for ( i = 0; i < numberOfAtoms; i++ ) {\n" +
        "        nextElement = {*}[i].element\n" +
        "        if ( firstElement != nextElement ) {\n" +
        "            homogeneousDiatomic = \"" + RESULT_FALSE + "\"\n" +
        "        }\n" +
        "    }\n" +
        "}\n" +
        "else {\n" +
        "    homogeneousDiatomic = \"" + RESULT_FALSE + "\"\n" +
        "}\n" +
        "print homogeneousDiatomic" +
        "')" );

    if ( status === null || status === 'ERROR') {
      throw new Error( "JSmolViewerNode.isHomogeneousDiatomic, script error: " + status );
    }
    else {
      return ( status === 'true' ? true : false );
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
      viewerStroke: 'black', // {string} color of the viewer's background
      viewerSize: new Dimension2( 200, 200 )
    }, options );

    this.moleculeProperty = moleculeProperty; // @private
    this.jsmolProperties = jsmolProperties; // @private
    this.options = options; // @private

    // @private Put the Jmol object in a div, sized to match the Jmol object
    this.div = document.createElement( 'div' );
    this.div.style.width = options.viewerSize.width + 'px';
    this.div.style.height = options.viewerSize.height + 'px';
    this.div.style.border = '1px solid ' + options.viewerStroke;

    // @private JSmol must be initialized after the sim is running
    this.applet = null;

    options.preventTransform = true;
    DOM.call( this, this.div, options );
  }

  return inherit( DOM, JSmolViewerNode, {

    isInitialized: function() {
      return ( this.applet !== null );
    },

    // Call this after the sim has started running
    initialize: function() {

      assert && assert( !this.isInitialized() );

      var thisNode = this;

      // Called when the Jmol object has been created and is ready to receive commands
      var readyFunction = function( applet ) {
        debug( 'readyFunction' );

        unbindActions( applet, ACTIONS );

        thisNode.moleculeProperty.link( function( molecule ) {
          updateMolecule( applet, molecule, thisNode.jsmolProperties );
        } );

        thisNode.jsmolProperties.bondDipolesVisibleProperty.link( function( visible ) {
          updateDipoles( applet, visible, thisNode.jsmolProperties.molecularDipoleVisibleProperty.get() );
        } );

        thisNode.jsmolProperties.molecularDipoleVisibleProperty.link( function( visible ) {
          updateDipoles( applet, thisNode.jsmolProperties.bondDipolesVisibleProperty.get(), visible );
        } );

        thisNode.jsmolProperties.partialChargesVisibleProperty.link( function( visible ) {
          updateAtomLabelsAndPartialCharges( applet, thisNode.jsmolProperties.atomLabelsVisibleProperty.get(), visible );
        } );

        thisNode.jsmolProperties.atomLabelsVisibleProperty.link( function( visible ) {
          updateAtomLabelsAndPartialCharges( applet, visible, thisNode.jsmolProperties.partialChargesVisibleProperty.get() );
        } );

        thisNode.jsmolProperties.surfaceTypeProperty.link( function( surfaceType ) {
          updateSurface( applet, surfaceType );
        } );
      };

      // configuration for the JSmol object, called Info by convention
      var Info = {
        color: toJmolColor( this.options.viewerFill ), // background color of the JSmol object
        width: this.options.viewerSize.width, // width of the Jmol object in pixels or expressed as percent of its container width as a string in quotes: '100%'.
        height: this.options.viewerSize.width, // height, similar format as width
        debug: false, // Set this value to true if you are having problems getting your page to show the Jmol object
        j2sPath: 'jsmol-14.2.4/j2s', // path to the suite of JavaScript libraries needed for JSmol
        use: 'HTML5', // determines the various options to be tried (applet and surrogates) and the order in which to try them
        script: SCRIPT_INIT, // script to run when the Jmol object has finished loading
        readyFunction: readyFunction, // function to call when the Jmol object has been created and is ready to receive commands
        disableJ2SLoadMonitor: true, // disable display of messages in a single line, colored, at bottom-left of the page
        disableInitialConsole: true // avoids the display of messages in the Jmol panel while the Jmol object is being built initially
      };

      Jmol.setDocument( false ); // tell Jmol not to add the viewer to our HTML document
      var appletId = 'jmolApplet' + instanceNumber++; // create a unique id for this viewer
      Jmol.getApplet( appletId, Info ); // creates window[appletId]
      thisNode.applet = window[appletId]; // so that we don't pollute our code with window[appletId]
      thisNode.div.innerHTML = Jmol.getAppletHtml( thisNode.applet ); // add the viewer's HTML fragment to this node's HTML element
      thisNode.applet._cover( false ); //TODO why do we need to call this?
    },

    // @return {Array<Element>}
    getElements: function() {
      return []; //TODO
    }
  } );
} );
