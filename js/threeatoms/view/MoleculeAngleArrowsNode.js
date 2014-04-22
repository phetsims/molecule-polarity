// Copyright 2002-2014, University of Colorado Boulder

/**
 * A pair of arrows that are placed around an atom, indicating that dragging the atom will change the molecule angle.
 * Shapes are created in world coordinates, so this node's offset should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var CurvedArrowNode = require( 'MOLECULE_POLARITY/common/view/CurvedArrowNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Transform3 = require( 'DOT/Transform3' );

  /**
   * @param {Molecule} molecule
   * @param {Atom} atom
   * @param {*} options
   * @constructor
   */
  function MoleculeAngleArrowsNode( molecule, atom, options ) {

    options = _.extend( {
      length: 25 // relatively short, so we don't need curved arrows
    }, options );

    var thisNode = this;
    Node.call( this );

    var radius = 0.65 * atom.diameter; // distance of the arrows from the atom's center
    var theta = 0.15 * Math.PI; // central angle of the arc that the arrow traces
    var arrowOptions = { fill: atom.color, stroke: 'gray' };
    var leftArrowNode = new CurvedArrowNode( radius, -theta, theta, arrowOptions );
    var rightArrowNode = new CurvedArrowNode( radius, Math.PI - theta, Math.PI + theta, arrowOptions );

    this.addChild( leftArrowNode );
    this.addChild( rightArrowNode );

    // Align with atom location and molecular dipole
    var updateTransform = function() {
      thisNode.transform = new Transform3( Matrix3
        .translationFromVector( atom.locationProperty.get() )
        .timesMatrix( Matrix3.rotation2( molecule.dipoleProperty.get().angle() + Math.PI / 2 ) )
      );
    };
    molecule.dipoleProperty.link( updateTransform );
    atom.locationProperty.link( updateTransform );
  }

  return inherit( Node, MoleculeAngleArrowsNode );
} );
