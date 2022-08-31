// Copyright 2016-2021, University of Colorado Boulder

/**
 * View-specific Properties for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import moleculePolarity from '../../moleculePolarity.js';

type SelfOptions = EmptySelfOptions;

export type ThreeAtomsViewPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class ThreeAtomsViewProperties {

  public readonly bondDipolesVisibleProperty: Property<boolean>;
  public readonly molecularDipoleVisibleProperty: Property<boolean>;
  public readonly partialChargesVisibleProperty: Property<boolean>;

  public constructor( providedOptions: ThreeAtomsViewPropertiesOptions ) {

    const options = providedOptions;

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

  public reset(): void {
    this.bondDipolesVisibleProperty.reset();
    this.molecularDipoleVisibleProperty.reset();
    this.partialChargesVisibleProperty.reset();
  }
}

moleculePolarity.register( 'ThreeAtomsViewProperties', ThreeAtomsViewProperties );