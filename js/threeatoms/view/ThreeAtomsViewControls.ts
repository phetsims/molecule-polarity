// Copyright 2017-2026, University of Colorado Boulder

/**
 * 'View' controls for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import ThreeAtomsViewProperties from './ThreeAtomsViewProperties.js';
import { createBondDipolesCheckboxItem, createMolecularDipoleCheckboxItem, createPartialChargesCheckboxItem } from '../../common/view/ViewControlsCheckboxGroup.js';
import ViewControls, { ViewControlsOptions } from '../../common/view/ViewControls.js';

export default class ThreeAtomsViewControls extends ViewControls {

  public constructor( viewProperties: ThreeAtomsViewProperties, options: ViewControlsOptions ) {
    super( MoleculePolarityStrings.viewStringProperty, [
      createBondDipolesCheckboxItem( viewProperties.bondDipolesVisibleProperty ),
      createMolecularDipoleCheckboxItem( viewProperties.molecularDipoleVisibleProperty ),
      createPartialChargesCheckboxItem( viewProperties.partialChargesVisibleProperty )
    ], options );
  }
}

moleculePolarity.register( 'ThreeAtomsViewControls', ThreeAtomsViewControls );