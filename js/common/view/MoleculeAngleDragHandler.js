// Copyright 2014-2019, University of Colorado Boulder

/**
 * Drag handler for manipulating orientation of a molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Molecule} molecule
   * @param {Node} relativeNode - angles are computed relative to this Node
   * @constructor
   */
  function MoleculeAngleDragHandler( molecule, relativeNode ) {

    var previousAngle; // angle between the pointer and the molecule when the drag started

    /**
     * Gets the angle of the pointer relative to relativeNode.
     * @param {Event} event
     * @returns {number} angle in radians
     */
    var getAngle = function( event ) {
      var point = relativeNode.globalToParentPoint( event.pointer.point );
      return new Vector2( point.x - molecule.location.x, point.y - molecule.location.y ).angle;
    };

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      start: function( event ) {
        molecule.dragging = true;
        previousAngle = getAngle( event );
      },

      drag: function( event ) {
        var currentAngle = getAngle( event );
        molecule.angleProperty.set( molecule.angleProperty.get() + currentAngle - previousAngle );
        previousAngle = currentAngle;
      },

      end: function( event ) {
        molecule.dragging = false;
      }
    } );
  }

  moleculePolarity.register( 'MoleculeAngleDragHandler', MoleculeAngleDragHandler );

  return inherit( SimpleDragHandler, MoleculeAngleDragHandler );
} );
