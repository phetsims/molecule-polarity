// Copyright 2014-2017, University of Colorado Boulder

/**
 * A pair of arrows used to indicate that an arrow can be rotated.
 * Shapes are created in global coordinates, so this node's location should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CurvedArrowShape = require( 'SCENERY_PHET/CurvedArrowShape' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );

  /**
   * @param {Molecule} molecule
   * @param {Atom} atom
   * @constructor
   */
  function RotateArrowsNode( molecule, atom ) {

    // arrow configuration
    var arrowShapeOptions = { headWidth: 20, headHeight: 20, tailWidth: 10 };
    var arrowPathOptions = { fill: atom.color, stroke: 'gray' };
    var radius = ( 0.5 * atom.diameter ) + ( 0.5 * arrowShapeOptions.headWidth ) + 2; // distance of arrow's tip from the atom's center
    var theta = 0.1 * Math.PI; // central angle of the arc that the arrow traces

    Node.call( this, {
      children: [
        new Path( new CurvedArrowShape( radius, -theta, theta, arrowShapeOptions ), arrowPathOptions ),
        new Path( new CurvedArrowShape( radius, Math.PI - theta, Math.PI + theta, arrowShapeOptions ), arrowPathOptions )
      ]
    } );

    // Align with atom location and molecular dipole
    var updateTransform = function() {
      this.matrix = Matrix3
        .translationFromVector( atom.locationProperty.get() )
        .timesMatrix( Matrix3.rotation2( molecule.dipoleProperty.get().angle() + Math.PI / 2 ) );
    };
    molecule.dipoleProperty.link( updateTransform.bind( this ) ); // unlink not needed
    atom.locationProperty.link( updateTransform.bind( this ) ); // unlink not needed
  }

  moleculePolarity.register( 'RotateArrowsNode', RotateArrowsNode );

  return inherit( Node, RotateArrowsNode );
} );
