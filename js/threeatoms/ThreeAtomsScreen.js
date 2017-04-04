// Copyright 2014-2015, University of Colorado Boulder

/**
 * The 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ThreeAtomsModel = require( 'MOLECULE_POLARITY/threeatoms/model/ThreeAtomsModel' );
  var ThreeAtomsView = require( 'MOLECULE_POLARITY/threeatoms/view/ThreeAtomsView' );

  // strings
  var screenThreeAtomsString = require( 'string!MOLECULE_POLARITY/screen.threeAtoms' );
  var atomAString = require( 'string!MOLECULE_POLARITY/atomA' );
  var atomBString = require( 'string!MOLECULE_POLARITY/atomB' );
  var atomCString = require( 'string!MOLECULE_POLARITY/atomC' );

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
      function( model ) { return new ThreeAtomsView( model ); },
      options
    );
  }

  moleculePolarity.register( 'ThreeAtomsScreen', ThreeAtomsScreen );

  // creates the icon for this screen, a triatomic molecule with atoms 'A', 'B' and 'C'
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