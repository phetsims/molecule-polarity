// Copyright 2016-2024, University of Colorado Boulder

/**
 * View-specific Properties for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Disposable from '../../../../axon/js/Disposable.js';
import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import moleculePolarity from '../../moleculePolarity.js';

type SelfOptions = EmptySelfOptions;

type ThreeAtomsViewPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class ThreeAtomsViewProperties {

  public readonly bondDipolesVisibleProperty: Property<boolean>;
  public readonly molecularDipoleVisibleProperty: Property<boolean>;
  public readonly partialChargesVisibleProperty: Property<boolean>;

  public constructor( providedOptions: ThreeAtomsViewPropertiesOptions ) {

    const options = providedOptions;

    this.bondDipolesVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'bondDipolesVisibleProperty' ),
      phetioFeatured: true
    } );

    this.molecularDipoleVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'molecularDipoleVisibleProperty' ),
      phetioFeatured: true
    } );

    this.partialChargesVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'partialChargesVisibleProperty' ),
      phetioFeatured: true
    } );
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }

  public reset(): void {
    this.bondDipolesVisibleProperty.reset();
    this.molecularDipoleVisibleProperty.reset();
    this.partialChargesVisibleProperty.reset();
  }
}

moleculePolarity.register( 'ThreeAtomsViewProperties', ThreeAtomsViewProperties );