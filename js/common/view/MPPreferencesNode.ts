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

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPPreferences from '../model/MPPreferences.js';
import MPQueryParameters from '../MPQueryParameters.js';
import DipoleDirectionControl from './DipoleDirectionControl.js';
import SurfaceColorControl from './SurfaceColorControl.js';

type SelfOptions = EmptySelfOptions;

type MPPreferencesNodeOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class MPPreferencesNode extends VBox {

  private readonly disposeMPPreferencesNode: () => void;

  public constructor( providedOptions: MPPreferencesNodeOptions ) {

    const options = optionize<MPPreferencesNodeOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: 25
    }, providedOptions );

    const dipoleDirectionControl = new DipoleDirectionControl( MPPreferences.dipoleDirectionProperty, {
      tandem: options.tandem.createTandem( 'dipoleDirectionControl' )
    } );

    const surfaceColorControl = new SurfaceColorControl( MPPreferences.surfaceColorProperty, {
      tandem: options.tandem.createTandem( 'surfaceColorControl' )
    } );

    //TODO https://github.com/phetsims/molecule-polarity/issues/32
    // Hide the Surface Color option until the Real Molecules screen is implemented.
    // In the meantime, support testing via the realMolecules query parameter.
    surfaceColorControl.visible = MPQueryParameters.realMolecules;

    options.children = [
      dipoleDirectionControl,
      surfaceColorControl
    ];

    super( options );

    this.disposeMPPreferencesNode = () => {
      dipoleDirectionControl.dispose();
      surfaceColorControl.dispose();
    };
  }

  public override dispose(): void {
    this.disposeMPPreferencesNode();
    super.dispose();
  }
}

moleculePolarity.register( 'MPPreferencesNode', MPPreferencesNode );