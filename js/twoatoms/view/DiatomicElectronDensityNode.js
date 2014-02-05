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

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var MoleculeDragHandler = require( 'MOLECULE_POLARITY/common/view/MoleculeDragHandler' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Transform3 = require( 'DOT/Transform3' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var DIAMETER_SCALE = 2.5; // multiply atom diameters by this scale when computing surface size
  var GRADIENT_WIDTH_MULTIPLIER = 5; // smaller values result in a more noticeable change as the EN sliders are dragged

  /**
   * @param {Molecule} molecule
   * @constructor
   */
  function DiatomicElectronDensityNode( molecule ) {

    assert && assert( molecule.atomA.diameter === molecule.atomB.diameter ); // creation of gradient assumes that both atoms have the same diameter

    var thisNode = this;
    Node.call( thisNode );

    thisNode.molecule = molecule;
    thisNode.electronegativityRange = MPConstants.ELECTRONEGATIVITY_RANGE;
    thisNode.colors = MPColors.BW_GRADIENT;
    assert && assert( thisNode.colors.length === 2 ); // this implementation only works for 2 colors

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
    thisNode.addInputListener( new MoleculeDragHandler( molecule ) );
  }

  return inherit( Node, DiatomicElectronDensityNode, {

    //TODO this should be one Path, whose shape is 2 circles combined using constructive area geometry
    /*
     * Updates the shape of the surface.
     * @private
     */
    updateShape: function() {
      this.pathA.shape = DiatomicElectronDensityNode.createCloudShape( this.molecule.atomA, DIAMETER_SCALE );
      this.pathB.shape = DiatomicElectronDensityNode.createCloudShape( this.molecule.atomB, DIAMETER_SCALE );
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
        this.pathA.fill = this.pathB.fill = MPColors.NEUTRAL_GRAY;
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

        // transform gradient endpoints to account for molecule transform
        var transform = DiatomicElectronDensityNode.createTransform( this.molecule );
        pointA = transform.transformPosition2( pointA );
        pointB = transform.transformPosition2( pointB );

        // choose colors based on polarity
        var colorA = ( deltaEN > 0 ) ? this.colors[1] : this.colors[0];
        var colorB = ( deltaEN > 0 ) ? this.colors[0] : this.colors[1];

        // create the gradient
        var gradient = new LinearGradient( pointA.x, pointA.y, pointB.x, pointB.y );
        gradient.addColorStop( 0, colorA );
        gradient.addColorStop( 1, colorB );

        this.pathA.fill = gradient;
        this.pathB.fill = gradient;
      }
    }
  }, {

    /*
     * Creates the shape of a "cloud" around an atom.
     * @static
     * @private
     * @param {Atom} atom
     * @param {Number} diameterScale
     * @returns {Shape}
     */
    createCloudShape: function( atom, diameterScale ) {
      var radius = ( diameterScale * atom.diameter ) / 2;
      return Shape.ellipse( atom.locationProperty.get().x, atom.locationProperty.get().y, radius, radius, 0 );
    },

    /*
     * Creates a transform that accounts for the molecule's location and orientation.
     * @static
     * @private
     * @param {Molecule} molecule
     * @returns {Transform3}
     */
    createTransform: function( molecule ) {
      return new Transform3( Matrix3.translation( molecule.location.x, molecule.location.y ).timesMatrix( Matrix3.rotation2( molecule.angleProperty.get() ) ) );
    }
  } );
} );