// Copyright 2002-2014, University of Colorado Boulder

/**
 * The 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ThreeAtomsModel = require( 'MOLECULE_POLARITY/threeatoms/model/ThreeAtomsModel' );
  var ThreeAtomsView = require( 'MOLECULE_POLARITY/threeatoms/view/ThreeAtomsView' );

  // strings
  var screenTitle = require( 'string!MOLECULE_POLARITY/threeAtoms' );
  var aString = require( 'string!MOLECULE_POLARITY/A' );
  var bString = require( 'string!MOLECULE_POLARITY/B' );
  var cString = require( 'string!MOLECULE_POLARITY/C' );

  // creates the icon for this screen, a triatomic molecule with atoms 'A', 'B' and 'C'
  var createScreenIcon = function() {

    var atomDiameter = 175;
    var bondLength = 1.05 * atomDiameter;
    var bondWidth = 0.15 * atomDiameter;
    var font = new PhetFont( { size: 80, weight: 'bold' } );

    var xOffset = Math.cos( Math.PI / 4 ) * bondLength;
    var yOffset = Math.sin( Math.PI / 4 ) * bondLength;

    var background = new Rectangle( 0, 0, 548, 373, { fill: MPColors.SCREEN_BACKGROUND } );
    var bondAB = new Line( 0, 0, -xOffset, yOffset, {  stroke: MPColors.BOND, lineWidth: bondWidth, right: background.centerX, centerY: background.centerY  } );
    var bondBC = new Line( 0, 0, xOffset, yOffset, {  stroke: MPColors.BOND, lineWidth: bondWidth, left: background.centerX, centerY: background.centerY  } );
    var atomA = new ShadedSphereNode( atomDiameter, { mainColor: MPColors.ATOM_A, centerX: bondAB.left, centerY: bondAB.bottom } );
    var atomB = new ShadedSphereNode( atomDiameter, { mainColor: MPColors.ATOM_B, centerX: bondAB.right, centerY: bondAB.top } );
    var atomC = new ShadedSphereNode( atomDiameter, { mainColor: MPColors.ATOM_C, centerX: bondBC.right, centerY: bondBC.bottom } );
    var textA = new Text( aString, { font: font, center: atomA.center } );
    var textB = new Text( bString, { font: font, center: atomB.center } );
    var textC = new Text( cString, { font: font, center: atomC.center } );
    return new Node( { children: [ background, bondAB, bondBC, atomA, atomB, atomC, textA, textB, textC ] } );
  };

  function ThreeAtomsScreen() {
    Screen.call( this,
      screenTitle,
      createScreenIcon(),
      function() { return new ThreeAtomsModel(); },
      function( model ) { return new ThreeAtomsView( model ); },
      { backgroundColor: MPColors.SCREEN_BACKGROUND }
    );
  }

  return inherit( Screen, ThreeAtomsScreen );
} );