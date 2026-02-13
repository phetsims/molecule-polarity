// Copyright 2017-2026, University of Colorado Boulder

/**
 * RealMoleculesViewControls is the subpanel labeled 'View' in the 'Real Molecules' screen.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import { createAtomElectronegativitiesCheckboxItem, createAtomLabelsCheckboxItem, createBondDipolesCheckboxItem, createMolecularDipoleCheckboxItem, createPartialChargesCheckboxItem } from '../../common/view/ViewControlsCheckboxGroup.js';
import ViewControls, { ViewControlsOptions } from '../../common/view/ViewControls.js';

export default class RealMoleculesViewControls extends ViewControls {

  public constructor(
    isAdvancedProperty: PhetioProperty<boolean>,
    viewProperties: RealMoleculesViewProperties,
    options: ViewControlsOptions
  ) {
    super( MoleculePolarityStrings.viewStringProperty, [
          createBondDipolesCheckboxItem( viewProperties.bondDipolesVisibleProperty ),
          createMolecularDipoleCheckboxItem( viewProperties.molecularDipoleVisibleProperty ),
          createPartialChargesCheckboxItem( viewProperties.partialChargesVisibleProperty, isAdvancedProperty ),
          createAtomElectronegativitiesCheckboxItem( viewProperties.atomElectronegativitiesVisibleProperty ),
          createAtomLabelsCheckboxItem( viewProperties.atomLabelsVisibleProperty )
        ], optionize<ViewControlsOptions, EmptySelfOptions, VBoxOptions>()( {
    }, options ) );
  }
}

moleculePolarity.register( 'RealMoleculesViewControls', RealMoleculesViewControls );