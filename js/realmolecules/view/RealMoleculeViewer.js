// Copyright 2014-2022, University of Colorado Boulder

// @ts-nocheck
//TODO This is currently a stub, integrate with 3D viewer in https://github.com/phetsims/molecule-polarity/issues/15
/**
 * JSmol viewer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Line, Node, Rectangle, RichText, Text, VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import RealMolecule from '../model/RealMolecule.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';

// constants
const FONT = new PhetFont( 18 );

class RealMoleculeViewer extends Node {

  /**
   * @param {Property.<RealMolecule>} moleculeProperty
   * @param {RealMoleculesViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( moleculeProperty, viewProperties, options ) {
    assert && AssertUtils.assertPropertyOf( moleculeProperty, RealMolecule );
    assert && assert( viewProperties instanceof RealMoleculesViewProperties, 'invalid viewProperties' );

    options = merge( {
      backgroundColor: 'white',
      viewerSize: new Dimension2( 200, 200 ),
      tandem: Tandem.REQUIRED
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

    const bondDipolesText = new Text( 'bond dipoles', {
      font: FONT,
      visibleProperty: viewProperties.bondDipolesVisibleProperty
    } );
    const molecularDipoleText = new Text( 'molecular dipole', {
      font: FONT,
      visibleProperty: viewProperties.molecularDipoleVisibleProperty
    } );
    const partialChargesText = new Text( 'partial charges', {
      font: FONT,
      visibleProperty: viewProperties.partialChargesVisibleProperty
    } );
    const atomLabelsText = new Text( 'atom labels', {
      font: FONT,
      visibleProperty: viewProperties.atomLabelsVisibleProperty
    } );
    const surfaceTypeText = new Text( '?', { font: FONT } );

    const debugText = new VBox( {
      excludeInvisibleChildrenFromBounds: false,
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

    // unlink is not needed
    viewProperties.surfaceTypeProperty.link( surfaceType => {
      this.surfaceTypeText.text = ( `surface: ${surfaceType.name}` );
    } );

    // unlink not needed
    moleculeProperty.link( molecule => {

      //TODO https://github.com/phetsims/molecule-polarity/issues/140 support for dynamic locale
      moleculeText.text = StringUtils.fillIn( moleculePolarityStrings.pattern.symbolName, {
        symbol: molecule.symbol,
        name: molecule.fullName
      } );

      //TODO populate elementsProperty with [Elements] for the selected molecule, see https://github.com/phetsims/molecule-polarity/15
    } );
  }
}

moleculePolarity.register( 'RealMoleculeViewer', RealMoleculeViewer );
export default RealMoleculeViewer;