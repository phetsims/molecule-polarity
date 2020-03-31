// Copyright 2014-2020, University of Colorado Boulder

//TODO This is currently a stub, integrate with 3D viewer in https://github.com/phetsims/molecule-polarity/issues/15
/**
 * JSmol viewer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import LayoutBox from '../../../../scenery/js/nodes/LayoutBox.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import moleculePolarity from '../../moleculePolarity.js';

// strings
const patternSymbolNameString = moleculePolarityStrings.pattern.symbolName;

// constants
const FONT = new PhetFont( 18 );

class RealMoleculeViewer extends Node {

  /**
   * @param {Property.<RealMolecule>} moleculeProperty
   * @param {RealMoleculesViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( moleculeProperty, viewProperties, options ) {

    options = merge( {
      backgroundColor: 'white',
      viewerSize: new Dimension2( 200, 200 )
    }, options );

    const rectNode = new Rectangle( 0, 0, options.viewerSize.width, options.viewerSize.height, {
      stroke: 'rgba(0,0,0,0.25)',
      fill: options.backgroundColor
    } );

    const titleNode = new Text( '3D molecule viewer goes here', {
      font: new PhetFont( {
        size: 22,
        weight: 'bold'
      } ),
      center: rectNode.center
    } );

    const moleculeText = new RichText( '?', {
      font: FONT,
      maxWidth: 200
    } );

    const bondDipolesText = new Text( 'bond dipoles', { font: FONT } );
    const molecularDipoleText = new Text( 'molecular dipole', { font: FONT } );
    const partialChargesText = new Text( 'partial charges', { font: FONT } );
    const atomLabelsText = new Text( 'atom labels', { font: FONT } );
    const surfaceTypeText = new Text( '?', { font: FONT } );

    const debugText = new LayoutBox( {
      orientation: 'vertical',
      align: 'left',
      spacing: 10,
      centerX: rectNode.centerX,
      centerY: rectNode.centerY,
      children: [
        titleNode,
        new Line( 0, 0, 0, 30 ),
        moleculeText,
        new Line( 0, 0, 0, 30 ),
        bondDipolesText,
        molecularDipoleText,
        partialChargesText,
        atomLabelsText,
        surfaceTypeText
      ]
    } );

    assert && assert( !options.children, 'RealMoleculeViewer sets children' );
    options.children = [ rectNode, debugText ];

    super( options );

    // {Property.<Element[]>} @public (read-only)
    this.elementsProperty = new Property( [] );

    // @private used by methods
    this.bondDipolesText = bondDipolesText;
    this.molecularDipoleText = molecularDipoleText;
    this.partialChargesText = partialChargesText;
    this.atomLabelsText = atomLabelsText;
    this.surfaceTypeText = surfaceTypeText;

    // synchronize with view Properties, unlinks not needed
    viewProperties.bondDipolesVisibleProperty.link( visible => this.setBondDipolesVisible( visible ) );
    viewProperties.molecularDipoleVisibleProperty.link( visible => this.setMolecularDipoleVisible( visible ) );
    viewProperties.partialChargesVisibleProperty.link( visible => this.setPartialChargesVisible( visible ) );
    viewProperties.atomLabelsVisibleProperty.link( visible => this.setAtomLabelsVisible( visible ) );
    viewProperties.surfaceTypeProperty.link( surfaceType => this.setSurfaceType( surfaceType ) );

    // unlink not needed
    moleculeProperty.link( molecule => {
      moleculeText.text = StringUtils.fillIn( patternSymbolNameString, {
        symbol: molecule.symbol,
        name: molecule.name
      } );

      //TODO populate elementsProperty with [Elements] for the selected molecule, see https://github.com/phetsims/molecule-polarity/15
    } );
  }

  setBondDipolesVisible( visible ) {
    this.bondDipolesText.fill = visible ? 'black' : 'gray';
  }

  setMolecularDipoleVisible( visible ) {
    this.molecularDipoleText.fill = visible ? 'black' : 'gray';
  }

  setPartialChargesVisible( visible ) {
    this.partialChargesText.fill = visible ? 'black' : 'gray';
  }

  setAtomLabelsVisible( visible ) {
    this.atomLabelsText.fill = visible ? 'black' : 'gray';
  }

  setSurfaceType( surfaceType ) {
    this.surfaceTypeText.text = ( 'surface: ' + surfaceType.name );
  }
}

moleculePolarity.register( 'RealMoleculeViewer', RealMoleculeViewer );

export default RealMoleculeViewer;