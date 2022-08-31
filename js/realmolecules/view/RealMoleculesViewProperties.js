// Copyright 2016-2022, University of Colorado Boulder

/**
 * View-specific Properties for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StringEnumerationProperty from '../../../../axon/js/StringEnumerationProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { SurfaceTypeValues } from '../../common/model/SurfaceType.js';
import moleculePolarity from '../../moleculePolarity.js';

class RealMoleculesViewProperties {

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
    this.surfaceTypeProperty = new StringEnumerationProperty( 'none', {
      validValues: SurfaceTypeValues,
      tandem: options.tandem.createTandem( 'surfaceTypeProperty' )
    } );
  }

  // @public
  reset() {
    this.bondDipolesVisibleProperty.reset();
    this.molecularDipoleVisibleProperty.reset();
    this.partialChargesVisibleProperty.reset();
    this.atomElectronegativitiesVisibleProperty.reset();
    this.atomLabelsVisibleProperty.reset();
    this.surfaceTypeProperty.reset();
  }
}

moleculePolarity.register( 'RealMoleculesViewProperties', RealMoleculesViewProperties );
export default RealMoleculesViewProperties;