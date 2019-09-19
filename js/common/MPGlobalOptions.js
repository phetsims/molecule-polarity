// Copyright 2015-2018, University of Colorado Boulder

/**
 * Global options for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPQueryParameters = require( 'MOLECULE_POLARITY/common/MPQueryParameters' );
  const StringProperty = require( 'AXON/StringProperty' );

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
