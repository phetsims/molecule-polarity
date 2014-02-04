// Copyright 2002-2014, University of Colorado Boulder

/**
 * Properties that control things in the view.
 * Since this sim has a small number of controls, this is a union of all such properties in all modules.
 * Properties that are irrelevant for a module are simply ignored by that module.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );

  function MPViewProperties( options ) {

    // defaults
    options = _.extend( {
      surfaceType: SurfaceType.NONE,
      bondDipolesVisible: false,
      molecularDipoleVisible: false,
      partialChargesVisible: false,
      bondCharacterVisible: false,
      atomLabelsVisible: false,
      electronegativityTableVisible: false
    }, options );

    PropertySet.call( this, {
      surfaceType: options.surfaceType,
      bondDipolesVisible: options.bondDipolesVisible,
      molecularDipoleVisible: options.molecularDipoleVisible,
      partialChargesVisible: options.partialChargesVisible,
      bondCharacterVisible: options.bondCharacterVisible,
      atomLabelsVisible: options.atomLabelsVisible,
      electronegativityTableVisible: options.electronegativityTableVisible
    } );
  }

  return inherit( PropertySet, MPViewProperties );
} );
