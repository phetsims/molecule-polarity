// Copyright 2015-2022, University of Colorado Boulder

/**
 * MPPreferencesNode is the user interface for sim-specific preferences, accessed via the Preferences dialog.
 * These preferences are global, and affect all screens.
 *
 * The Preferences dialog is created on demand by joist, using a PhetioCapsule. So MPPreferencesNode must
 * implement dispose, and all elements of MPPreferencesNode that have tandems must be disposed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPPreferences from '../model/MPPreferences.js';
import MPQueryParameters from '../MPQueryParameters.js';
import DipoleDirectionControl from './DipoleDirectionControl.js';
import SurfaceColorControl from './SurfaceColorControl.js';

class MPPreferencesNode extends VBox {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      align: 'left',
      spacing: 25,
      tandem: Tandem.REQUIRED
    }, options );

    const dipoleDirectionControl = new DipoleDirectionControl( MPPreferences.dipoleDirectionProperty, {
      tandem: options.tandem.createTandem( 'dipoleDirectionControl' )
    } );

    const surfaceColorControl = new SurfaceColorControl( MPPreferences.surfaceColorProperty, {

      //TODO https://github.com/phetsims/molecule-polarity/issues/32 hide the Surface Color option until Real Molecules screen is implemented
      visible: MPQueryParameters.realMolecules,
      tandem: options.tandem.createTandem( 'surfaceColorControl' )
    } );

    assert && assert( !options.children, 'MPPreferencesNode sets children' );
    options.children = [
      dipoleDirectionControl,
      surfaceColorControl
    ];

    super( options );

    // @private
    this.disposeMPPreferencesNode = () => {
      dipoleDirectionControl.dispose();
      surfaceColorControl.dispose();
    };
  }

  /**
   * Helpful for future-proofing, since PhET-iO will tear down and re-create the PreferencesDialog when setting state.
   * @public
   * @override
   */
  dispose() {
    this.disposeMPPreferencesNode();
    super.dispose();
  }
}

moleculePolarity.register( 'MPPreferencesNode', MPPreferencesNode );
export default MPPreferencesNode;