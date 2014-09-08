// Copyright 2002-2014, University of Colorado Boulder

/**
 * A pair of arrows that are placed around an atom, indicating that dragging the atom will change the bond angle.
 * Shapes are created in world coordinates, so this node's offset should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowShape = require( 'SCENERY_PHET/ArrowShape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Transform3 = require( 'DOT/Transform3' );

  /**
   * @param {Molecule} molecule
   * @param {Atom} atom
   * @param {Object} options
   * @constructor
   */
  function BondAngleArrowsNode( molecule, atom, options ) {

    options = _.extend( {
      length: 25 // relatively short, so we don't need curved arrows
    }, options );

    Node.call( this );

    var leftArrowNode = new Path( null, { fill: atom.color, stroke: 'gray' } );
    var rightArrowNode = new Path( null, { fill: atom.color, stroke: 'gray' } );

    this.addChild( leftArrowNode );
    this.addChild( rightArrowNode );

    // create "normalized" shapes at (0,0) with no rotation
    var arrowShapeOptions = { headWidth: 20, headHeight: 20, tailWidth: 10 };
    var radius = atom.diameter / 2;
    var spacing = 2;
    var leftArrow = new ArrowShape( -( radius + spacing ), 0, -( radius + spacing + options.length ), 0, arrowShapeOptions );
    var rightArrow = new ArrowShape( ( radius + spacing ), 0, ( radius + spacing + options.length ), 0, arrowShapeOptions );

    atom.locationProperty.link( function() {
      // transform the arrow shapes to account for atom location and relationship to molecule location
      var v = molecule.location.minus( atom.locationProperty.get() );
      var angle = v.angle() - ( Math.PI / 2 );
      var transform = new Transform3( Matrix3.translationFromVector( atom.locationProperty.get() ).timesMatrix( Matrix3.rotation2( angle ) ) );
      leftArrowNode.shape = transform.transformShape( leftArrow );
      rightArrowNode.shape = transform.transformShape( rightArrow );
    } );
  }

  return inherit( Node, BondAngleArrowsNode );
} );