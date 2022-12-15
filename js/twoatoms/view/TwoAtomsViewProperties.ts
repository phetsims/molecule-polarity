// Copyright 2016-2022, University of Colorado Boulder

/**
 * View-specific Properties for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import { SurfaceType, SurfaceTypeValues } from '../../common/model/SurfaceType.js';
import moleculePolarity from '../../moleculePolarity.js';

type SelfOptions = EmptySelfOptions;

type TwoAtomsViewPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class TwoAtomsViewProperties {

  public readonly bondDipoleVisibleProperty: Property<boolean>;
  public readonly partialChargesVisibleProperty: Property<boolean>;
  public readonly bondCharacterVisibleProperty: Property<boolean>;
  public readonly surfaceTypeProperty: StringUnionProperty<SurfaceType>;

  public constructor( providedOptions: TwoAtomsViewPropertiesOptions ) {

    const options = providedOptions;

    this.bondDipoleVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'bondDipoleVisibleProperty' )
    } );

    this.partialChargesVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'partialChargesVisibleProperty' )
    } );

    this.bondCharacterVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'bondCharacterVisibleProperty' )
    } );

    this.surfaceTypeProperty = new StringUnionProperty<SurfaceType>( 'none', {
      validValues: SurfaceTypeValues,
      tandem: options.tandem.createTandem( 'surfaceTypeProperty' )
    } );
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }

  public reset(): void {
    this.bondDipoleVisibleProperty.reset();
    this.partialChargesVisibleProperty.reset();
    this.bondCharacterVisibleProperty.reset();
    this.surfaceTypeProperty.reset();
  }
}

moleculePolarity.register( 'TwoAtomsViewProperties', TwoAtomsViewProperties );