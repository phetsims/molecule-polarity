// Copyright 2014-2022, University of Colorado Boulder

/**
 * The 'Two Atoms' screen.
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
import TwoAtomsModel from './model/TwoAtomsModel.js';
import TwoAtomsScreenView from './view/TwoAtomsScreenView.js';

type SelfOptions = EmptySelfOptions;

type TwoAtomsScreenOptions = SelfOptions & PickRequired<ScreenOptions, 'tandem'>;

export default class TwoAtomsScreen extends Screen<TwoAtomsModel, TwoAtomsScreenView> {

  public constructor( providedOptions: TwoAtomsScreenOptions ) {

    const options = optionize<TwoAtomsScreenOptions, SelfOptions, ScreenOptions>()( {

      // ScreenOptions
      name: MoleculePolarityStrings.screen.twoAtomsStringProperty,
      backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon()
    }, providedOptions );

    super(
      () => new TwoAtomsModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new TwoAtomsScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

/**
 * Creates the icon for this screen, a diatomic molecule with atoms 'A' and 'B'.
 */
function createScreenIcon(): ScreenIcon {

  const atomDiameter = 225;
  const bondLength = 1.15 * atomDiameter;
  const bondWidth = 0.15 * atomDiameter;
  const font = new PhetFont( { size: 94, weight: 'bold' } );

  const background = new Rectangle( 0, 0,
    Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.width, Screen.MINIMUM_HOME_SCREEN_ICON_SIZE.height,
    { fill: MPColors.SCREEN_BACKGROUND } );

  const bond = new Line( 0, 0, bondLength, 0, {
    stroke: MPColors.BOND,
    lineWidth: bondWidth,
    center: background.center
  } );

  const atomA = new ShadedSphereNode( atomDiameter, {
    mainColor: MPColors.ATOM_A,
    centerX: bond.left,
    y: bond.centerY
  } );

  const atomB = new ShadedSphereNode( atomDiameter, {
    mainColor: MPColors.ATOM_B,
    centerX: bond.right,
    y: bond.centerY
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

  const iconNode = new Node( { children: [ background, bond, atomA, atomB, textA, textB ] } );

  textA.boundsProperty.link( bounds => {
    textA.center = atomA.center;
  } );

  textB.boundsProperty.link( bounds => {
    textB.center = atomB.center;
  } );

  return new ScreenIcon( iconNode, {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 1
  } );
}

moleculePolarity.register( 'TwoAtomsScreen', TwoAtomsScreen );