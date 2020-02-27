// Copyright 2014-2019, University of Colorado Boulder

/**
 * The 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Line = require( 'SCENERY/nodes/Line' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Screen = require( 'JOIST/Screen' );
  const ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const ThreeAtomsModel = require( 'MOLECULE_POLARITY/threeatoms/model/ThreeAtomsModel' );
  const ThreeAtomsScreenView = require( 'MOLECULE_POLARITY/threeatoms/view/ThreeAtomsScreenView' );

  // strings
  const atomAString = require( 'string!MOLECULE_POLARITY/atomA' );
  const atomBString = require( 'string!MOLECULE_POLARITY/atomB' );
  const atomCString = require( 'string!MOLECULE_POLARITY/atomC' );
  const screenThreeAtomsString = require( 'string!MOLECULE_POLARITY/screen.threeAtoms' );

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

  return moleculePolarity.register( 'ThreeAtomsScreen', ThreeAtomsScreen );
} );