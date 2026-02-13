// Copyright 2017-2025, University of Colorado Boulder

/**
 * TwoAtomsViewControls is the subpanel labeled 'View' in the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import TwoAtomsViewProperties from './TwoAtomsViewProperties.js';
import { createBondCharacterCheckboxItem, createBondDipoleCheckboxItem, createPartialChargesCheckboxItem } from '../../common/view/ViewControlsCheckboxGroup.js';
import ViewControls, { ViewControlsOptions } from '../../common/view/ViewControls.js';

export default class TwoAtomsViewControls extends ViewControls {
  public constructor( viewProperties: TwoAtomsViewProperties, options: ViewControlsOptions ) {
    super( MoleculePolarityStrings.viewStringProperty, [
      createBondDipoleCheckboxItem( viewProperties.bondDipoleVisibleProperty ),
      createPartialChargesCheckboxItem( viewProperties.partialChargesVisibleProperty ),
      createBondCharacterCheckboxItem( viewProperties.bondCharacterVisibleProperty )
    ], options );
  }
}

moleculePolarity.register( 'TwoAtomsViewControls', TwoAtomsViewControls );