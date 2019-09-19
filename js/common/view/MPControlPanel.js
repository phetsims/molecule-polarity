// Copyright 2017, University of Colorado Boulder

/**
 * Control panel used throughout Molecule Polarity.
 * Responsible for inserting horizontal spacers between a set of sub-panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const HSeparator = require( 'SUN/HSeparator' );
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  const MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  const Panel = require( 'SUN/Panel' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @param {Node[]} subPanels
   * @constructor
   */
  function MPControlPanel( subPanels ) {

    // horizontal separator width is the max width of the subPanels
    const separatorWidth = _.maxBy( subPanels, function( node ) { return node.width; } ).width;

    // put a horizontal separator between each sub-panel
    const children = [ subPanels[ 0 ] ];
    for ( let i = 1; i < subPanels.length; i++ ) {
      children.push( new HSeparator( separatorWidth ) );
      children.push( subPanels[ i ] );
    }

    const content = new VBox( {
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
