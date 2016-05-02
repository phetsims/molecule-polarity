// Copyright 2014-2015, University of Colorado Boulder

/**
 * Drag handler for manipulating orientation of a molecule.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Molecule} molecule
   * @param {Node} relativeNode
   * @constructor
   */
  function MoleculeAngleHandler( molecule, relativeNode ) {

    var previousAngle; // angle between the pointer and the molecule when the drag started

    var getAngle = function( event ) {
      var point = relativeNode.globalToParentPoint( event.pointer.point );
      return new Vector2( point.x - molecule.location.x, point.y - molecule.location.y ).angle();
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

  moleculePolarity.register( 'MoleculeAngleHandler', MoleculeAngleHandler );

  return inherit( SimpleDragHandler, MoleculeAngleHandler );
} );
