// Copyright 2021-2025, University of Colorado Boulder

/**
 * MoleculeContextResponses handles accessibility context responses when electronegativity changes.
 *
 * @author Agustín Vallejo
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import ThreeAtomsViewProperties from '../../threeatoms/view/ThreeAtomsViewProperties.js';
import TwoAtomsViewProperties from '../../twoatoms/view/TwoAtomsViewProperties.js';
import Atom from '../model/Atom.js';
import Bond from '../model/Bond.js';
import Molecule from '../model/Molecule.js';
import { SurfaceType } from '../model/SurfaceType.js';
import { toClock } from './toClock.js';

type EPProgress = 'morePositive' | 'lessPositive' | 'neutral' | 'lessNegative' | 'moreNegative';

export default class MoleculeContextResponsesNode extends Node {

  private readonly atom: Atom;
  private readonly molecule: Molecule;
  private readonly bonds: Bond[];
  private readonly viewProperties: ThreeAtomsViewProperties | TwoAtomsViewProperties;
  private readonly invertMapping: boolean;

  /**
   * @param atom - the atom whose electronegativity changes trigger context responses
   * @param molecule - the molecule containing the atom
   * @param bonds - bonds directly affected by this atom's electronegativity changes
   * @param viewProperties - visibility properties that determine whether to emit context responses
   * @param invertMapping - whether to invert some context responses based on the changed atom
   */
  public constructor(
    atom: Atom,
    molecule: Molecule,
    bonds: Bond[],
    viewProperties: ThreeAtomsViewProperties | TwoAtomsViewProperties,
    invertMapping = false
  ) {
    super();

    this.atom = atom;
    this.molecule = molecule;
    this.bonds = bonds;
    this.viewProperties = viewProperties;
    this.invertMapping = invertMapping;

    atom.previousElectronegativityProperty.link( () => {
      this.emitContextResponse();
    } );
  }

  /**
   * The change in electronegativity will trigger a multitude of context responses
   * depending on various factors that change the visible sim.
   * This function calculates all those changes.
   */
  private emitContextResponse(): void {

    // clear the queue of utterances
    this.forEachUtteranceQueue( utteranceQueue => utteranceQueue.clear() );

    // Mini-utility function for emitting context responses without repeating the verbosity
    const contextResponse = ( message: string ) => {
      this.addAccessibleContextResponse( message, { alertBehavior: 'queue' } );
    };

    // This is how much the atom's EN is changing because of the slider, not to be confused with deltaEN
    const currentEN = this.atom.electronegativityProperty.value;
    const changeInEN = currentEN - this.atom.previousElectronegativityProperty.value;

    if ( Math.abs( changeInEN ) === 0 ) { return; } // no change, no context response

    // For some cases we need to invert the change in EN for context responses based on which atom is being changed
    const invertedChangeInEN = this.invertMapping ? -changeInEN : changeInEN;

    // deltaEN = EN_B - EN_A
    const bondDeltaEN = this.molecule.deltaENProperty.value;
    const previousBondDeltaEN = bondDeltaEN - invertedChangeInEN;

    // Similarly, deltaEN > 0 might mean something different based on which atom is being changed.
    // i.e. high deltaEN means a high electron density for one atom but low for the other.
    const invertedBondDeltaEN = this.invertMapping ? -bondDeltaEN : bondDeltaEN;
    const isBondDeltaENGrowing = Math.abs( previousBondDeltaEN ) < Math.abs( bondDeltaEN );
    const didBondChangeDirection = bondDeltaEN * previousBondDeltaEN < 0;

    // Dipole
    const previousDipole = this.molecule.previousDipoleProperty.value;
    const currentDipole = this.molecule.dipoleProperty.value;
    const dipoleMagnitudeChange = currentDipole.magnitude - previousDipole.magnitude;
    const didDipoleMagnitudeChange = Math.abs( dipoleMagnitudeChange ) > 0.01;
    const isDipoleZero = currentDipole.magnitude < 0.01;

    // Sim visibility properties that condition the context responses
    // In some cases we have to check for the Two Atom Molecule or the Three Atom One
    let bondDipolesVisible: boolean;
    if ( this.viewProperties instanceof TwoAtomsViewProperties ) {
      bondDipolesVisible = this.viewProperties.bondDipoleVisibleProperty.value;
    }
    else {
      bondDipolesVisible = this.viewProperties.bondDipolesVisibleProperty.value;
    }

    let molecularDipoleVisible = false;
    if ( this.viewProperties instanceof ThreeAtomsViewProperties ) {
      molecularDipoleVisible = this.viewProperties.molecularDipoleVisibleProperty.value;
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
    bondDipolesVisible && didDipoleMagnitudeChange && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.dipoleContext.format( {
        progress: MoleculePolarityFluent.a11y.dipoleProgress.format( {
          progress: isBondDeltaENGrowing ? 'larger' : 'smaller'
        } )
      } )
    );

    // If bond dipole changes direction
    bondDipolesVisible && didBondChangeDirection && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.dipoleDirectionChange.format( {
        atom: bondDeltaEN > 0 ? 'B' : 'A'
      } )
    );

    // Molecular dipole null description: Molecular dipole zero.
    molecularDipoleVisible && isDipoleZero && contextResponse(
      MoleculePolarityFluent.a11y.threeAtomsScreen.atomBElectronegativitySlider.molecularDipoleContext.format( {
        progress: MoleculePolarityFluent.a11y.dipoleProgress.format( {
          progress: 'zero'
        } )
      } )
    );

    // Molecular dipole description
    molecularDipoleVisible && !isDipoleZero && contextResponse(
      MoleculePolarityFluent.a11y.threeAtomsScreen.atomBElectronegativitySlider.molecularDipoleDirection.format( {
        progress: MoleculePolarityFluent.a11y.dipoleProgress.format( {
          progress: dipoleMagnitudeChange > 0 ? 'larger' : 'smaller'
        } ),
        position: toClock( currentDipole.angle )
      } )
    );

    // If Partial Charges visible
    partialChargesVisible && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.partialChargeContext.format( {
        progress: MoleculePolarityFluent.a11y.electrostaticPotentialProgress.format( {
          progress: this.changeInENtoProgress( invertedBondDeltaEN, changeInEN )
        } )
      } )
    );
    partialChargesVisible && didBondChangeDirection && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.partialChargeSignChange.format( {
        sign: MoleculePolarityFluent.a11y.partialChargeSign.format( {
          sign: invertedBondDeltaEN < 0 ? 'positive' : 'negative'
        } )
      } )
    );
    bondCharacterVisible && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.bondCharacterContext.format( {
        progress: MoleculePolarityFluent.a11y.bondCharacterProgress.format( {
          progress: isBondDeltaENGrowing ? 'moreIonic' : 'moreCovalent'
        } )
      } )
    );
    surfaceType === 'electrostaticPotential' && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.electrostaticContext.format( {
        progress: MoleculePolarityFluent.a11y.electrostaticPotentialProgressUppercase.format( {
          progress: this.changeInENtoProgress( invertedBondDeltaEN, changeInEN )
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
    eFieldEnabled && !isDipoleZero && contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.electricFieldContextStringProperty.value
    );
  }

  private changeInENtoProgress( deltaEN: number, changeInEN: number ): EPProgress {
    return deltaEN === 0 ? 'neutral' :
           deltaEN < 0 ? changeInEN < 0 ? 'morePositive' : 'lessPositive' :
           changeInEN > 0 ? 'moreNegative' : 'lessNegative';
  }
}

moleculePolarity.register( 'MoleculeContextResponsesNode', MoleculeContextResponsesNode );
