// Copyright 2014-2023, University of Colorado Boulder

//TODO This is currently a stub, integrate with 3D viewer in https://github.com/phetsims/molecule-polarity/issues/15
/**
 * JSmol viewer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Line, Node, NodeOptions, Rectangle, RichText, TColor, Text, VBox } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import RealMolecule from '../model/RealMolecule.js';
import Element from '../model/Element.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

// constants
const FONT = new PhetFont( 18 );

type SelfOptions = {
  backgroundColor?: TColor;
  viewerSize?: Dimension2;
};

type RealMoleculeViewerOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class RealMoleculeViewer extends Node {

  public readonly elementsProperty: Property<Element[]>;
  public readonly bondDipolesText: Text;
  public readonly molecularDipoleText: Text;
  public readonly partialChargesText: Text;
  public readonly atomLabelsText: Text;
  public readonly surfaceTypeText: Text;

  public constructor( moleculeProperty: Property<RealMolecule>,
                      viewProperties: RealMoleculesViewProperties,
                      providedOptions: RealMoleculeViewerOptions ) {

    const options = optionize<RealMoleculeViewerOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      backgroundColor: 'white',
      viewerSize: new Dimension2( 200, 200 )
    }, providedOptions );

    const rectNode = new Rectangle( 0, 0, options.viewerSize.width, options.viewerSize.height, {
      stroke: 'rgba(0,0,0,0.25)',
      fill: options.backgroundColor
    } );

    const titleText = new Text( '3D molecule viewer goes here', {
      font: new PhetFont( {
        size: 22,
        weight: 'bold'
      } ),
      center: rectNode.center
    } );

    // Symbol and name of the molecule shown by the viewer
    const moleculeTextParent = new Node();
    let moleculeStringProperty: TReadOnlyProperty<string>;
    moleculeProperty.link( molecule => {
      moleculeTextParent.removeAllChildren();
      moleculeStringProperty && moleculeStringProperty.dispose();
      moleculeStringProperty = new PatternStringProperty( MoleculePolarityStrings.pattern.symbolNameStringProperty, {
        symbol: molecule.symbol,
        name: molecule.fullNameProperty
      } );
      moleculeTextParent.addChild( new RichText( moleculeStringProperty, {
        font: FONT,
        maxWidth: 200
      } ) );
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
        titleText,
        new Line( 0, 0, 0, 30 ),
        moleculeTextParent,
        new Line( 0, 0, 0, 30 ),
        bondDipolesText,
        molecularDipoleText,
        partialChargesText,
        atomLabelsText,
        surfaceTypeText
      ]
    } );

    options.children = [ rectNode, debugText ];

    super( options );

    this.elementsProperty = new Property<Element[]>( [] );

    this.bondDipolesText = bondDipolesText;
    this.molecularDipoleText = molecularDipoleText;
    this.partialChargesText = partialChargesText;
    this.atomLabelsText = atomLabelsText;
    this.surfaceTypeText = surfaceTypeText;

    viewProperties.surfaceTypeProperty.link( surfaceType => {
      this.surfaceTypeText.string = ( `surface: ${surfaceType}` );
    } );

    moleculeProperty.link( molecule => {

      //TODO populate elementsProperty with [Elements] for the selected molecule, see https://github.com/phetsims/molecule-polarity/issues/15
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'RealMoleculeViewer', RealMoleculeViewer );