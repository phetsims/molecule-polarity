// Copyright 2014-2019, University of Colorado Boulder

/**
 * The 'Two Atoms' screen.
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
import TwoAtomsModel from './model/TwoAtomsModel.js';
import TwoAtomsScreenView from './view/TwoAtomsScreenView.js';

const atomAString = moleculePolarityStrings.atomA;
const atomBString = moleculePolarityStrings.atomB;
const screenTwoAtomsString = moleculePolarityStrings.screen.twoAtoms;

class TwoAtomsScreen extends Screen {

  constructor() {

    const options = {
      name: screenTwoAtomsString,
      backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon()
    };

    super(
      () => new TwoAtomsModel(),
      model => new TwoAtomsScreenView( model ),
      options
    );
  }
}

/**
 * Creates the icon for this screen, a diatomic molecule with atoms 'A' and 'B'.
 * @returns {Node}
 */
function createScreenIcon() {

  const atomDiameter = 225;
  const bondLength = 1.15 * atomDiameter;
  const bondWidth = 0.15 * atomDiameter;
  const font = new PhetFont( { size: 94, weight: 'bold' } );

  const background = new Rectangle( 0, 0, 548, 373, { fill: MPColors.SCREEN_BACKGROUND } );

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

  return new Node( { children: [ background, bond, atomA, atomB, textA, textB ] } );
}

moleculePolarity.register( 'TwoAtomsScreen', TwoAtomsScreen );
export default TwoAtomsScreen;