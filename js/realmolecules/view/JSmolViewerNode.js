// Copyright 2002-2014, University of Colorado Boulder

//TODO investigate JSmol and figure out how to do this
/**
 * Scenery node that displays a Jmol viewer.
 * Jmol scripting language is documented at http://chemapps.stolaf.edu/jmol/docs
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
  var mol2Data = require( 'MOLECULE_POLARITY/realmolecules/model/mol2Data' );//TODO delete this
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // Jmol is loaded via <script> in the .html file, this prevents lint from complaining the Jmol is undefined.
  var Jmol = window.Jmol;

  // each Jmol object instance is given a new identifier, numbered sequentially
  var instanceNumber = 0;

  // function to call when the Jmol object has been created and is ready to receive commands
  var readyFunction = function( applet ) {
    console.log( applet._id + ' is ready' );
  };

  // loads a molecule by URL, then sets things that must be set whenever molecule changes
  var createLoadScript = function( mol2String ) {
    var URL = window.URL || window.webkitURL || window;  // identify a URL object, not standardized across browsers
    var url = URL.createObjectURL( new Blob( [mol2String], { type: 'plain/text', endings: 'native' } ) );
    return 'load ' + url + '\n' +  // load molecule
           'select oxygen; color [255,85,0]\n' + // colorblind red oxygen
           'select all\n' + // be polite to other commands that assume that everything is selected
           'wireframe 0.1\n' +
           'spacefill 25%\n' +
           'color bonds [128,128,128]\n' + // gray bonds
           'hover off\n' + // don't show atom label when hovering with mouse
           'dipole bonds on width 0.05\n' +
           'dipole molecular on width 0.05\n' +
           'color atoms translucent 0.2\n' +
           'color bonds translucent 0.2\n' +
           'label %[atomName]|\u03B4=%.2[partialCharge]\n' +
           'set labelalignment center\n' +
           'set labeloffset 0 0\n' +
           'color labels black\n' +
           'font labels 18 sanserif\n' +
           'isosurface VDW map MEP colorscheme "RWB" translucent\n';
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

  var createUnbindScript = function() {
    var script = '';
    unbindActions.forEach( function( action ) {
      script += 'unbind ' + action + '\n';
    } );
    return script;
  };

  // script to run when the Jmol object has finished loading
  var script =
//    'set antialiasDisplay on\n' +  //TODO significant performance hit, is this necessary?
    'set autobond off\n' +
    'set frank off\n' +  // hide the Jmol logo
    'set dipoleScale 0.75\n' +  // so that molecular dipole isn't clipped by viewer or extend beyond isosurface
    createUnbindScript() +
    createLoadScript( mol2Data.H2O );

  /**
   * @param {String|Color} colorSpec
   * @returns {string} of the form [r,g,b]
   */
  var toJmolColor = function( colorSpec ) {
      var color = Color.toColor( colorSpec );
    return '[' + color.red + ',' + color.green + ',' + color.blue + ']';
  };

  /**
   * @param {Property<RealMolecule>} moleculeProperty
   * @param {JSmolProperties} jsmolProperties
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

//    jsmolProperties.bondDipolesVisibleProperty.link( function( visible ) {
//      console.log( 'bond dipoles visible: ' + visible );//TODO
//    } );
//
//    jsmolProperties.molecularDipoleVisibleProperty.link( function( visible ) {
//      console.log( 'molecular dipole visible: ' + visible );//TODO
//    } );
//
//    jsmolProperties.partialChargesVisibleProperty.link( function( visible ) {
//      console.log( 'partial charges visible: ' + visible );//TODO
//    } );
//
//    jsmolProperties.atomLabelsVisibleProperty.link( function( visible ) {
//      console.log( 'atom labels visible: ' + visible );//TODO
//    } );
//
//    jsmolProperties.surfaceTypeProperty.link( function( surfaceType ) {
//      console.log( 'surface type: ' + surfaceType );//TODO
//    } );
  }

  return inherit( DOM, JSmolViewerNode, {

    // Call this after the sim has started running
    initialize: function() {

      assert && assert( !this.initialized );

      // configuration for the JSmol object, called Info by convention
      var Info = {
        color: toJmolColor( this.options.viewerFill ), // background color of the JSmol object
        width: this.options.viewerSize.width, // width of the Jmol object in pixels or expressed as percent of its container width as a string in quotes: '100%'.
        height: this.options.viewerSize.width, // height, similar format as width
        debug: false, // Set this value to true if you are having problems getting your page to show the Jmol object
        j2sPath: 'jsmol-14.2.4/j2s', // path to the suite of JavaScript libraries needed for JSmol
        use: 'HTML5', // determines the various options to be tried (applet and surrogates) and the order in which to try them
        script: script, // script to run when the Jmol object has finished loading
        readyFunction: readyFunction, // function to call when the Jmol object has been created and is ready to receive commands
        disableJ2SLoadMonitor: true, // disable display of messages in a single line, colored, at bottom-left of the page
        disableInitialConsole: true // avoids the display of messages in the Jmol panel while the Jmol object is being built initially
      };

      Jmol.setDocument( false );
      var appletId = 'jmolApplet' + instanceNumber++;
      Jmol.getApplet( appletId, Info );
      this.div.innerHTML = Jmol.getAppletHtml( window[appletId] ); // creates window[appletId]
      window[appletId]._cover( false ); //TODO why do we need to call this?

      this.initialized = true;
    },

    // @return {Array<Element>}
    getElements: function() {
      return []; //TODO
    }
  } );
} );
