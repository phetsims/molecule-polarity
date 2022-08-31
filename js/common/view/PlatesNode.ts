// Copyright 2014-2022, University of Colorado Boulder

/**
 * PlatesNode displays the 2 plates (negative and positive) for the E-field creation device.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import PlateNode, { PlateNodeOptions } from './PlateNode.js';

type SelfOptions = {
  spacing?: number; // horizontal spacing between the 2 plates
  plateOptions?: PlateNodeOptions;
};

export type PlatesNodeOptions = SelfOptions;

export default class PlatesNode extends Node {

  public readonly plateHeight: number; // height of the plates, for layout

  public constructor( eFieldEnabledProperty: Property<boolean>, providedOptions: PlatesNodeOptions ) {

    const options = optionize<PlatesNodeOptions, SelfOptions, NodeOptions>()( {
      spacing: 500,
      plateOptions: {
        plateWidth: 50,
        plateHeight: 430,
        plateThickness: 5,
        platePerspectiveYOffset: 35
      }
    }, providedOptions );

    assert && assert( !options.visibleProperty, 'PlateNode sets visibleProperty' );
    options.visibleProperty = eFieldEnabledProperty;

    const negativePlateNode = new PlateNode( eFieldEnabledProperty, merge( {
      polarity: 'negative',
      perspective: 'left'
    }, options.plateOptions ) );

    const positivePlateNode = new PlateNode( eFieldEnabledProperty, merge( {
      polarity: 'positive',
      perspective: 'right',
      left: negativePlateNode.right + options.spacing,
      bottom: negativePlateNode.bottom
    }, options.plateOptions ) );

    options.children = [ negativePlateNode, positivePlateNode ];

    super( options );

    assert && assert( options.plateOptions?.plateHeight );
    this.plateHeight = options.plateOptions.plateHeight!;
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'PlatesNode', PlatesNode );