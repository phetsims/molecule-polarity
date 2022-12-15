// Copyright 2016-2022, University of Colorado Boulder

/**
 * View-specific Properties for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { SurfaceType, SurfaceTypeValues } from '../../common/model/SurfaceType.js';
import moleculePolarity from '../../moleculePolarity.js';
import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';

type SelfOptions = EmptySelfOptions;

type RealMoleculesViewPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class RealMoleculesViewProperties {

  public readonly bondDipolesVisibleProperty: Property<boolean>;
  public readonly molecularDipoleVisibleProperty: Property<boolean>;
  public readonly partialChargesVisibleProperty: Property<boolean>;
  public readonly atomElectronegativitiesVisibleProperty: Property<boolean>;
  public readonly atomLabelsVisibleProperty: Property<boolean>;
  public readonly surfaceTypeProperty: StringUnionProperty<SurfaceType>;

  public constructor( providedOptions: RealMoleculesViewPropertiesOptions ) {

    const options = providedOptions;

    this.bondDipolesVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'bondDipolesVisibleProperty' )
    } );

    this.molecularDipoleVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'molecularDipoleVisibleProperty' )
    } );

    this.partialChargesVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'partialChargesVisibleProperty' )
    } );

    this.atomElectronegativitiesVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'atomElectronegativitiesVisibleProperty' )
    } );

    this.atomLabelsVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'atomLabelsVisibleProperty' )
    } );

    this.surfaceTypeProperty = new StringUnionProperty( 'none', {
      validValues: SurfaceTypeValues,
      tandem: options.tandem.createTandem( 'surfaceTypeProperty' )
    } );
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }

  public reset(): void {
    this.bondDipolesVisibleProperty.reset();
    this.molecularDipoleVisibleProperty.reset();
    this.partialChargesVisibleProperty.reset();
    this.atomElectronegativitiesVisibleProperty.reset();
    this.atomLabelsVisibleProperty.reset();
    this.surfaceTypeProperty.reset();
  }
}

moleculePolarity.register( 'RealMoleculesViewProperties', RealMoleculesViewProperties );