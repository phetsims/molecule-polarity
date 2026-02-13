// Copyright 2017-2025, University of Colorado Boulder

/**
 * 'View' controls for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import ThreeAtomsViewProperties from './ThreeAtomsViewProperties.js';
import ViewControlsCheckboxGroup, { createBondDipolesCheckboxItem, createMolecularDipoleCheckboxItem, createPartialChargesCheckboxItem } from '../../common/view/ViewControlsCheckboxGroup.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;

type ThreeAtomsViewControlsOptions = SelfOptions & PickRequired<StrictOmit<VBoxOptions, 'children'>, 'tandem'>;

export default class ThreeAtomsViewControls extends VBox {

  public constructor( viewProperties: ThreeAtomsViewProperties, providedOptions: ThreeAtomsViewControlsOptions ) {
    super( optionize<ThreeAtomsViewControlsOptions, SelfOptions, VBoxOptions>()( {
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      isDisposable: false,
      children: [
        new Text( MoleculePolarityStrings.viewStringProperty, MPConstants.CONTROL_PANEL_TITLE_OPTIONS ),
        new ViewControlsCheckboxGroup( [
          createBondDipolesCheckboxItem( viewProperties.bondDipolesVisibleProperty ),
          createMolecularDipoleCheckboxItem( viewProperties.molecularDipoleVisibleProperty ),
          createPartialChargesCheckboxItem( viewProperties.partialChargesVisibleProperty )
        ], {
          tandem: providedOptions.tandem.createTandem( 'checkboxGroup' )
        } )
      ]
    }, providedOptions ) );
  }
}

moleculePolarity.register( 'ThreeAtomsViewControls', ThreeAtomsViewControls );