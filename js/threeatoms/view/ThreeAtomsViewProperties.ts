// Copyright 2016-2021, University of Colorado Boulder

// @ts-nocheck
/**
 * View-specific Properties for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';

class ThreeAtomsViewProperties {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    // @public
    this.bondDipolesVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'bondDipolesVisibleProperty' )
    } );
    this.molecularDipoleVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'molecularDipoleVisibleProperty' )
    } );
    this.partialChargesVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'partialChargesVisibleProperty' )
    } );
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