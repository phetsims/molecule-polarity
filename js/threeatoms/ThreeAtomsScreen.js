// Copyright 2014-2022, University of Colorado Boulder

/**
 * The 'Three Atoms' screen.
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
import ThreeAtomsModel from './model/ThreeAtomsModel.js';
import ThreeAtomsScreenView from './view/ThreeAtomsScreenView.js';

class ThreeAtomsScreen extends Screen {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      name: moleculePolarityStrings.screen.threeAtoms,
      backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon(),
      tandem: Tandem.REQUIRED
    }, options );

    super(
      () => new ThreeAtomsModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new ThreeAtomsScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

/**
 * Creates the icon for this screen, a triatomic molecule with atoms 'A', 'B' and 'C'.
 * @returns {ScreenIcon}
 */
function createScreenIcon() {

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

  const textA = new Text( moleculePolarityStrings.atomA, {
    font: font,
    maxWidth: 0.75 * atomDiameter,
    center: atomA.center
  } );

  const textB = new Text( moleculePolarityStrings.atomB, {
    font: font,
    maxWidth: 0.75 * atomDiameter,
    center: atomB.center
  } );

  const textC = new Text( moleculePolarityStrings.atomC, {
    font: font,
    maxWidth: 0.75 * atomDiameter,
    center: atomC.center
  } );

  const iconNode = new Node( { children: [ background, bondAB, bondBC, atomA, atomB, atomC, textA, textB, textC ] } );

  return new ScreenIcon( iconNode, {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 1
  } );
}

moleculePolarity.register( 'ThreeAtomsScreen', ThreeAtomsScreen );
export default ThreeAtomsScreen;