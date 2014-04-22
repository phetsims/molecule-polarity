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

    var radius = 0.65 * atom.diameter;
    var arrowOptions = { fill: atom.color, stroke: 'gray' };
    var leftArrowNode = new CurvedArrowNode( radius, 0.25 * Math.PI, 0.75 * Math.PI, arrowOptions );
    var rightArrowNode = new CurvedArrowNode( radius, 1.25 * Math.PI, 1.75 * Math.PI, arrowOptions );

    this.addChild( leftArrowNode );
    this.addChild( rightArrowNode );

    // Align with atom location and molecular dipole
    var updateTransform = function() {
      thisNode.transform = new Transform3( Matrix3
        .translationFromVector( atom.locationProperty.get() )
        .timesMatrix( Matrix3.rotation2( molecule.dipoleProperty.get().angle() ) )
      );
    };
    molecule.dipoleProperty.link( updateTransform );
    atom.locationProperty.link( updateTransform );
  }

  return inherit( Node, MoleculeAngleArrowsNode );
} );
