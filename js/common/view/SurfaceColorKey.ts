// Copyright 2014-2026, University of Colorado Boulder

/**
 * Key for a surface's color scheme. This legend is a rectangular box with a gradient fill that matches the surface
 * in the Molecule. Each label is a unit for a color.
 * Uses static factory methods to supply the needed instances for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Font from '../../../../scenery/js/util/Font.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPColors from '../MPColors.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

type SelfOptions = {
  size?: Dimension2;
  titleVisible?: boolean;
  titleFont?: Font;
  rangeFont?: Font;
  xMargin?: number;
  ySpacing?: number;
};

type SurfaceColorKeyOptions = SelfOptions;

export default class SurfaceColorKey extends Node {

  public constructor( colors: TColor[],
                      titleStringProperty: TReadOnlyProperty<string>,
                      leftLabelStringProperty: TReadOnlyProperty<string>,
                      rightLabelStringProperty: TReadOnlyProperty<string>,
                      providedOptions?: SurfaceColorKeyOptions ) {

    const options = optionize<SurfaceColorKeyOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      size: new Dimension2( 420, 20 ),
      titleVisible: true,
      titleFont: new PhetFont( { size: 16, weight: 'bold' } ),
      rangeFont: new PhetFont( 16 ),
      xMargin: 0,
      ySpacing: 2,

      // NodeOptions
      visiblePropertyOptions: { phetioReadOnly: true }
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
      maxWidth: 0.5 * options.size.width // i18n, determined empirically
    } );

    // range labels
    const labelOptions = {
      fill: 'black',
      font: options.rangeFont,
      maxWidth: 0.2 * options.size.width // i18n, determined empirically
    };
    const leftLabelText = new Text( leftLabelStringProperty, labelOptions );
    const rightLabelText = new Text( rightLabelStringProperty, labelOptions );

    // rendering order
    this.addChild( spectrumNode );
    this.addChild( leftLabelText );
    this.addChild( rightLabelText );
    if ( options.titleVisible ) {
      this.addChild( titleText );
    }

    // layout
    const top = spectrumNode.bottom + options.ySpacing;
    titleText.boundsProperty.link( () => {
      titleText.centerX = spectrumNode.centerX;
      titleText.top = top;
    } );
    leftLabelText.boundsProperty.link( () => {
      leftLabelText.left = spectrumNode.left + options.xMargin;
      leftLabelText.top = top;
    } );
    rightLabelText.boundsProperty.link( () => {
      rightLabelText.right = spectrumNode.right - options.xMargin;
      rightLabelText.top = top;
    } );

    this.mutate( options );
  }

  /**
   * Creates the color key for black-&-white gradient.
   */
  public static createElectronDensityColorKey( options?: SurfaceColorKeyOptions ): SurfaceColorKey {
    return new SurfaceColorKey( [
      new DerivedProperty( [ MPColors.surfaceBWBlackProperty ], color => color.withAlpha( MPColors.SURFACE_ALPHA ) ),
      new DerivedProperty( [ MPColors.surfaceBWWhiteProperty ], color => color.withAlpha( MPColors.SURFACE_ALPHA ) )
      ], MoleculePolarityStrings.electronDensityStringProperty,
      MoleculePolarityStrings.lessStringProperty, MoleculePolarityStrings.moreStringProperty, options );
  }

  /**
   * Creates the color key for RWB (red-white-blue) gradient.
   */
  public static createElectrostaticPotentialRWBColorKey( options?: SurfaceColorKeyOptions ): SurfaceColorKey {
    return new SurfaceColorKey( [
      new DerivedProperty( [ MPColors.surfaceRWBRedProperty ], color => color.withAlpha( MPColors.SURFACE_ALPHA ) ),
      new DerivedProperty( [ MPColors.surfaceRWBWhiteProperty ], color => color.withAlpha( MPColors.SURFACE_ALPHA ) ),
      new DerivedProperty( [ MPColors.surfaceRWBBlueProperty ], color => color.withAlpha( MPColors.SURFACE_ALPHA ) )
      ], MoleculePolarityStrings.electrostaticPotentialStringProperty,
      MoleculePolarityStrings.positiveStringProperty, MoleculePolarityStrings.negativeStringProperty, options );
  }

  /**
   * Creates the color key for ROYGB gradient.
   */
  public static createElectrostaticPotentialROYGBColorKey( options?: SurfaceColorKeyOptions ): SurfaceColorKey {
    return new SurfaceColorKey( MPColors.ROYGB_GRADIENT, MoleculePolarityStrings.electrostaticPotentialStringProperty,
      MoleculePolarityStrings.positiveStringProperty, MoleculePolarityStrings.negativeStringProperty, options );
  }
}

moleculePolarity.register( 'SurfaceColorKey', SurfaceColorKey );