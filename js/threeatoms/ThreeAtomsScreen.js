// Copyright 2014-2017, University of Colorado Boulder

/**
 * The 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
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

  /**
   * @constructor
   */
  function ThreeAtomsScreen() {

    var options = {
      name: screenThreeAtomsString,
      backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon()
    };

    Screen.call( this,
      function() { return new ThreeAtomsModel(); },
      function( model ) { return new ThreeAtomsScreenView( model ); },
      options
    );
  }

  moleculePolarity.register( 'ThreeAtomsScreen', ThreeAtomsScreen );

  /**
   * Creates the icon for this screen, a triatomic molecule with atoms 'A', 'B' and 'C'.
   * @returns {Node}
   */
  var createScreenIcon = function() {

    var atomDiameter = 175;
    var bondLength = 1.05 * atomDiameter;
    var bondWidth = 0.15 * atomDiameter;
    var font = new PhetFont( { size: 80, weight: 'bold' } );

    var xOffset = Math.cos( Math.PI / 4 ) * bondLength;
    var yOffset = Math.sin( Math.PI / 4 ) * bondLength;

    var background = new Rectangle( 0, 0, 548, 373, { fill: MPColors.SCREEN_BACKGROUND } );

    var bondAB = new Line( 0, 0, -xOffset, yOffset, {
      stroke: MPColors.BOND,
      lineWidth: bondWidth,
      right: background.centerX,
      centerY: background.centerY
    } );

    var bondBC = new Line( 0, 0, xOffset, yOffset, {
      stroke: MPColors.BOND,
      lineWidth: bondWidth,
      left: background.centerX,
      centerY: background.centerY
    } );

    var atomA = new ShadedSphereNode( atomDiameter, {
      mainColor: MPColors.ATOM_A,
      centerX: bondAB.left,
      centerY: bondAB.bottom
    } );

    var atomB = new ShadedSphereNode( atomDiameter, {
      mainColor: MPColors.ATOM_B,
      centerX: bondAB.right,
      centerY: bondAB.top
    } );

    var atomC = new ShadedSphereNode( atomDiameter, {
      mainColor: MPColors.ATOM_C,
      centerX: bondBC.right,
      centerY: bondBC.bottom
    } );

    var textA = new Text( atomAString, {
      font: font,
      maxWidth: 0.75 * atomDiameter,
      center: atomA.center
    } );

    var textB = new Text( atomBString, {
      font: font,
      maxWidth: 0.75 * atomDiameter,
      center: atomB.center
    } );

    var textC = new Text( atomCString, {
      font: font,
      maxWidth: 0.75 * atomDiameter,
      center: atomC.center
    } );

    return new Node( { children: [ background, bondAB, bondBC, atomA, atomB, atomC, textA, textB, textC ] } );
  };

  return inherit( Screen, ThreeAtomsScreen );
} );