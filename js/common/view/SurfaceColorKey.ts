// Copyright 2014-2022, University of Colorado Boulder

/**
 * Key for a surface's color scheme. This legend is a rectangular box with a gradient fill that matches the surface
 * in the Molecule. Each label is a unit for a color.
 * Uses static factory methods to supply the needed instances for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Font, LinearGradient, Node, NodeOptions, Rectangle, TColor, Text } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import moleculePolarityStrings from '../../moleculePolarityStrings.js';
import MPColors from '../MPColors.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize from '../../../../phet-core/js/optionize.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = {
  size?: Dimension2;
  titleVisible?: boolean;
  titleFont?: Font;
  rangeFont?: Font;
  xMargin?: number;
  ySpacing?: number;
};

export type SurfaceColorKeyOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class SurfaceColorKey extends Node {

  public constructor( colors: TColor[],
                      titleStringProperty: TReadOnlyProperty<string>,
                      leftLabelStringProperty: TReadOnlyProperty<string>,
                      rightLabelStringProperty: TReadOnlyProperty<string>,
                      providedOptions: SurfaceColorKeyOptions ) {

    const options = optionize<SurfaceColorKeyOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      size: new Dimension2( 420, 20 ),
      titleVisible: true,
      titleFont: new PhetFont( { size: 16, weight: 'bold' } ),
      rangeFont: new PhetFont( 16 ),
      xMargin: 0,
      ySpacing: 2,

      // NodeOptions
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    super();

    // gradient rectangle
    const gradient = new LinearGradient( 0, 0, options.size.width, options.size.height );

    for ( let i = 0; i < colors.length; i++ ) {

      // colors are ordered negative to positive, so apply in reverse order
      const color = colors[ colors.length - i - 1 ];
      gradient.addColorStop( i / ( colors.length - 1 ), color );
    }
    const spectrumNode = new Rectangle( 0, 0, options.size.width, options.size.height, {
      fill: gradient,
      stroke: 'black'
    } );

    // title
    const titleText = new Text( titleStringProperty, {
      fill: 'black',
      font: options.titleFont,
      maxWidth: 0.5 * options.size.width, // i18n, determined empirically
      tandem: options.tandem.createTandem( 'titleText' ),
      phetioVisiblePropertyInstrumented: false
    } );

    // range labels
    const labelOptions = {
      fill: 'black',
      font: options.rangeFont,
      maxWidth: 0.2 * options.size.width, // i18n, determined empirically
      phetioVisiblePropertyInstrumented: false
    };
    const leftLabelText = new Text( leftLabelStringProperty, merge( {
      tandem: options.tandem.createTandem( 'leftLabelText' )
    }, labelOptions ) );
    const rightLabelText = new Text( rightLabelStringProperty, merge( {
      tandem: options.tandem.createTandem( 'rightLabelText' )
    }, labelOptions ) );

    // rendering order
    this.addChild( spectrumNode );
    this.addChild( leftLabelText );
    this.addChild( rightLabelText );
    if ( options.titleVisible ) {
      this.addChild( titleText );
    }

    // layout
    titleText.centerX = spectrumNode.centerX;
    leftLabelText.left = spectrumNode.left + options.xMargin;
    rightLabelText.right = spectrumNode.right - options.xMargin;
    titleText.top = leftLabelText.top = rightLabelText.top = spectrumNode.bottom + options.ySpacing;

    this.mutate( options );
  }

  /**
   * Creates the color key for black-&-white gradient.
   */
  public static createElectronDensityColorKey( options: SurfaceColorKeyOptions ): SurfaceColorKey {
    return new SurfaceColorKey( MPColors.BW_GRADIENT, moleculePolarityStrings.electronDensityStringProperty,
      moleculePolarityStrings.lessStringProperty, moleculePolarityStrings.moreStringProperty, options );
  }

  /**
   * Creates the color key for RWB (red-white-blue) gradient.
   */
  public static createElectrostaticPotentialRWBColorKey( options: SurfaceColorKeyOptions ): SurfaceColorKey {
    return new SurfaceColorKey( MPColors.RWB_GRADIENT, moleculePolarityStrings.electrostaticPotentialStringProperty,
      moleculePolarityStrings.positiveStringProperty, moleculePolarityStrings.negativeStringProperty, options );
  }

  /**
   * Creates the color key for ROYGB gradient.
   */
  public static createElectrostaticPotentialROYGBColorKey( options: SurfaceColorKeyOptions ): SurfaceColorKey {
    return new SurfaceColorKey( MPColors.ROYGB_GRADIENT, moleculePolarityStrings.electrostaticPotentialStringProperty,
      moleculePolarityStrings.positiveStringProperty, moleculePolarityStrings.negativeStringProperty, options );
  }
}

moleculePolarity.register( 'SurfaceColorKey', SurfaceColorKey );