// Copyright 2017-2021, University of Colorado Boulder

/**
 * Control panel used throughout Molecule Polarity.
 * Responsible for inserting horizontal spacers between a set of sub-panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import AssertUtils from '../../../../phetcommon/js/AssertUtils.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import HSeparator from '../../../../sun/js/HSeparator.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPColors from '../MPColors.js';
import MPConstants from '../MPConstants.js';

class MPControlPanel extends Panel {

  /**
   * @param {Node[]} subPanels
   * @param {Object} [options]
   */
  constructor( subPanels, options ) {
    assert && AssertUtils.assertArrayOf( subPanels, Node );

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    // horizontal separator width is the max width of the subPanels
    const separatorWidth = _.maxBy( subPanels, node => node.width ).width;

    // put a horizontal separator between each sub-panel
    const children = [ subPanels[ 0 ] ];
    let separatorCount = 0;
    for ( let i = 1; i < subPanels.length; i++ ) {
      separatorCount++;
      children.push( new HSeparator( separatorWidth, {
        tandem: options.tandem.createTandem( `separator${separatorCount}` )
      } ) );
      children.push( subPanels[ i ] );
    }

    const content = new VBox( {
      children: children,
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    } );

    super( content, {
      fill: MPColors.CONTROL_PANEL_BACKGROUND,
      xMargin: 20,
      yMargin: 15
    } );
  }
}

moleculePolarity.register( 'MPControlPanel', MPControlPanel );

export default MPControlPanel;