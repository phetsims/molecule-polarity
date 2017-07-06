// Copyright 2017, University of Colorado Boulder

//TODO Moved here from litmus repository. Delete when 100% certain that we're not using JSmol. See #15.
/**
 * Scenery node that displays a JSmol viewer.
 * Jmol scripting language is documented at http://chemapps.stolaf.edu/jmol/docs
 *
 * This requires Jmol 14.2.4, which you must download and install separately. Instructions:
 *
 * 1. Download Jmol 14.2.4 from http://sourceforge.net/projects/jmol/files/Jmol/
 * 2. Expand the Jmol zip file, creating a directory named jmol-\<version number\>
 * 3. In the jmol directory, locate jsmol.zip.  Expand jsmol.zip, creating a directory named jsmol.
 * 4. Copy the jmol directory so that it is an immediate subdirectory of your working copy of litmus.
 * 5. Rename the directory to jmol-14.2.4
 *
 * WARNING #1: Changes to how a sim hmtl file is generated (including `molecule-polarity_en.hmtl`, the development
 * html file) made it impossible to manually add JSmol to the html file.  So before you can run this repository,
 * you'll need to figure out how to fix that.  This script needs to run after the 3rd-party libraries
 * (jquery in particular), and before any PhET-specific code:
 *
 * `<script type="text/javascript" src="jsmol-14.2.4/JSmol.min.nojq.js"></script>`
 *
 * WARNING #2: As soon as you add the jmol-14.2.4/ directory, you'll need to make sure that it is excluded from any
 * lint process.  It includes a lot of .js files, and they don't conform to PhET's lint standards.
 *
 * WARNING #3: JSmol 14.2.4 incorrectly identifies itself as 14.2.3 when Jmol._version is inspected in the debugger.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // inherit
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var DOM = require( 'SCENERY/nodes/DOM' );
  var Element = require( 'MOLECULE_POLARITY/realmolecules/model/Element' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var Property = require( 'AXON/Property' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );

  // strings
  var DELTA = '\u03B4';
  var RESULT_TRUE = 'true';
  var RESULT_FALSE = 'false';

  // Jmol is loaded via <script> in the .html file, this prevents lint from complaining the Jmol is undefined.
  var Jmol = window.Jmol;

  // each Jmol object instance is given a new identifier, numbered sequentially
  var instanceNumber = 0;

  // identify a URL object, not standardized across browsers
  var URL = window.URL || window.webkitURL || window;

  // prints debugging messages to the console?
  var DEBUG = false;

  // Script to run when the Jmol object has finished loading
  var SCRIPT_INIT =
    'set autobond off\n' +
    'set frank off\n' +  // hide the Jmol logo
    'set dipoleScale 0.75\n';  // so that molecular dipole isn't clipped by viewer or extend beyond isosurface

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
   * @param {Property.<RealMolecule>} moleculeProperty
   * @param {PropertySet} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function JSmolViewerNode( moleculeProperty, viewProperties, options ) {

    options = _.extend( {
      viewerFill: 'white',
      viewerStroke: 'black', // {string} color of the viewer's background
      viewerSize: new Dimension2( 200, 200 )
    }, options );

    this.moleculeProperty = moleculeProperty; // @private
    this.viewProperties = viewProperties; // @private
    this.options = options; // @private

    // @private Put the Jmol object in a div, sized to match the Jmol object
    this.div = document.createElement( 'div' );
    this.div.style.width = options.viewerSize.width + 'px';
    this.div.style.height = options.viewerSize.height + 'px';
    this.div.style.border = '1px solid ' + options.viewerStroke;

    // @private JSmol must be initialized after the sim is running
    this.applet = null;

    // @public {Property.Array.<Element>} elements in the molecule displayed by the viewer
    this.elementsProperty = new Property( null );

    options.preventTransform = true;
    DOM.call( this, this.div, options );
  }

  moleculePolarity.register( 'JSmolViewerNode', JSmolViewerNode );

  // executes a JSmol script
  var doScript = function( applet, script ) {
    // use scriptWait (which is synchronous) so that we get status and can use evaluateVar elsewhere
    var status = Jmol.scriptWait( applet, script );
    DEBUG && console.log( 'doScript, status=' + status );
  };

  /**
   * Unbinds mouse actions from JSmol actions.
   * @param applet
   * @param {string[]} actions
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
   * Loads a molecule by URL, then sets things that must be reset whenever the molecule changes.
   * @param applet
   * @param {RealMolecule} molecule
   * @param {RealMoleculesViewProperties} jsmolProperties
   */
  var updateMolecule = function( applet, molecule, jsmolProperties ) {
    DEBUG && console.log( 'updateMolecule' );

    var url = URL.createObjectURL( new Blob( [ molecule.mol2Data ], { type: 'text/plain', endings: 'native' } ) );

    // load molecule
    doScript( applet, 'load ' + url );

    // reset misc settings that don't persist
    doScript( applet,
      'select oxygen; color [255,85,0]\n' + // colorblind red oxygen
      'select all\n' + // be polite to other commands that assume that everything is selected
      'wireframe 0.1\n' + // draw bonds as lines
      'spacefill 25%\n' +  // render atoms as a percentage of the van der Waals radius
      'color bonds [128,128,128]\n' + // gray bonds
      'hover off' ); // don't show atom label when hovering with mouse

    // reset sim-specific settings that don't persist
    updateDipoles( applet, jsmolProperties.bondDipolesVisible, jsmolProperties.molecularDipoleVisible );
    updateLabels( applet, jsmolProperties.atomLabelsVisible, jsmolProperties.partialChargesVisible );
    updateSurface( applet, jsmolProperties.surfaceType );
  };

  /**
   * Determines the {Element} elements in the molecule that is currently displayed by the viewer.
   * @param applet
   * @param {Property.<Element[]>} elementsProperty
   */
  var updateElements = function( applet, elementsProperty ) {

    /*
     * Returns a string where elemno and color are separated by newlines.
     * Each color is 3 components (rgb) surrounded by curly braces.
     * Eg, for HF: '1\n{255 255 255}\n9\n{144 224 80}\n'
     */
    var status = Jmol.evaluateVar( applet,
      'script(\'' +
      'n = {*}.length\n' +
      'for ( i = 0; i < n; i++ ) {\n' +
      '    print {*}[i].elemno\n' +
      '    print {*}[i].color\n' +
      '}' +
      '\')' );
    if ( status === null || status === 'ERROR' ) {
      throw new Error( 'JSmolViewerNode.updateElements, script error: ' + status );
    }

    /*
     * Replace the special chars with spaces, to make this easier to parse.
     * Eg, for HF: '1 255 255 255 9 144 224 80 '
     */
    status = status.replace( /\n/g, ' ' ).replace( /{/g, '' ).replace( /}/g, '' );
    DEBUG && console.log( 'updateElements, status=' + status );

    /*
     * Now that the tokens are separated by spaces, split the string into an array.
     * Eg, for HF: ['1','255','255','255','9','144','224','80']
     */
    var tokens = status.split( ' ' );
    assert && assert( tokens.length % 4 === 0 ); // each element has 4 tokens

    // Convert the tokens to an array of {Element}.
    var elements = [];
    for ( var i = 0; i < tokens.length; i = i + 4 ) {
      var elementNumber = parseInt( tokens[ i ], 10 );
      var color = new Color( parseInt( tokens[ i + 1 ], 10 ), parseInt( tokens[ i + 2 ], 10 ), parseInt( tokens[ i + 3 ], 10 ) );
      elements.push( new Element( elementNumber, color ) );
    }
    elementsProperty.set( elements );
  };

  /**
   * When any dipole is visible, make the atoms and bonds translucent, so we can see the dipoles through them.
   * @param applet
   * @param {boolean} bondDipolesVisible
   * @param {boolean} molecularDipoleVisible
   */
  var updateTranslucency = function( applet, bondDipolesVisible, molecularDipoleVisible ) {
    DEBUG && console.log( 'updateTransparency' );
    var arg = ( bondDipolesVisible || molecularDipoleVisible ) ? '0.25' : '0.0'; // 0.0=opaque, 1.0=transparent
    doScript( applet, 'color atoms translucent ' + arg );
    doScript( applet, 'color bonds translucent ' + arg );
  };

  /**
   * Updates visibility of dipoles.
   * @param applet
   * @param {boolean} bondDipolesVisible
   * @param {boolean} molecularDipoleVisible
   */
  var updateDipoles = function( applet, bondDipolesVisible, molecularDipoleVisible ) {
    DEBUG && console.log( 'updateDipoles' );

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
   * Updates visibility of labels on the atoms, to show atom names, partial charges, or both.
   * @param applet
   * @param {boolean} atomLabelsVisible
   * @param {boolean} partialChargesVisible
   */
  var updateLabels = function( applet, atomLabelsVisible, partialChargesVisible ) {
    DEBUG && console.log( 'updateLabels' );

    if ( atomLabelsVisible || partialChargesVisible ) {

      var args = '';
      if ( atomLabelsVisible ) {
        args += ' %[atomName]'; // show element and sequential atom index
      }

      if ( partialChargesVisible ) {
        if ( atomLabelsVisible ) {
          args += '|'; // line separator
        }
        args += DELTA + '=%.2[partialCharge]'; // show partial charges
      }

      // Do this as a single script, or you'll see atom labels jump around.
      doScript( applet,
        'label ' + args + '\n' +
        'set labelalignment center\n' + // center labels on atoms
        'set labeloffset 0 0\n' +
        'color labels black\n' +   // color for all labels
        'font labels 18 sanserif\n'  // font for all labels
      );
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
    DEBUG && console.log( 'updateSurface' );

    var diatomic = isHomogeneousDiatomic( applet );
    if ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL_ROYGB ) {
      if ( diatomic ) {
        doScript( applet, 'isosurface VDW color ' + toJmolColor( MPColors.NEUTRAL_POTENTIAL ) + ' translucent' );
      }
      else {
        doScript( applet, 'isosurface VDW map MEP translucent' );
      }
    }
    else if ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL_RWB ) {
      if ( diatomic ) {
        doScript( applet, 'isosurface VDW color white translucent' );
      }
      else {
        doScript( applet, 'isosurface VDW map MEP colorscheme \"RWB\" translucent' );
      }
    }
    else if ( surfaceType === SurfaceType.ELECTRON_DENSITY ) {
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

    var status = Jmol.evaluateVar( applet,
      'script(\'' +
      'numberOfAtoms = {*}.length\n' +
      'homogeneousDiatomic = "' + RESULT_TRUE + '"\n' +
      'if ( numberOfAtoms == 2 ) {\n' +
      '    firstElement = {*}[0].element\n' +
      '    for ( i = 0; i < numberOfAtoms; i++ ) {\n' +
      '        nextElement = {*}[i].element\n' +
      '        if ( firstElement != nextElement ) {\n' +
      '            homogeneousDiatomic = "' + RESULT_FALSE + '"\n' +
      '        }\n' +
      '    }\n' +
      '}\n' +
      'else {\n' +
      '    homogeneousDiatomic = "' + RESULT_FALSE + '"\n' +
      '}\n' +
      'print homogeneousDiatomic' +
      '\')' );
    DEBUG && console.log( 'isHomogeneousDiatomic, status=' + status );

    if ( status === null || status === 'ERROR' ) {
      throw new Error( 'JSmolViewerNode.isHomogeneousDiatomic, script error: ' + status );
    }
    else {
      return ( status === 'true' );
    }
  };

  return inherit( DOM, JSmolViewerNode, {

    isInitialized: function() {
      return ( this.applet !== null );
    },

    // Call this after the sim has started running
    initialize: function() {

      assert && assert( !this.isInitialized() );

      var self = this;

      // Called when the Jmol object has been created and is ready to receive commands
      var readyFunction = function( applet ) {
        DEBUG && console.log( 'readyFunction' );

        unbindActions( applet, ACTIONS );

        self.moleculeProperty.link( function( molecule ) {
          updateMolecule( applet, molecule, self.viewProperties );
          updateElements( applet, self.elementsProperty );
        } );

        self.viewProperties.bondDipolesVisibleProperty.link( function( bondDipolesVisible ) {
          updateDipoles( applet, bondDipolesVisible, self.viewProperties.molecularDipoleVisible );
        } );

        self.viewProperties.molecularDipoleVisibleProperty.link( function( molecularDipoleVisible ) {
          updateDipoles( applet, self.viewProperties.bondDipolesVisible, molecularDipoleVisible );
        } );

        self.viewProperties.partialChargesVisibleProperty.link( function( partialChargesVisible ) {
          updateLabels( applet, self.viewProperties.atomLabelsVisible, partialChargesVisible );
        } );

        self.viewProperties.atomLabelsVisibleProperty.link( function( atomLabelsVisible ) {
          updateLabels( applet, atomLabelsVisible, self.viewProperties.partialChargesVisible );
        } );

        self.viewProperties.surfaceTypeProperty.link( function( surfaceType ) {
          updateSurface( applet, surfaceType );
        } );
      };

      // configuration for the JSmol object, called Info by convention
      var Info = {
        color: toJmolColor( this.options.viewerFill ), // background color of the JSmol object
        width: this.options.viewerSize.width, // width of the Jmol object in pixels or expressed as percent of its container width as a string in quotes: '100%'.
        height: this.options.viewerSize.height, // height, similar format as width
        debug: false, // Set this value to true if you are having problems getting your page to show the Jmol object
        j2sPath: 'jsmol-14.2.4/j2s', // path to the suite of JavaScript libraries needed for JSmol
        serverURL: 'jsmol-14.2.4/php/jsmol.php', // URL to be used for getting file data into non-Java modalities
        use: 'HTML5', // determines the various options to be tried (applet and surrogates) and the order in which to try them
        script: SCRIPT_INIT, // script to run when the Jmol object has finished loading
        readyFunction: readyFunction, // function to call when the Jmol object has been created and is ready to receive commands
        disableJ2SLoadMonitor: true, // disable display of messages in a single line, colored, at bottom-left of the page
        disableInitialConsole: true // avoids the display of messages in the Jmol panel while the Jmol object is being built initially
      };

      Jmol.setDocument( false ); // tell Jmol not to add the viewer to our HTML document
      var appletId = 'jmolApplet' + instanceNumber++; // create a unique id for this viewer
      Jmol.getApplet( appletId, Info ); // creates window[appletId]
      self.applet = window[ appletId ]; // so that we don't pollute our code with window[appletId]
      self.div.innerHTML = Jmol.getAppletHtml( self.applet ); // add the viewer's HTML fragment to this node's HTML element
      self.applet._cover( false ); //TODO Why do we need to call this? See #14
    }
  } );
} );
