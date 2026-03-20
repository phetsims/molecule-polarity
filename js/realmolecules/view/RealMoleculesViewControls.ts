// Copyright 2017-2026, University of Colorado Boulder

/**
 * RealMoleculesViewControls is the subpanel labeled 'View' in the 'Real Molecules' screen.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import { createAtomElectronegativitiesCheckboxItem, createAtomLabelsCheckboxItem, createBondDipolesCheckboxItem, createMolecularDipoleCheckboxItem, createPartialChargesCheckboxItem } from '../../common/view/ViewControlsCheckboxGroup.js';
import ViewControls, { ViewControlsOptions } from '../../common/view/ViewControls.js';
import GatedVisibleProperty from '../../../../axon/js/GatedVisibleProperty.js';

export default class RealMoleculesViewControls extends ViewControls {

  public constructor(
    isAdvancedProperty: PhetioProperty<boolean>,
    viewProperties: RealMoleculesViewProperties,
    options: ViewControlsOptions
  ) {
    const partialChargesVisibleProperty = new GatedVisibleProperty( isAdvancedProperty, options.tandem.createTandem( 'checkboxGroup' ).createTandem( 'partialChargesCheckbox' ) );

    super( MoleculePolarityStrings.viewStringProperty, [
          createBondDipolesCheckboxItem( viewProperties.bondDipolesVisibleProperty ),
          createMolecularDipoleCheckboxItem( viewProperties.molecularDipoleVisibleProperty ),
          createPartialChargesCheckboxItem( viewProperties.partialChargesVisibleProperty, partialChargesVisibleProperty ),
          createAtomElectronegativitiesCheckboxItem( viewProperties.atomElectronegativitiesVisibleProperty ),
          createAtomLabelsCheckboxItem( viewProperties.atomLabelsVisibleProperty )
        ], optionize<ViewControlsOptions, EmptySelfOptions, VBoxOptions>()( {
    }, options ) );
  }
}
