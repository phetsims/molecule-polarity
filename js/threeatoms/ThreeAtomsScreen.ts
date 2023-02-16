// Copyright 2014-2023, University of Colorado Boulder

/**
 * The 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import PickRequired from '../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import ShadedSphereNode from '../../../scenery-phet/js/ShadedSphereNode.js';
import { Line, Node, Rectangle, Text } from '../../../scenery/js/imports.js';
import MPColors from '../common/MPColors.js';
import moleculePolarity from '../moleculePolarity.js';
import MoleculePolarityStrings from '../MoleculePolarityStrings.js';
import ThreeAtomsModel from './model/ThreeAtomsModel.js';
import ThreeAtomsScreenView from './view/ThreeAtomsScreenView.js';

type SelfOptions = EmptySelfOptions;

type ThreeAtomsScreenOptions = SelfOptions & PickRequired<ScreenOptions, 'tandem'>;

export default class ThreeAtomsScreen extends Screen<ThreeAtomsModel, ThreeAtomsScreenView> {

  public constructor( providedOptions: ThreeAtomsScreenOptions ) {

    const options = optionize<ThreeAtomsScreenOptions, SelfOptions, ScreenOptions>()( {

      // ScreenOptions
      name: MoleculePolarityStrings.screen.threeAtomsStringProperty,
      backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon()
    }, providedOptions );

    super(
      () => new ThreeAtomsModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new ThreeAtomsScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

/**
 * Creates the icon for this screen, a triatomic molecule with atoms 'A', 'B' and 'C'.
 */
function createScreenIcon(): ScreenIcon {

  const atomDiameter = 175;
  const bondLength = 1.05 * atomDiameter;
  const bondWidth = 0.15 * atomDiameter;
  const font = new PhetFont( { size: 80, weight: 'bold' } );

  const xOffset = Math.cos( Math.PI / 4 ) * bondLength;
  const yOffset = Math.sin( Math.PI / 4 ) * bondLength;

  const background = new Rectangle( 0, 0,
    Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height,
    { fill: MPColors.SCREEN_BACKGROUND } );

  const bondAB = new Line( 0, 0, -xOffset, yOffset, {
    stroke: MPColors.BOND,
    lineWidth: bondWidth,
    right: background.centerX,
    centerY: background.centerY
  } );

  const bondBC = new Line( 0, 0, xOffset, yOffset, {
    stroke: MPColors.BOND,
    lineWidth: bondWidth,
    left: background.centerX,
    centerY: background.centerY
  } );

  const atomA = new ShadedSphereNode( atomDiameter, {
    mainColor: MPColors.ATOM_A,
    centerX: bondAB.left,
    centerY: bondAB.bottom
  } );

  const atomB = new ShadedSphereNode( atomDiameter, {
    mainColor: MPColors.ATOM_B,
    centerX: bondAB.right,
    centerY: bondAB.top
  } );

  const atomC = new ShadedSphereNode( atomDiameter, {
    mainColor: MPColors.ATOM_C,
    centerX: bondBC.right,
    centerY: bondBC.bottom
  } );

  const textMaxWidth = 0.65 * atomDiameter;

  const textA = new Text( MoleculePolarityStrings.atomAStringProperty, {
    font: font,
    maxWidth: textMaxWidth
  } );

  const textB = new Text( MoleculePolarityStrings.atomBStringProperty, {
    font: font,
    maxWidth: textMaxWidth
  } );

  const textC = new Text( MoleculePolarityStrings.atomCStringProperty, {
    font: font,
    maxWidth: textMaxWidth
  } );

  const iconNode = new Node( { children: [ background, bondAB, bondBC, atomA, atomB, atomC, textA, textB, textC ] } );

  textA.boundsProperty.link( bounds => {
    textA.center = atomA.center;
  } );

  textB.boundsProperty.link( bounds => {
    textB.center = atomB.center;
  } );

  textC.boundsProperty.link( bounds => {
    textC.center = atomC.center;
  } );

  return new ScreenIcon( iconNode, {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 1
  } );
}

moleculePolarity.register( 'ThreeAtomsScreen', ThreeAtomsScreen );