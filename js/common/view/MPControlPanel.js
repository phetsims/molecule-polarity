// Copyright 2017-2020, University of Colorado Boulder

/**
 * Control panel used throughout Molecule Polarity.
 * Responsible for inserting horizontal spacers between a set of sub-panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import HSeparator from '../../../../sun/js/HSeparator.js';
import Panel from '../../../../sun/js/Panel.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPColors from '../MPColors.js';
import MPConstants from '../MPConstants.js';

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

inherit( Panel, MPControlPanel );
export default MPControlPanel;