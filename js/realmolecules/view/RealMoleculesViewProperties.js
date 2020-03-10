// Copyright 2016-2020, University of Colorado Boulder

/**
 * View-specific Properties for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import SurfaceType from '../../common/model/SurfaceType.js';
import moleculePolarity from '../../moleculePolarity.js';

class RealMoleculesViewProperties {

  constructor() {

    // @public
    this.bondDipolesVisibleProperty = new BooleanProperty( false );
    this.molecularDipoleVisibleProperty = new BooleanProperty( false );
    this.partialChargesVisibleProperty = new BooleanProperty( false );
    this.atomElectronegativitiesVisibleProperty = new BooleanProperty( false );
    this.atomLabelsVisibleProperty = new BooleanProperty( false );
    this.surfaceTypeProperty = new EnumerationProperty( SurfaceType, SurfaceType.NONE );
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