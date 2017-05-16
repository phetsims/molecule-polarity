// Copyright 2014-2017, University of Colorado Boulder

/**
 * The 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var TwoAtomsModel = require( 'MOLECULE_POLARITY/twoatoms/model/TwoAtomsModel' );
  var TwoAtomsScreenView = require( 'MOLECULE_POLARITY/twoatoms/view/TwoAtomsScreenView' );

  // strings
  var screenTwoAtomsString = require( 'string!MOLECULE_POLARITY/screen.twoAtoms' );
  var atomAString = require( 'string!MOLECULE_POLARITY/atomA' );
  var atomBString = require( 'string!MOLECULE_POLARITY/atomB' );

  /**
   * @constructor
   */
  function TwoAtomsScreen() {

    var options = {
      name: screenTwoAtomsString,
      backgroundColorProperty: new Property( MPColors.SCREEN_BACKGROUND ),
      homeScreenIcon: createScreenIcon()
    };

    Screen.call( this,
      function() { return new TwoAtomsModel(); },
      function( model ) { return new TwoAtomsScreenView( model ); },
      options
    );
  }

  moleculePolarity.register( 'TwoAtomsScreen', TwoAtomsScreen );

  /**
   * Creates the icon for this screen, a diatomic molecule with atoms 'A' and 'B'.
   * @returns {Node}
   */
  var createScreenIcon = function() {

    var atomDiameter = 225;
    var bondLength = 1.15 * atomDiameter;
    var bondWidth = 0.15 * atomDiameter;
    var font = new PhetFont( { size: 94, weight: 'bold' } );

    var background = new Rectangle( 0, 0, 548, 373, { fill: MPColors.SCREEN_BACKGROUND } );

    var bond = new Line( 0, 0, bondLength, 0, {
      stroke: MPColors.BOND,
      lineWidth: bondWidth,
      center: background.center
    } );

    var atomA = new ShadedSphereNode( atomDiameter, {
      mainColor: MPColors.ATOM_A,
      centerX: bond.left,
      y: bond.centerY
    } );

    var atomB = new ShadedSphereNode( atomDiameter, {
      mainColor: MPColors.ATOM_B,
      centerX: bond.right,
      y: bond.centerY
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

    return new Node( { children: [ background, bond, atomA, atomB, textA, textB ] } );
  };

  return inherit( Screen, TwoAtomsScreen );
} );