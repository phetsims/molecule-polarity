// Copyright 2017-2022, University of Colorado Boulder

//TODO Moved here from litmus repository. Delete when 100% certain that we're not using JSmol. See https://github.com/phetsims/molecule-polarity/issues/15
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
 * WARNING #4: When this file was converted to TypeScript in 9/2022, it passed lint and tsc, but was not tested.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import { Color, DOM, DOMOptions } from '../../../../scenery/js/imports.js';
import MPColors from '../../common/MPColors.js';
import MPQueryParameters from '../../common/MPQueryParameters.js';
import moleculePolarity from '../../moleculePolarity.js';
import Element from '../model/Element.js';
import RealMolecule from '../model/RealMolecule.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import { SurfaceType } from '../../common/model/SurfaceType.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize from '../../../../phet-core/js/optionize.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';

// strings
const DELTA = '\u03B4';
const RESULT_TRUE = 'true';
const RESULT_FALSE = 'false';

type WindowKey = keyof typeof window;

// Opaque handle to the JSmol applet, so 'any' is an appropriate type.
type AppletId = IntentionalAny;

// configuration for the JSmol object, called Info by convention
type AppletConfig = {
  color: string | Color; // background color of the JSmol object
  width: number; // width of the Jmol object in pixels or expressed as percent of its container width as a string in quotes: '100%'.
  height: number; // height, similar format as width
  debug: boolean; // Set this value to true if you are having problems getting your page to show the Jmol object
  j2sPath: string; // path to the suite of JavaScript libraries needed for JSmol
  serverURL: string; // URL to be used for getting file data into non-Java modalities
  use: string; // determines the various options to be tried (applet and surrogates) and the order in which to try them
  script: string; // script to run when the Jmol object has finished loading
  readyFunction: ( applet: AppletId ) => void; // function to call when the Jmol object has been created and is ready to receive commands
  disableJ2SLoadMonitor: boolean; // disable display of messages in a single line, colored, at bottom-left of the page
  disableInitialConsole: boolean; // avoids the display of messages in the Jmol panel while the Jmol object is being built initially
};

type JmolType = {
  setDocument: ( doc: boolean ) => void;
  getApplet: ( appletId: AppletId, appletConfig: AppletConfig ) => void;
  getAppletHtml: ( appletId: AppletId ) => string;
  scriptWait: ( applet: AppletId, script: string ) => string;
  evaluateVar: ( applet: AppletId, script: string ) => string;
};

// Jmol is loaded via <script> in the .html file, this prevents lint from complaining the Jmol is undefined.
const Jmol = window[ 'Jmol' as WindowKey ] as JmolType;

// each Jmol object instance is given a new identifier, numbered sequentially
let instanceNumber = 0;

// identify a URL object, not standardized across browsers
const URL = window.URL || window.webkitURL || window;

// Script to run when the Jmol object has finished loading
const SCRIPT_INIT =
  'set autobond off\n' +
  'set frank off\n' +  // hide the Jmol logo
  'set dipoleScale 0.75\n';  // so that molecular dipole isn't clipped by viewer or extend beyond isosurface

// Jmol actions to unbind, all except _rotate
const JmolActionValues = [
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
] as const;

type JmolAction = ( typeof JmolActionValues )[number];

type JSmolViewerColor = string | Color;

type SelfOptions = {
  viewerSize?: Dimension2;
  viewerFill?: JSmolViewerColor;
  viewerStroke?: JSmolViewerColor;
};

type JSmolViewerNodeOptions = SelfOptions & PickRequired<DOMOptions, 'tandem'>;

export default class JSmolViewerNode extends DOM {

  // elements in the molecule displayed by the viewer
  public readonly elementsProperty: Property<Element[] | null>;

  private readonly moleculeProperty: Property<RealMolecule>;
  private readonly viewProperties: RealMoleculesViewProperties;
  private readonly viewerSize: Dimension2;
  private readonly viewerFill: JSmolViewerColor;
  private readonly viewerStroke: JSmolViewerColor;
  private readonly div: HTMLDivElement;
  private applet: AppletId | null;

