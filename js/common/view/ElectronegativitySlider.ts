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
import ThreeAtomsViewProperties from '../../threeatoms/view/ThreeAtomsViewProperties.js';
import TwoAtomsViewProperties from '../../twoatoms/view/TwoAtomsViewProperties.js';
import Atom from '../model/Atom.js';
import Molecule from '../model/Molecule.js';
import { SurfaceType } from '../model/SurfaceType.js';
import MPConstants from '../MPConstants.js';
import DescriptionMaps from './DescriptionMaps.js';
import PointySliderThumb from './PointySliderThumb.js';

type EPProgress = 'morePositive' | 'lessPositive' | 'neutral' | 'lessNegative' | 'moreNegative';

type SelfOptions = {
  tickSpacing?: number; // space between tick marks

  // In some cases an increase in deltaEN results in different context responses depending on which atom is being changed
  // i.e. An increase in deltaEN emits one response if this slider is for atom A, and a different one for atom B.
  invertMapping?: boolean;
};

type ElectronegativitySliderOptions = SelfOptions & WithRequired<HSliderOptions, 'tandem'>;

export default class ElectronegativitySlider extends HSlider {

  // Wether to invert some context responses based on which atom is being changed.
  private readonly invertMapping;

  private readonly viewProperties: ThreeAtomsViewProperties | TwoAtomsViewProperties;

  public constructor(
    atom: Atom,
    molecule: Molecule,
    viewProperties: ThreeAtomsViewProperties | TwoAtomsViewProperties,
    providedOptions: ElectronegativitySliderOptions ) {

    let previousEN = atom.electronegativityProperty.value;

    const options = optionize<ElectronegativitySliderOptions, SelfOptions, HSliderOptions>()( {

      // SelfOptions
      tickSpacing: MPConstants.ELECTRONEGATIVITY_TICK_SPACING,
      invertMapping: false,

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

    this.viewProperties = viewProperties;

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

    this.invertMapping = options.invertMapping;
  }

  /**
   * The change in electronegativity will trigger a multitude of context responses
   * depending on various factors that change the visible sim.
   * This function calculates all those changes.
   */
  private emitContextResponse( molecule: Molecule, atom: Atom, previousEN: number ): void {

    // clear the queue of utterances
    this.forEachUtteranceQueue( utteranceQueue => utteranceQueue.clear() );

    // Mini-utility function for emitting context responses without repeating the verbosity
    const contextResponse = ( message: string ) => {
      this.addAccessibleContextResponse( message, { alertBehavior: 'queue' } );
    };

    // This is how much the atom's EN is changing because of the slider, not to be confused with deltaEN
    const currentEN = atom.electronegativityProperty.value;
    const changeInEN = currentEN - previousEN;

    if ( Math.abs( changeInEN ) === 0 ) { return; } // no change, no context response

    // For some cases we need to invert the change in EN for context responses based on which atom is being changed
    const invertedChangeInEN = this.invertMapping ? -changeInEN : changeInEN;

    const dipoleMagnitude = molecule.dipoleMagnitudeProperty.value;
    const previousDipoleMagnitude = dipoleMagnitude - invertedChangeInEN;

    // Similarly, deltaEN > 0 might mean something different based on which atom is being changed.
    // i.e. high deltaEN means a high electron density for one atom but low for the other.
    const invertedDipoleMagnitude = this.invertMapping ? -dipoleMagnitude : dipoleMagnitude;
    const isDipoleMagnitudeGrowing = Math.abs( previousDipoleMagnitude ) < Math.abs( dipoleMagnitude );
    const didDipoleChangeDirection = dipoleMagnitude * previousDipoleMagnitude < 0;

    // Sim visibility properties that condidtion the context responses
    // In some cases we have to check for the Two Atom Molecule or the Three Atom One
    let bondDipolesVisible: boolean;
    if ( this.viewProperties instanceof TwoAtomsViewProperties ) {
      bondDipolesVisible = this.viewProperties.bondDipoleVisibleProperty.value;
    }
    else {
      bondDipolesVisible = this.viewProperties.bondDipolesVisibleProperty.value;
    }

    const partialChargesVisible = this.viewProperties.partialChargesVisibleProperty.value;

    let bondCharacterVisible = false;
    if ( this.viewProperties instanceof TwoAtomsViewProperties ) {
      bondCharacterVisible = this.viewProperties.bondCharacterVisibleProperty.value;
    }

    let surfaceType: SurfaceType = 'none';
    if ( this.viewProperties instanceof TwoAtomsViewProperties ) {
      surfaceType = this.viewProperties.surfaceTypeProperty.value;
    }

    const eFieldEnabled = this.viewProperties.eFieldEnabledProperty.value;

    /////// CONTEXT RESPONSES ///////

    // If Bond Dipoles visible, emit bond dipole related context responses
    bondDipolesVisible && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.dipoleContext.format( {
        progress: MoleculePolarityFluent.a11y.dipoleProgress.format( {
          progress: changeInEN === 0 ? 'zero' : isDipoleMagnitudeGrowing ? 'larger' : 'smaller'
        } )
      } )
    );

    // If bond dipole changes direction
    bondDipolesVisible && didDipoleChangeDirection && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.dipoleDirectionChange.format( {
        atom: dipoleMagnitude > 0 ? 'B' : 'A'
      } )
    );

    // If Partial Charges visible
    partialChargesVisible && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.partialChargeContext.format( {
        progress: MoleculePolarityFluent.a11y.electrostaticPotentialProgressUppercase.format( {
          progress: this.changeInENtoElectrostaticPotentialProgress( invertedDipoleMagnitude, changeInEN )
        } )
      } )
    );
    partialChargesVisible && didDipoleChangeDirection && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.partialChargeSignChange.format( {
        sign: MoleculePolarityFluent.a11y.partialChargeSign.format( {
          sign: invertedDipoleMagnitude < 0 ? 'positive' : 'negative'
        } )
      } )
    );
    bondCharacterVisible && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.bondCharacterContext.format( {
        progress: MoleculePolarityFluent.a11y.bondCharacterProgress.format( {
          progress: isDipoleMagnitudeGrowing ? 'moreIonic' : 'moreCovalent'
        } )
      } )
    );
    surfaceType === 'electrostaticPotential' && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.electrostaticContext.format( {
        progress: MoleculePolarityFluent.a11y.electrostaticPotentialProgressUppercase.format( {
          progress: this.changeInENtoElectrostaticPotentialProgress( invertedDipoleMagnitude, changeInEN )
        } )
      } )
    );
    surfaceType === 'electronDensity' && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.electronDensityContext.format( {
        progress: MoleculePolarityFluent.a11y.electronDensityProgressUppercase.format( {
          progress: changeInEN > 0 ? 'more' : 'less'
        } )
      } )
    );

    // If E Field enabled and the molecule is polar
    eFieldEnabled && dipoleMagnitude !== 0 && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.electricFieldContextStringProperty.value
    );

  }

  private changeInENtoElectrostaticPotentialProgress( deltaEN: number, changeInEN: number ): EPProgress {
    return deltaEN === 0 ? 'neutral' :
           deltaEN < 0 ? changeInEN < 0 ? 'morePositive' : 'lessPositive' :
           changeInEN > 0 ? 'moreNegative' : 'lessNegative';
  }
}

moleculePolarity.register( 'ElectronegativitySlider', ElectronegativitySlider );