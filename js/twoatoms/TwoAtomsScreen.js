// Copyright 2014-2017, University of Colorado Boulder

/**
 * The 'Two Atoms' screen.
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
  const TwoAtomsModel = require( 'MOLECULE_POLARITY/twoatoms/model/TwoAtomsModel' );
  const TwoAtomsScreenView = require( 'MOLECULE_POLARITY/twoatoms/view/TwoAtomsScreenView' );

  // strings
  const atomAString = require( 'string!MOLECULE_POLARITY/atomA' );
  const atomBString = require( 'string!MOLECULE_POLARITY/atomB' );
  const screenTwoAtomsString = require( 'string!MOLECULE_POLARITY/screen.twoAtoms' );

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