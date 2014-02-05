// Copyright 2002-2014, University of Colorado Boulder

/**
 * 2D surface that represents electrostatic potential for a diatomic molecule.
 * Electron density uses a 3-color gradient, so we use 2 Path nodes that meet in the middle.
 * This node's look is similar to the corresponding Jmol isosurface.
 * Shapes are created in world coordinates, so this node's offset should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var MoleculeAngleHandler = require( 'MOLECULE_POLARITY/common/view/MoleculeAngleHandler' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var DIAMETER_SCALE = 2.5; // multiply atom diameters by this scale when computing surface size
  var GRADIENT_WIDTH_MULTIPLIER = 5; // smaller values result in a more noticeable change as the EN sliders are dragged

  /**
   * @param {Molecule} molecule
   * @constructor
   */
  function ElectronDensityNode( molecule ) {

    assert && assert( molecule.atomA.diameter === molecule.atomB.diameter ); // creation of gradient assumes that both atoms have the same diameter

    var thisNode = this;
    Node.call( thisNode );

    thisNode.molecule = molecule;
    thisNode.electronegativityRange = MPConstants.ELECTRONEGATIVITY_RANGE;
    thisNode.colors = MPColors.RWB_GRADIENT;
    assert && assert( thisNode.colors.length === 3 ); // this implementation only works for 3 colors

    thisNode.pathA = new Path();
    thisNode.pathB = new Path();
    thisNode.addChild( this.pathA );
    thisNode.addChild( this.pathB );

    // update surface when atoms move or electronegativity changes
    var update = function() {
      if ( thisNode.visible ) {
        thisNode.updateShape();
        thisNode.updateFill();
      }
    };
    molecule.atoms.forEach( function( atom ) {
      atom.locationProperty.link( update );
      atom.electronegativityProperty.link( update );
    } );

    thisNode.cursor = 'pointer'; //TODO custom cursor, ala RotateCursorHandler in Java version
    thisNode.addInputListener( new MoleculeAngleHandler( molecule ) );
  }

  return inherit( Node, ElectronDensityNode, {

    // @override
    setVisible: function( visible ) {
      Node.prototype.setVisible.call( this, visible );
      if ( visible ) {
        this.updateShape();
        this.updateFill();
      }
    },

    /*
     * Updates the shape of the surface.
     * @private
     */
    updateShape: function() {

      // surround each atom with a 'cloud'
      var radius = this.molecule.atomA.diameter * DIAMETER_SCALE / 2;
      this.pathA.shape = Shape.circle( this.molecule.atomA.locationProperty.get().x, this.molecule.atomA.locationProperty.get().y, radius );
      this.pathB.shape = Shape.circle( this.molecule.atomB.locationProperty.get().x, this.molecule.atomB.locationProperty.get().y, radius );

      // rectangles for clipping where the clouds join at the center of the bond, with overlap so we don't see seam
      var bondLength = this.molecule.bond.getLength();
      var overlap = 1;
      var clipA = Shape.rectangle( -radius - ( bondLength / 2 ), -radius, radius + ( bondLength / 2 ) + overlap, 2 * radius );
      var clipB = Shape.rectangle( -overlap, -radius, radius + ( bondLength / 2 ) + overlap, 2 * radius );
      var transform = this.molecule.createTransform();
      this.pathA.clipArea = transform.transformShape( clipA );
      this.pathB.clipArea = transform.transformShape( clipB );
    },

    /*
     * Updates the surface fill. Width of the gradient expands as the difference in EN approaches zero.
     * @private
     */
    updateFill: function() {
      // scale varies from 1 to 0, approaches zero as EN difference approaches zero.
      var deltaEN = this.molecule.getDeltaEN();
      if ( deltaEN === 0 ) {
        this.pathA.fill = this.pathB.fill = this.colors[1];
      }
      else {
        var scale = Math.abs( deltaEN / this.electronegativityRange.getLength() );

        // width of the surface
        var surfaceWidth = this.molecule.bond.getLength() + ( DIAMETER_SCALE * this.molecule.atomA.diameter / 2 ) + ( DIAMETER_SCALE * this.molecule.atomB.diameter / 2 );

        // compute the gradient width
        var gradientWidth = Util.linear( 1, 0, surfaceWidth, surfaceWidth * GRADIENT_WIDTH_MULTIPLIER, scale );

        // gradient endpoints prior to accounting for molecule transform
        var pointCenter = new Vector2( 0, 0 );
        var pointA = new Vector2( -gradientWidth / 2, 0 );
        var pointB = new Vector2( gradientWidth / 2, 0 );

        // transform gradient endpoints to account for molecule transform
        var transform = this.molecule.createTransform();
        pointCenter = transform.transformPosition2( pointCenter );
        pointA = transform.transformPosition2( pointA );
        pointB = transform.transformPosition2( pointB );

        // choose colors based on polarity
        var colorCenter = this.colors[1];
        var colorA = ( deltaEN > 0 ) ? this.colors[2] : this.colors[0];
        var colorB = ( deltaEN > 0 ) ? this.colors[0] : this.colors[2];

        // create the gradients
        var gradientA = new LinearGradient( pointA.x, pointA.y, pointCenter.x, pointCenter.y );
        gradientA.addColorStop( 0, colorA );
        gradientA.addColorStop( 1, colorCenter );

        var gradientB = new LinearGradient( pointCenter.x, pointCenter.y, pointB.x, pointB.y );
        gradientB.addColorStop( 0, colorCenter );
        gradientB.addColorStop( 1, colorB );

        this.pathA.fill = gradientA;
        this.pathB.fill = gradientB;
      }
    }
  } );
} );