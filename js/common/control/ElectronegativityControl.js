// Copyright 2002-2014, University of Colorado Boulder

/**
 * Slider control for electronegativity.
 * Dragging the slider continuously updates an atom's electronegativity.
 * When the slider's thumb is released, it snaps to the closest tick mark.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var electronegativityString = require( 'string!MOLECULE_POLARITY/electronegativity' );
  var lessString = require( 'string!MOLECULE_POLARITY/less' );
  var moreString = require( 'string!MOLECULE_POLARITY/more' );
  var patternAtomNameString = require( 'string!MOLECULE_POLARITY/pattern.0atomName' );

  /**
   * @param {Atom} atom the atom whose electronegativity we're controlling
   * @param {Molecule2} molecule molecule that the atom belongs to, for pausing animation while this control is used
   * @param {Range} range range of electronegativity
   * @param {Number} snapInterval thumb will snap to this increment when released, also determines the tick mark spacing
   * @constructor
   */
  function ElectronegativityControl( atom, molecule, range, snapInterval ) {

    // titles
    var titleNode = new Text( StringUtils.format( patternAtomNameString, atom.name ), { font: new PhetFont( 20 ) } );
    var subtitleNode = new Text( electronegativityString, { font: new PhetFont( 14 ) } );

    // slider
    var sliderNode = new HSlider( atom.electronegativityProperty, range, {
      startDrag: function() {
        molecule.dragging = true;
      },
      endDrag: function() {
        molecule.dragging = false;
        //TODO why does this need to snap?
        // snap to tick mark
        atom.electronegativityProperty.set( Util.toFixedNumber( atom.electronegativityProperty.get() / snapInterval, 0 ) * snapInterval );
      }
    } );

    // slider tick labels
    var tickLabelOptions = { font: new PhetFont( 12 ) };
    sliderNode.addMajorTick( range.min, new Text( lessString, tickLabelOptions ) );
    sliderNode.addMajorTick( range.max, new Text( moreString, tickLabelOptions ) );
    var centerTick = range.min + ( range.getLength() / 2 );
    sliderNode.addMajorTick( centerTick );
    for ( var i = range.min + snapInterval; i < range.max; i += snapInterval ) {
      if ( i !== centerTick ) {
        sliderNode.addMinorTick( i );
      }
    }

    var content = new VBox( { children: [ titleNode, subtitleNode, sliderNode ], align: 'center', spacing: 10 } );

    Panel.call( this, content, { resize: false, fill: atom.color, stroke: 'black', xMargin: 25, yMargin: 12 } );
  }

  return inherit( Panel, ElectronegativityControl );
} );