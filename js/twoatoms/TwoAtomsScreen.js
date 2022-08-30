// Copyright 2014-2022, University of Colorado Boulder

/**
 * The 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import merge from '../../../phet-core/js/merge.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import ShadedSphereNode from '../../../scenery-phet/js/ShadedSphereNode.js';
import { Line, Node, Rectangle, Text } from '../../../scenery/js/imports.js';
import Tandem from '../../../tandem/js/Tandem.js';
import MPColors from '../common/MPColors.js';
import moleculePolarity from '../moleculePolarity.js';
import moleculePolarityStrings from '../moleculePolarityStrings.js';
import TwoAtomsModel from './model/TwoAtomsModel.js';
import TwoAtomsScreenView from './view/TwoAtomsScreenView.js';

class TwoAtomsScreen extends Screen {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      name: moleculePolarityStrings.screen.twoAtomsStringProperty,
      backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon(),
      tandem: Tandem.REQUIRED
    }, options );

    super(
      () => new TwoAtomsModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new TwoAtomsScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

/**
 * Creates the icon for this screen, a diatomic molecule with atoms 'A' and 'B'.
 * @returns {ScreenIcon}
 */
function createScreenIcon() {

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

  const textA = new Text( moleculePolarityStrings.atomAStringProperty, {
    font: font,
    maxWidth: 0.75 * atomDiameter,
    center: atomA.center
  } );

  const textB = new Text( moleculePolarityStrings.atomBStringProperty, {
    font: font,
    maxWidth: 0.75 * atomDiameter,
    center: atomB.center
  } );

  const iconNode = new Node( { children: [ background, bond, atomA, atomB, textA, textB ] } );

  return new ScreenIcon( iconNode, {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 1
  } );
}

moleculePolarity.register( 'TwoAtomsScreen', TwoAtomsScreen );
export default TwoAtomsScreen;