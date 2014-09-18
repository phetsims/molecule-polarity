// Copyright 2002-2014, University of Colorado Boulder

/**
 * View properties for the JSmol object
 *
 * @author Chris Malley (PixelZoon, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );

  function JSmolProperties() {
    PropertySet.call( this, {
      bondDipolesVisible: false,
      molecularDipoleVisible: false,
      partialChargesVisible: false,
      atomElectronegativitiesVisible: false,
      atomLabelsVisible: true,
      surfaceType: SurfaceType.NONE
    } );
  }

  return inherit( PropertySet, JSmolProperties );
} );
