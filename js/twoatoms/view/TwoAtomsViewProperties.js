// Copyright 2016-2020, University of Colorado Boulder

/**
 * View-specific Properties for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import SurfaceType from '../../common/view/SurfaceType.js';
import moleculePolarity from '../../moleculePolarity.js';

class TwoAtomsViewProperties {

  constructor() {

    // @public
    this.bondDipoleVisibleProperty = new BooleanProperty( true );
    this.partialChargesVisibleProperty = new BooleanProperty( false );
    this.bondCharacterVisibleProperty = new BooleanProperty( false );
    this.surfaceTypeProperty = new Property( SurfaceType.NONE );
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