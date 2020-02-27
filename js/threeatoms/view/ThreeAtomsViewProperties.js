// Copyright 2016-2019, University of Colorado Boulder

/**
 * View-specific Properties for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import moleculePolarity from '../../moleculePolarity.js';

class ThreeAtomsViewProperties {

  constructor() {

    // @public
    this.bondDipolesVisibleProperty = new BooleanProperty( false );
    this.molecularDipoleVisibleProperty = new BooleanProperty( true );
    this.partialChargesVisibleProperty = new BooleanProperty( false );
  }

  // @public
  reset() {
    this.bondDipolesVisibleProperty.reset();
    this.molecularDipoleVisibleProperty.reset();
    this.partialChargesVisibleProperty.reset();
  }
}

moleculePolarity.register( 'ThreeAtomsViewProperties', ThreeAtomsViewProperties );
export default ThreeAtomsViewProperties;