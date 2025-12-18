// Copyright 2021-2025, University of Colorado Boulder

/**
 * ElectronegativitySlider is the slider for adjusting electronegativity of an atom.
 * Dragging the slider continuously updates an atom's electronegativity.
 * When the slider's thumb is released, it snaps to the closest tick mark.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import optionize from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import HSlider, { HSliderOptions } from '../../../../sun/js/HSlider.js';
import Slider from '../../../../sun/js/Slider.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import Atom from '../model/Atom.js';
import Molecule from '../model/Molecule.js';
import MPConstants from '../MPConstants.js';
import DescriptionMaps from './DescriptionMaps.js';
import PointySliderThumb from './PointySliderThumb.js';

type EPProgress = 'morePositive' | 'lessPositive' | 'neutral' | 'lessNegative' | 'moreNegative';

type SelfOptions = {
  tickSpacing?: number; // space between tick marks
};

type ElectronegativitySliderOptions = SelfOptions & WithRequired<HSliderOptions, 'tandem'>;

export default class ElectronegativitySlider extends HSlider {

  public constructor( molecule: Molecule, atom: Atom, providedOptions: ElectronegativitySliderOptions ) {

    let previousEN = atom.electronegativityProperty.value;

    const options = optionize<ElectronegativitySliderOptions, SelfOptions, HSliderOptions>()( {

      // SelfOptions
      tickSpacing: MPConstants.ELECTRONEGATIVITY_TICK_SPACING,

      // HSliderOptions
      thumbYOffset: 10,
      trackSize: new Dimension2( 150, 5 ),
      majorTickLength: 20,
      minorTickLength: 10,
      constrainValue: value => roundToInterval( value, 0.2 ), // rounds to nearest 0.2
      shiftKeyboardStep: 0.2,
      keyboardStep: 0.4,
      visiblePropertyOptions: {
        phetioFeatured: false
      },
      isDisposable: false,
      accessibleName: MoleculePolarityFluent.a11y.common.electronegativitySlider.accessibleName.createProperty( {
        atomName: atom.labelStringProperty
      } ),
      accessibleHelpText: MoleculePolarityFluent.a11y.common.electronegativitySlider.accessibleHelpText.createProperty( {
        atomName: atom.labelStringProperty
      } ),

      createAriaValueText: value => {
        return DescriptionMaps.formatElectronegativityString( value );
      }
    }, providedOptions );

    // custom thumb
    const thumbNode = new PointySliderThumb( {
      size: new Dimension2( 30, 35 ),
      tandem: options.tandem.createTandem( Slider.THUMB_NODE_TANDEM_NAME )
    } );
    thumbNode.touchArea = thumbNode.localBounds.dilatedXY( 10, 10 );

    options.thumbNode = thumbNode;

    options.startDrag = () => {
      molecule.isDraggingProperty.value = true;
      previousEN = atom.electronegativityProperty.value;
    };

    // snaps to the closest tick mark
    options.endDrag = () => {
      molecule.isDraggingProperty.value = false;
      atom.electronegativityProperty.value = roundToInterval( atom.electronegativityProperty.value, options.tickSpacing );
      this.emitContextResponse( molecule, atom, previousEN );
    };

    const range = atom.electronegativityProperty.range;

    super( atom.electronegativityProperty, range, options );

    // tick labels
    const tickLabelOptions = {
      font: new PhetFont( 16 ),
      maxWidth: 40
    };
    this.addMajorTick( range.min, new Text( MoleculePolarityStrings.lessStringProperty, tickLabelOptions ) );
    this.addMajorTick( range.max, new Text( MoleculePolarityStrings.moreStringProperty, tickLabelOptions ) );
    const centerTick = range.min + ( range.getLength() / 2 );
    this.addMajorTick( centerTick );
    for ( let i = range.min + options.tickSpacing; i < range.max; i += options.tickSpacing ) {
      if ( roundToInterval( i, 0.1 ) !== centerTick ) {
        this.addMinorTick( i );
      }
    }
  }

  private emitContextResponse( molecule: Molecule, atom: Atom, previousEN: number ): void {

    // clear the queue of utterances
    this.forEachUtteranceQueue( utteranceQueue => utteranceQueue.clear() );

    // Mini-utility function for emitting context resposnes without repeating the verbosity
    const contextResponse = ( message: string ) => {
      this.addAccessibleContextResponse( message, { alertBehavior: 'queue' } );
    };

    const bondDeltaEN = molecule.deltaENProperty.value;

    // This is how much is changing because of the slider, not to be confused with deltaEN
    const currentEN = atom.electronegativityProperty.value;
    const changeInEN = currentEN - previousEN;


    contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.dipoleContext.format( {
        progress: MoleculePolarityFluent.a11y.dipoleProgress.format( {
          progress: changeInEN === 0 ? 'zero' : changeInEN > 0 ? 'smaller' : 'larger'
        } )
      } )
    );
    contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.dipoleDirectionChange.format( {
        atom: bondDeltaEN > 0 ? 'B' : 'A'
      } )
    );
    contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.partialChargeContext.format( {
        progress: MoleculePolarityFluent.a11y.partialChargeProgress.format( {
          progress: changeInEN === 0 ? 'zero' : changeInEN > 0 ? 'moreNegative' : 'morePositive'
        } )
      } )
    );
    contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.partialChargeSignChange.format( {
        sign: MoleculePolarityFluent.a11y.partialChargeSign.format( {
          sign: bondDeltaEN > 0 ? 'positive' : 'negative'
        } )
      } )
    );
    contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.bondCharacterContext.format( {
        progress: MoleculePolarityFluent.a11y.bondCharacterProgress.format( {
          progress: changeInEN > 0 ? 'moreIonic' : 'moreCovalent'
        } )
      } )
    );
    contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.electrostaticContext.format( {
        progress: MoleculePolarityFluent.a11y.electrostaticPotentialProgress.format( {
          progress: this.changeInENtoElectrostaticPotentialProgress( changeInEN )
        } )
      } )
    );
    contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.electronDensityContext.format( {
        progress: MoleculePolarityFluent.a11y.electronDensityProgress.format( {
          progress: changeInEN > 0 ? 'more' : 'less'
        } )
      } )
    );
    contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.electricFieldContextStringProperty.value
    );

  }

  private changeInENtoElectrostaticPotentialProgress( changeInEN: number ): EPProgress {
    return changeInEN > 0.5 ? 'morePositive' :
           changeInEN > 0.25 ? 'lessPositive' :
           changeInEN > -0.25 ? 'neutral' :
           changeInEN > -0.5 ? 'lessNegative' : 'moreNegative';
  }
}

moleculePolarity.register( 'ElectronegativitySlider', ElectronegativitySlider );