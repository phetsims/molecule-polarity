// Copyright 2016-2024, University of Colorado Boulder

/**
 * View-specific Properties for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Disposable from '../../../../axon/js/Disposable.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import { SurfaceType, SurfaceTypeValues } from '../../common/model/SurfaceType.js';
import moleculePolarity from '../../moleculePolarity.js';

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
      tandem: options.tandem.createTandem( 'bondDipolesVisibleProperty' ),
      phetioFeatured: true
    } );

    this.molecularDipoleVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'molecularDipoleVisibleProperty' ),
      phetioFeatured: true
    } );

    this.partialChargesVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'partialChargesVisibleProperty' ),
      phetioFeatured: true
    } );

    this.atomElectronegativitiesVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'atomElectronegativitiesVisibleProperty' ),
      phetioFeatured: true
    } );

    this.atomLabelsVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'atomLabelsVisibleProperty' ),
      phetioFeatured: true
    } );

    this.surfaceTypeProperty = new StringUnionProperty( 'none', {
      validValues: SurfaceTypeValues,
      tandem: options.tandem.createTandem( 'surfaceTypeProperty' ),
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
    this.atomElectronegativitiesVisibleProperty.reset();
    this.atomLabelsVisibleProperty.reset();
    this.surfaceTypeProperty.reset();
  }
}

moleculePolarity.register( 'RealMoleculesViewProperties', RealMoleculesViewProperties );