  public constructor( moleculeProperty: Property<RealMolecule>,
                      viewProperties: RealMoleculesViewProperties,
                      providedOptions: JSmolViewerNodeOptions ) {

    const options = optionize<JSmolViewerNodeOptions, SelfOptions, DOMOptions>()( {

      // SelfOptions
      viewerSize: new Dimension2( 200, 200 ),
      viewerFill: 'white',
      viewerStroke: 'black', // {string} color of the viewer's background

      // DOMOptions
      preventTransform: true
    }, providedOptions );

    // Put the JSmol object in a div, sized to match the JSmol object
    const div = document.createElement( 'div' );
    div.style.width = `${options.viewerSize.width}px`;
    div.style.height = `${options.viewerSize.height}px`;
    div.style.border = `1px solid ${options.viewerStroke}`;

    super( div, options );

    this.moleculeProperty = moleculeProperty;
    this.viewProperties = viewProperties;
    this.viewerSize = options.viewerSize;
    this.viewerFill = options.viewerFill;
    this.viewerStroke = options.viewerStroke;
    this.div = div;
    this.elementsProperty = new Property<Element[] | null>( null );

    // JSmol must be initialized after the sim is running
    this.applet = null;
  }

  public isInitialized(): boolean {
    return ( this.applet !== null );
  }

