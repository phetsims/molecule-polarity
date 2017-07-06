// Copyright 2014-2017, University of Colorado Boulder

/**
 * Slider control for electronegativity.
 * Dragging the slider continuously updates an atom's electronegativity.
 * When the slider's thumb is released, it snaps to the closest tick mark.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var electronegativityString = require( 'string!MOLECULE_POLARITY/electronegativity' );
  var lessString = require( 'string!MOLECULE_POLARITY/less' );
  var moreString = require( 'string!MOLECULE_POLARITY/more' );
  var patternAtomNameString = require( 'string!MOLECULE_POLARITY/pattern.atomName' );

  /**
   * @param {Atom} atom the atom whose electronegativity we're controlling
   * @param {Molecule} molecule molecule that the atom belongs to, for pausing animation while this control is used
   * @param {Object} [options]
   * @constructor
   */
  function ElectronegativityControl( atom, molecule, options ) {

    options = _.extend( {
      range: MPConstants.ELECTRONEGATIVITY_RANGE,
      tickInterval: MPConstants.ELECTRONEGATIVITY_TICK_SPACING,
      snapToTick: false,
      trackSize: new Dimension2( 150, 5 )
    } );

    // titles
    var titleNode = new Text( StringUtils.fillIn( patternAtomNameString, { name: atom.name } ), {
      font: new PhetFont( { size: 20, weight: 'bold' } ),
      maxWidth: options.trackSize.width
    } );
    var subtitleNode = new Text( electronegativityString, {
      font: new PhetFont( 18 ),
      maxWidth: options.trackSize.width
    } );

    // slider
    var sliderNode = new HSlider( atom.electronegativityProperty, options.range, {
      trackSize: options.trackSize,
      startDrag: function() {
        molecule.dragging = true;
      },
      endDrag: function() {
        molecule.dragging = false;
        if ( options.snapToTick ) {
          atom.electronegativityProperty.set( Util.toFixedNumber( atom.electronegativityProperty.get() / options.tickInterval, 0 ) * options.tickInterval );
        }
      }
    } );

    // slider tick labels
    var tickLabelOptions = {
      font: new PhetFont( 16 ),
      maxWidth: 40
    };
    sliderNode.addMajorTick( options.range.min, new Text( lessString, tickLabelOptions ) );
    sliderNode.addMajorTick( options.range.max, new Text( moreString, tickLabelOptions ) );
    var centerTick = options.range.min + ( options.range.getLength() / 2 );
    sliderNode.addMajorTick( centerTick );
    for ( var i = options.range.min + options.tickInterval; i < options.range.max; i += options.tickInterval ) {
      if ( i !== centerTick ) {
        sliderNode.addMinorTick( i );
      }
    }

    var content = new Node( { children: [ titleNode, subtitleNode, sliderNode ] } );
    subtitleNode.centerX = sliderNode.centerX = titleNode.centerX;
    subtitleNode.top = titleNode.bottom;
    sliderNode.top = subtitleNode.bottom + 8;

    Panel.call( this, content, {
      fill: atom.color, 
      stroke: 'black',
      xMargin: 15,
      yMargin: 6
    } );
  }

  moleculePolarity.register( 'ElectronegativityControl', ElectronegativityControl );

  return inherit( Panel, ElectronegativityControl );
} );