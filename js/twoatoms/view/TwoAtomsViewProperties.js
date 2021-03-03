// Copyright 2016-2021, University of Colorado Boulder

/**
 * View-specific Properties for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import SurfaceType from '../../common/model/SurfaceType.js';
import moleculePolarity from '../../moleculePolarity.js';

class TwoAtomsViewProperties {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      tandem: Tandem.REQUIRED
    }, options );

    // @public
    this.bondDipoleVisibleProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'bondDipoleVisibleProperty' )
    } );
    this.partialChargesVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'partialChargesVisibleProperty' )
    } );
    this.bondCharacterVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'bondCharacterVisibleProperty' )
    } );
    this.surfaceTypeProperty = new EnumerationProperty( SurfaceType, SurfaceType.NONE, {
      tandem: options.tandem.createTandem( 'surfaceTypeProperty' )
    } );
  }

  // @public
  reset() {
    this.bondDipoleVisibleProperty.reset();
    this.partialChargesVisibleProperty.reset();
    this.bondCharacterVisibleProperty.reset();
    this.surfaceTypeProperty.reset();
  }
}

moleculePolarity.register( 'TwoAtomsViewProperties', TwoAtomsViewProperties );
export default TwoAtomsViewProperties;