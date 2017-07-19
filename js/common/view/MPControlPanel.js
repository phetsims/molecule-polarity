// Copyright 2017, University of Colorado Boulder

/**
 * Control panel used throughout Molecule Polarity.
 * Responsible for inserting horizontal spacers between a set of sub-panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Panel = require( 'SUN/Panel' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @param {Node[]} subPanels
   * @constructor
   */
  function MPControlPanel( subPanels ) {

    // compute the horizontal separator width
    var separatorWidth = _.maxBy( subPanels, function( node ) { return node.width; } ).width;

    // put a horizontal separator between each sub-panel
    var children = [ subPanels[ 0 ] ];
    for ( var i = 1; i < subPanels.length; i++ ) {
      children.push( new HSeparator( separatorWidth ) );
      children.push( subPanels[ i ] );
    }

    var content = new VBox( {
      children: children,
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    } );

    Panel.call( this, content, {
      fill: MPColors.CONTROL_PANEL_BACKGROUND,
      xMargin: 20,
      yMargin: 15
    } );
  }

  moleculePolarity.register( 'MPControlPanel', MPControlPanel );

  return inherit( Panel, MPControlPanel );
} );
