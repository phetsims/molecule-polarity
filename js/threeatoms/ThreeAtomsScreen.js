// Copyright 2014-2019, University of Colorado Boulder

/**
 * The 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import ShadedSphereNode from '../../../scenery-phet/js/ShadedSphereNode.js';
import Line from '../../../scenery/js/nodes/Line.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../scenery/js/nodes/Text.js';
import MPColors from '../common/MPColors.js';
import moleculePolarityStrings from '../molecule-polarity-strings.js';
import moleculePolarity from '../moleculePolarity.js';
import ThreeAtomsModel from './model/ThreeAtomsModel.js';
import ThreeAtomsScreenView from './view/ThreeAtomsScreenView.js';

const atomAString = moleculePolarityStrings.atomA;
const atomBString = moleculePolarityStrings.atomB;
const atomCString = moleculePolarityStrings.atomC;
const screenThreeAtomsString = moleculePolarityStrings.screen.threeAtoms;

class ThreeAtomsScreen extends Screen {

  constructor() {

    const options = {
      name: screenThreeAtomsString,
      backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon()
    };

    super(
      () => new ThreeAtomsModel(),
      model => new ThreeAtomsScreenView( model ),
      options
    );
  }
}

/**
 * Creates the icon for this screen, a triatomic molecule with atoms 'A', 'B' and 'C'.
 * @returns {Node}
 */
function createScreenIcon() {

  const atomDiameter = 175;
  const bondLength = 1.05 * atomDiameter;
  const bondWidth = 0.15 * atomDiameter;
  const font = new PhetFont( { size: 80, weight: 'bold' } );

  const xOffset = Math.cos( Math.PI / 4 ) * bondLength;
  const yOffset = Math.sin( Math.PI / 4 ) * bondLength;

  const background = new Rectangle( 0, 0, 548, 373, { fill: MPColors.SCREEN_BACKGROUND } );

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

  const textA = new Text( atomAString, {
    font: font,
    maxWidth: 0.75 * atomDiameter,
    center: atomA.center
  } );

  const textB = new Text( atomBString, {
    font: font,
    maxWidth: 0.75 * atomDiameter,
    center: atomB.center
  } );

  const textC = new Text( atomCString, {
    font: font,
    maxWidth: 0.75 * atomDiameter,
    center: atomC.center
  } );

  return new Node( { children: [ background, bondAB, bondBC, atomA, atomB, atomC, textA, textB, textC ] } );
}

moleculePolarity.register( 'ThreeAtomsScreen', ThreeAtomsScreen );
export default ThreeAtomsScreen;