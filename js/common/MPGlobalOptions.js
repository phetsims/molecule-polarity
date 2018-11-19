// Copyright 2015-2018, University of Colorado Boulder

/**
 * Global options for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPQueryParameters = require( 'MOLECULE_POLARITY/common/MPQueryParameters' );
  var StringProperty = require( 'AXON/StringProperty' );

  /**
   * @constructor
   */
  function MPGlobalOptions() {

    // @public
    this.dipoleDirectionProperty = new StringProperty( MPQueryParameters.dipoleDirection );
    this.surfaceColorProperty = new StringProperty( MPQueryParameters.surfaceColor );
  }

  moleculePolarity.register( 'MPGlobalOptions', MPGlobalOptions );

  return inherit( Object, MPGlobalOptions, {

    // @public
    reset: function() {
      this.dipoleDirectionProperty.reset();
      this.surfaceColorProperty.reset();
    }
  } );
} );
