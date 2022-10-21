// Copyright 2017-2022, University of Colorado Boulder

/**
 * Control panel used throughout Molecule Polarity.
 * Responsible for inserting horizontal spacers between a set of sub-panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, VBox, HSeparator } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPColors from '../MPColors.js';
import MPConstants from '../MPConstants.js';

type SelfOptions = EmptySelfOptions;

export type MPControlPanelOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class MPControlPanel extends Panel {

  public constructor( subPanels: Node[], providedOptions: MPControlPanelOptions ) {

    const options = optionize<MPControlPanelOptions, SelfOptions, PanelOptions>()( {

      // PanelOptions
      fill: MPColors.CONTROL_PANEL_BACKGROUND,
      xMargin: 20,
      yMargin: 15
    }, providedOptions );

    // put a horizontal separator between each sub-panel
    const children = [ subPanels[ 0 ] ];
    for ( let i = 1; i < subPanels.length; i++ ) {
      children.push( new HSeparator( { stroke: 'black' } ) );
      children.push( subPanels[ i ] );
    }

    const content = new VBox( {
      children: children,
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    } );

    super( content, options );
  }
}

moleculePolarity.register( 'MPControlPanel', MPControlPanel );