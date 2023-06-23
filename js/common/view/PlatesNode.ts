// Copyright 2014-2023, University of Colorado Boulder

/**
 * PlatesNode displays the 2 plates (negative and positive) for the E-field creation device.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { HBox, HBoxOptions } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import PlateNode, { PlateNodeOptions } from './PlateNode.js';

type SelfOptions = {
  plateOptions?: PlateNodeOptions;
};

type PlatesNodeOptions = SelfOptions & PickOptional<HBoxOptions, 'spacing'>;

export default class PlatesNode extends HBox {

  public readonly plateHeight: number; // height of the plates, for layout

  public constructor( eFieldEnabledProperty: Property<boolean>, providedOptions?: PlatesNodeOptions ) {

    const options = optionize<PlatesNodeOptions, StrictOmit<SelfOptions, 'plateOptions'>, HBoxOptions>()( {

      // HBoxOptions
      spacing: 500
    }, providedOptions );

    options.visibleProperty = eFieldEnabledProperty;

    const negativePlateNode = new PlateNode( 'negative', combineOptions<PlateNodeOptions>( {}, options.plateOptions, {
      perspective: 'left'
    } ) );

    const positivePlateNode = new PlateNode( 'positive', combineOptions<PlateNodeOptions>( {}, options.plateOptions, {
      perspective: 'right'
    } ) );

    options.children = [ negativePlateNode, positivePlateNode ];

    super( options );

    this.plateHeight = negativePlateNode.plateHeight;
  }

  public override dispose(): void {
    Disposable.assertNotDisposable();
    super.dispose();
  }
}

moleculePolarity.register( 'PlatesNode', PlatesNode );