  // Call this after the sim has started running
  public initialize(): void {

    assert && assert( !this.isInitialized(), 'already initialized' );

    // Called when the Jmol object has been created and is ready to receive commands
    const readyFunction = ( applet: AppletId ) => {
      phet.log && phet.log( 'readyFunction' );

      unbindActions( applet, JmolActionValues );

      this.moleculeProperty.link( molecule => {
        updateMolecule( applet, molecule, this.viewProperties );
        updateElements( applet, this.elementsProperty );
      } );

      this.viewProperties.bondDipolesVisibleProperty.link( bondDipolesVisible => {
        updateDipoles( applet, bondDipolesVisible, this.viewProperties.molecularDipoleVisibleProperty.value );
      } );

      this.viewProperties.molecularDipoleVisibleProperty.link( molecularDipoleVisible => {
        updateDipoles( applet, this.viewProperties.bondDipolesVisibleProperty.value, molecularDipoleVisible );
      } );

      this.viewProperties.partialChargesVisibleProperty.link( partialChargesVisible => {
        updateLabels( applet, this.viewProperties.atomLabelsVisibleProperty.value, partialChargesVisible );
      } );

      this.viewProperties.atomLabelsVisibleProperty.link( atomLabelsVisible => {
        updateLabels( applet, atomLabelsVisible, this.viewProperties.partialChargesVisibleProperty.value );
      } );

      this.viewProperties.surfaceTypeProperty.link( surfaceType => {
        updateSurface( applet, surfaceType );
      } );
    };

    // configuration for the JSmol object, called Info by convention
    const appletConfig: AppletConfig = {
      color: toJmolColor( this.viewerFill ), // background color of the JSmol object
      width: this.viewerSize.width, // width of the Jmol object in pixels or expressed as percent of its container width as a string in quotes: '100%'.
      height: this.viewerSize.height, // height, similar format as width
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
    const appletId = `jmolApplet${instanceNumber++}`; // create a unique id for this viewer
    Jmol.getApplet( appletId, appletConfig ); // creates window[appletId]

    this.applet = window[ appletId as WindowKey ]; // so that we don't pollute our code with window[appletId]

    this.div.innerHTML = Jmol.getAppletHtml( this.applet ); // add the viewer's HTML fragment to this node's HTML element

    // TODO Why do we need to call this? See https://github.com/phetsims/molecule-polarity/issues/14
    this.applet._cover( false );
  }
}

// executes a JSmol script
function doScript( applet: AppletId, script: string ): void {
  // use scriptWait (which is synchronous) so that we get status and can use evaluateVar elsewhere
  const status = Jmol.scriptWait( applet, script );
  phet.log && phet.log( `doScript, status=${status}` );
}

/**
 * Unbinds mouse actions from JSmol actions.
 */
function unbindActions( applet: AppletId, actions: readonly JmolAction[] ): void {
  let script = '';
  actions.forEach( action => {
    script += `unbind ${action}\n`;
  } );
  doScript( applet, script );
}

/**
 * Converts to a JSmol color for the form '[r,g,b]'
 */
function toJmolColor( jSmolViewerColor: JSmolViewerColor ): string {
  const color = Color.toColor( jSmolViewerColor );
  return `[${color.red},${color.green},${color.blue}]`;
}

/**
 * Loads a molecule by URL, then sets things that must be reset whenever the molecule changes.
 */
function updateMolecule( applet: AppletId, molecule: RealMolecule, viewProperties: RealMoleculesViewProperties ): void {
  phet.log && phet.log( 'updateMolecule' );

  const url = URL.createObjectURL( new Blob( [ molecule.mol2Data ], { type: 'text/plain', endings: 'native' } ) );

  // load molecule
  doScript( applet, `load ${url}` );

  // reset misc settings that don't persist
  doScript( applet,
    'select oxygen; color [255,85,0]\n' + // colorblind red oxygen
    'select all\n' + // be polite to other commands that assume that everything is selected
    'wireframe 0.1\n' + // draw bonds as lines
    'spacefill 25%\n' +  // render atoms as a percentage of the van der Waals radius
    'color bonds [128,128,128]\n' + // gray bonds
    'hover off' ); // don't show atom label when hovering with mouse

  // reset sim-specific settings that don't persist
  updateDipoles( applet, viewProperties.bondDipolesVisibleProperty.value, viewProperties.molecularDipoleVisibleProperty.value );
  updateLabels( applet, viewProperties.atomLabelsVisibleProperty.value, viewProperties.partialChargesVisibleProperty.value );
  updateSurface( applet, viewProperties.surfaceTypeProperty.value );
}

/**
 * Updates the elements in the molecule that is currently displayed by the viewer.
 */
function updateElements( applet: AppletId, elementsProperty: Property<Element[] | null> ): void {

  /*
   * Returns a string where elemno and color are separated by newlines.
   * Each color is 3 components (rgb) surrounded by curly braces.
   * Eg, for HF: '1\n{255 255 255}\n9\n{144 224 80}\n'
   */
  let status = Jmol.evaluateVar( applet,
    'script(\'' +
    'n = {*}.length\n' +
    'for ( i = 0; i < n; i++ ) {\n' +
    '    print {*}[i].elemno\n' +
    '    print {*}[i].color\n' +
    '}' +
    '\')' );
  if ( status === null || status === 'ERROR' ) {
    throw new Error( `JSmolViewerNode.updateElements, script error: ${status}` );
  }

  /*
   * Replace the special chars with spaces, to make this easier to parse.
   * Eg, for HF: '1 255 255 255 9 144 224 80 '
   */
  status = status.replace( /\n/g, ' ' ).replace( /{/g, '' ).replace( /}/g, '' );
  phet.log && phet.log( `updateElements, status=${status}` );

  /*
   * Now that the tokens are separated by spaces, split the string into an array.
   * Eg, for HF: ['1','255','255','255','9','144','224','80']
   */
  const tokens = status.split( ' ' );
  assert && assert( tokens.length % 4 === 0, 'each element should have 4 tokens' );

  // Convert the tokens to an array of {Element}.
  const elements = [];
  for ( let i = 0; i < tokens.length; i = i + 4 ) {
    const elementNumber = Number( tokens[ i ] );
    const color = new Color( Number( tokens[ i + 1 ] ), Number( tokens[ i + 2 ] ), Number( tokens[ i + 3 ] ) );
    elements.push( new Element( elementNumber, color ) );
  }
  elementsProperty.value = elements;
}

/**
 * When any dipole is visible, make the atoms and bonds translucent, so we can see the dipoles through them.
 */
function updateTranslucency( applet: AppletId, bondDipolesVisible: boolean, molecularDipoleVisible: boolean ): void {
  phet.log && phet.log( 'updateTransparency' );
  const arg = ( bondDipolesVisible || molecularDipoleVisible ) ? '0.25' : '0.0'; // 0.0=opaque, 1.0=transparent
  doScript( applet, `color atoms translucent ${arg}` );
  doScript( applet, `color bonds translucent ${arg}` );
}

/**
 * Updates visibility of dipoles.
 */
function updateDipoles( applet: AppletId, bondDipolesVisible: boolean, molecularDipoleVisible: boolean ): void {
  phet.log && phet.log( 'updateDipoles' );

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
}

/**
 * Updates visibility of labels on the atoms, to show atom names, partial charges, or both.
 */
function updateLabels( applet: AppletId, atomLabelsVisible: boolean, partialChargesVisible: boolean ): void {
  phet.log && phet.log( 'updateLabels' );

  if ( atomLabelsVisible || partialChargesVisible ) {

    let args = '';
    if ( atomLabelsVisible ) {
      args += ' %[atomName]'; // show element and sequential atom index
    }

    if ( partialChargesVisible ) {
      if ( atomLabelsVisible ) {
        args += '|'; // line separator
      }
      args += `${DELTA}=%.2[partialCharge]`; // show partial charges
    }

    // Do this as a single script, or you'll see atom labels jump around.
    doScript( applet,
      `label ${args}\n` +
      'set labelalignment center\n' + // center labels on atoms
      'set labeloffset 0 0\n' +
      'color labels black\n' +   // color for all labels
      'font labels 18 sanserif\n'  // font for all labels
    );
  }
  else {
    doScript( applet, 'label off' );
  }
}

/**
 * Updates the type of surface displayed.
 */
function updateSurface( applet: AppletId, surfaceType: SurfaceType ): void {
  phet.log && phet.log( 'updateSurface' );

  const diatomic = isHomogeneousDiatomic( applet );
  if ( surfaceType === 'electrostaticPotential' ) {
    if ( MPQueryParameters.surfaceColor === 'ROYGB' ) {
      if ( diatomic ) {
        doScript( applet, `isosurface VDW color ${toJmolColor( MPColors.NEUTRAL_POTENTIAL )} translucent` );
      }
      else {
        doScript( applet, 'isosurface VDW map MEP translucent' );
      }
    }
    else { // 'RWB'
      if ( diatomic ) {
        doScript( applet, 'isosurface VDW color white translucent' );
      }
      else {
        doScript( applet, 'isosurface VDW map MEP colorscheme "RWB" translucent' );
      }
    }
  }
  else if ( surfaceType === 'electronDensity' ) {
    if ( diatomic ) {
      doScript( applet, `isosurface VDW color ${toJmolColor( MPColors.NEUTRAL_GRAY )} translucent` );
    }
    else {
      doScript( applet, 'isosurface VDW map MEP colorscheme "BW" translucent' );
    }
  }
  else { // 'none'
    doScript( applet, 'isosurface off' );
  }
}

/**
 * Determines if the current molecule is homogeneous diatomic (2 atoms of the same type.)
 */
function isHomogeneousDiatomic( applet: AppletId ): boolean {

  const status = Jmol.evaluateVar( applet,
    `${'script(\'' +
    'numberOfAtoms = {*}.length\n' +
    'homogeneousDiatomic = "'}${RESULT_TRUE}"\n` +
    'if ( numberOfAtoms == 2 ) {\n' +
    '    firstElement = {*}[0].element\n' +
    '    for ( i = 0; i < numberOfAtoms; i++ ) {\n' +
    '        nextElement = {*}[i].element\n' +
    '        if ( firstElement != nextElement ) {\n' +
    `            homogeneousDiatomic = "${RESULT_FALSE}"\n` +
    '        }\n' +
    '    }\n' +
    '}\n' +
    'else {\n' +
    `    homogeneousDiatomic = "${RESULT_FALSE}"\n` +
    '}\n' +
    'print homogeneousDiatomic' +
    '\')' );
  phet.log && phet.log( `isHomogeneousDiatomic, status=${status}` );

  if ( status === null || status === 'ERROR' ) {
    throw new Error( `JSmolViewerNode.isHomogeneousDiatomic, script error: ${status}` );
  }
  else {
    return ( status === 'true' );
  }
}

moleculePolarity.register( 'JSmolViewerNode', JSmolViewerNode );