// Copyright 2014-2026, University of Colorado Boulder

/**
 * The 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import ShadedSphereNode from '../../../scenery-phet/js/ShadedSphereNode.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../scenery/js/nodes/Text.js';
import Tandem from '../../../tandem/js/Tandem.js';
import MPColors from '../common/MPColors.js';
import MoleculePolarityFluent from '../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../MoleculePolarityStrings.js';
import ThreeAtomsModel from './model/ThreeAtomsModel.js';
import ThreeAtomsKeyboardHelpContent from './view/description/ThreeAtomsKeyboardHelpContent.js';
import ThreeAtomsScreenView from './view/ThreeAtomsScreenView.js';

export default class ThreeAtomsScreen extends Screen<ThreeAtomsModel, ThreeAtomsScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {
      name: MoleculePolarityFluent.screen.threeAtomsStringProperty,
      backgroundColorProperty: MPColors.screenBackgroundColorProperty,
      homeScreenIcon: createScreenIcon(),
      screenButtonsHelpText: MoleculePolarityFluent.a11y.common.screenIcons.threeAtomsStringProperty,
      createKeyboardHelpNode: () => new ThreeAtomsKeyboardHelpContent(),
      tandem: tandem
    };

    super(
      () => new ThreeAtomsModel( options.tandem.createTandem( 'model' ) ),
      model => new ThreeAtomsScreenView( model, options.tandem.createTandem( 'view' ) ),
      options
    );
  }
}

/**
 * Creates the icon for this screen, a triatomic molecule with atoms 'A', 'B' and 'C'.
 */
function createScreenIcon(): ScreenIcon {

  const atomDiameter = 175;
  const bondLength = 1.2 * atomDiameter;
  const bondWidth = 0.15 * atomDiameter;
  const font = new PhetFont( { size: 80, weight: 'bold' } );

  const xOffset = Math.cos( Math.PI / 4 ) * bondLength;
  const yOffset = Math.sin( Math.PI / 4 ) * bondLength;

  const background = new Rectangle( 0, 0,
    Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height,
    { fill: MPColors.screenBackgroundColorProperty } );

  const bondAB = new Rectangle( 0, 0, bondWidth, bondLength, {
    fill: MPColors.BOND,
    stroke: 'black',
    lineWidth: 2,
    rotation: Math.PI / 4,
    centerX: background.centerX - xOffset / 2,
    centerY: background.centerY
  } );

  const bondBC = new Rectangle( 0, 0, bondWidth, bondLength, {
    fill: MPColors.BOND,
    stroke: 'black',
    lineWidth: 2,
    rotation: -Math.PI / 4,
    centerX: background.centerX + xOffset / 2,
    centerY: background.centerY
  } );

  const atomA = new ShadedSphereNode( atomDiameter, {
    mainColor: MPColors.ATOM_A,
    centerX: background.centerX - xOffset,
    centerY: background.centerY + yOffset / 2,
    stroke: 'black',
    lineWidth: 2
  } );

  const atomB = new ShadedSphereNode( atomDiameter, {
    mainColor: MPColors.ATOM_B,
    centerX: background.centerX,
    centerY: background.centerY - yOffset / 2,
    stroke: 'black',
    lineWidth: 2
  } );

  const atomC = new ShadedSphereNode( atomDiameter, {
    mainColor: MPColors.ATOM_C,
    centerX: background.centerX + xOffset,
    centerY: background.centerY + yOffset / 2,
    stroke: 'black',
    lineWidth: 2
  } );

  const textMaxWidth = 0.65 * atomDiameter;

  const textA = new Text( MoleculePolarityStrings.AStringProperty, {
    font: font,
    maxWidth: textMaxWidth
  } );

  const textB = new Text( MoleculePolarityStrings.BStringProperty, {
    font: font,
    maxWidth: textMaxWidth
  } );

  const textC = new Text( MoleculePolarityStrings.CStringProperty, {
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
