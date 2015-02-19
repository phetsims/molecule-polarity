// Copyright 2002-2014, University of Colorado Boulder

/**
 * 2D surface that represents electron density for a diatomic molecule.
 * Electron density uses a 2-color gradient, so we can use a single PPath.
 * This node's look is similar to the corresponding Jmol isosurface.
 * Shapes are created in world coordinates, so this node's offset should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
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
  var DIAMETER_SCALE = 2.25; // multiply atom diameters by this scale when computing surface size
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
    thisNode.colors = MPColors.BW_GRADIENT;
    assert && assert( thisNode.colors.length === 2 ); // this implementation only works for 2 colors

    // each atom is surrounded with a 'cloud' (circle)
    var radius = this.molecule.atomA.diameter * DIAMETER_SCALE / 2;
    thisNode.path = new Path( new Shape()
        .arc( molecule.location.x - this.molecule.atomB.locationProperty.get().x, molecule.location.y - this.molecule.atomB.locationProperty.get().y, radius, Math.PI / 4, 7 * Math.PI / 4 )
        .arc( molecule.location.x - this.molecule.atomA.locationProperty.get().x, molecule.location.y - this.molecule.atomA.locationProperty.get().y, radius, 5 * Math.PI / 4, 3 * Math.PI / 4 )
    );
    thisNode.addChild( this.path );

    // update surface when atoms move or electronegativity changes
    var update = function() {
      if ( thisNode.visible ) {
        thisNode.updateFill();
      }
    };
    molecule.atoms.forEach( function( atom ) {
      atom.electronegativityProperty.link( update );
    } );

    molecule.angleProperty.link( function( angle ) {
      if ( thisNode.visible ) {
        thisNode.matrix = molecule.createTransformMatrix();
      }
    } );

    thisNode.cursor = 'pointer';
    thisNode.addInputListener( new MoleculeAngleHandler( molecule, thisNode ) );
  }

  return inherit( Node, ElectronDensityNode, {

    // @override
    setVisible: function( visible ) {
      Node.prototype.setVisible.call( this, visible );
      if ( visible ) {
        this.matrix = this.molecule.createTransformMatrix();
        this.updateFill();
      }
    },

    /*
     * Updates the surface fill. Width of the gradient expands as the difference in EN approaches zero.
     * @private
     */
    updateFill: function() {
      // scale varies from 1 to 0, approaches zero as EN difference approaches zero.
      var deltaEN = this.molecule.getDeltaEN();
      if ( deltaEN === 0 ) {
        // no difference, use neutral color that's halfway between "more" and "less" colors
        this.path.fill = MPColors.NEUTRAL_GRAY;
      }
      else {
        var scale = Math.abs( deltaEN / this.electronegativityRange.getLength() );

        // width of the surface
        var surfaceWidth = this.molecule.bond.getLength() + ( DIAMETER_SCALE * this.molecule.atomA.diameter / 2 ) + ( DIAMETER_SCALE * this.molecule.atomB.diameter / 2 );

        // compute the gradient width
        var gradientWidth = Util.linear( 1, 0, surfaceWidth, surfaceWidth * GRADIENT_WIDTH_MULTIPLIER, scale );

        // gradient endpoints prior to accounting for molecule transform
        var pointA = new Vector2( -gradientWidth / 2, 0 );
        var pointB = new Vector2( gradientWidth / 2, 0 );

        // choose colors based on polarity
        var colorA = ( deltaEN > 0 ) ? this.colors[ 1 ] : this.colors[ 0 ];
        var colorB = ( deltaEN > 0 ) ? this.colors[ 0 ] : this.colors[ 1 ];

        // create the gradient
        var gradient = new LinearGradient( pointA.x, pointA.y, pointB.x, pointB.y );
        gradient.addColorStop( 0, colorA );
        gradient.addColorStop( 1, colorB );

        this.path.fill = gradient;
      }
    }
  } );
} );