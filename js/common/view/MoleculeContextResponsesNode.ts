// Copyright 2021-2026, University of Colorado Boulder

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
import DescriptionMaps, { EPProgress } from './DescriptionMaps.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';

export default class MoleculeContextResponsesNode extends Node {

  private readonly atom: Atom;
  private readonly molecule: Molecule;
  private readonly bonds: Bond[];
  private readonly viewProperties: ThreeAtomsViewProperties | TwoAtomsViewProperties;
  private readonly invertMapping: boolean;
  private readonly partialChargeMagnitudeStringProperty: TReadOnlyProperty<string>;
  private readonly partialChargeSignStringProperty: TReadOnlyProperty<'positive' | 'negative' | 'zero'>;

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

    atom.previousElectronegativityProperty.lazyLink( () => {
      this.emitContextResponse();
    } );

    // Create references here so we don't leak memory below
    this.partialChargeMagnitudeStringProperty = DescriptionMaps.createPartialChargesStringProperty( this.atom.partialChargeProperty );
    this.partialChargeSignStringProperty = this.atom.partialChargeProperty.derived( charge => charge !== 0 ? charge > 0 ? 'positive' : 'negative' : 'zero' );
  }

  // Mini-utility function for emitting context responses without repeating the verbosity
  private contextResponse( message: string, responseGroup?: string ): void {
    const options = responseGroup ? { responseGroup: responseGroup } : { interruptible: false };
    this.addAccessibleContextResponse( message, options );
  }

  /**
   * The change in electronegativity will trigger a multitude of context responses
   * depending on various factors that change the visible sim.
   * This function calculates all those changes.
   *
   * Some of the variables have their inverted counterpart, because for some responses,
   * a given dipole will trigger different responses based on which atom's EN is being changed.
   */
  private emitContextResponse(): void {

    const currentEN = this.atom.electronegativityProperty.value;

    // This is how much the atom's EN is changing because of the slider, not to be confused with deltaEN
    const changeInEN = currentEN - this.atom.previousElectronegativityProperty.value;

    if ( Math.abs( changeInEN ) === 0 ) { return; } // no change, no context response

    // DeltaEN of the molecule, which depending on the atom we might need to change the sign for context responses
    const invertedDeltaEN = this.invertMapping ? -this.molecule.deltaENProperty.value : this.molecule.deltaENProperty.value;

    // Dipole
    const previousDipole = this.molecule.previousDipoleProperty.value;
    const currentDipole = this.molecule.dipoleProperty.value;
    const dipoleMagnitudeChange = currentDipole.magnitude - previousDipole.magnitude;
    const isDipoleZero = currentDipole.magnitude < 0.01;

    ///////// VISIBILITY PROPERTIES /////////
    // In some cases we have to check for the Two Atom Molecule or the Three Atom One
    let molecularDipoleVisible = false;
    if ( this.viewProperties instanceof ThreeAtomsViewProperties ) {
      molecularDipoleVisible = this.viewProperties.molecularDipoleVisibleProperty.value;
    }

    // Both screens have Partial Charges visibility property
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

    // Setting here the previous value of the dipole for calculations
    this.molecule.previousDipoleProperty.value = currentDipole;

    /////// CONTEXT RESPONSES ///////

    this.bondDipoleContextResponses();

    // Molecular dipole null description: Molecular dipole zero.
    molecularDipoleVisible && isDipoleZero && this.contextResponse(
      MoleculePolarityFluent.a11y.common.molecularDipoleResponses.molecularDipoleContext.format( {
        progress: MoleculePolarityFluent.a11y.dipoleProgress.format( {
          progress: 'zero'
        } )
      } ), 'molecularDipoleVisible'
    );

    // Molecular dipole description
    molecularDipoleVisible && !isDipoleZero && this.contextResponse(
      MoleculePolarityFluent.a11y.common.molecularDipoleResponses.molecularDipoleDirection.format( {
        progress: MoleculePolarityFluent.a11y.dipoleProgress.format( {
          progress: dipoleMagnitudeChange > 0 ? 'larger' : 'smaller'
        } ),
        position: DescriptionMaps.formatOrientationString( currentDipole.angle, 'toAngle' )
      } ), 'molecularDipoleVisible'
    );

    // If Partial Charges visible
    {

      partialChargesVisible && this.contextResponse(
        MoleculePolarityFluent.a11y.threeAtomsScreen.moleculeABC.partialChargesDescription.format( {
          atom: this.atom.label,
          magnitude: this.partialChargeMagnitudeStringProperty,
          sign: this.partialChargeSignStringProperty
        } ), 'partialChargesVisible'
      );
    }
    bondCharacterVisible && this.contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.bondCharacterContext.format( {
        progress: MoleculePolarityFluent.a11y.bondCharacterProgress.format( {
          progress: dipoleMagnitudeChange > 0 ? 'moreIonic' : 'moreCovalent'
        } )
      } ), 'bondCharacterVisible'
    );
    surfaceType === 'electrostaticPotential' && this.contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.electrostaticContext.format( {
        atom: this.atom.label,
        progress: MoleculePolarityFluent.a11y.electrostaticPotentialProgress.format( {
          progress: this.changeInENtoProgress( invertedDeltaEN, changeInEN )
        } )
      } ), 'surfaceType'
    );
    surfaceType === 'electronDensity' && this.contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.electronDensityContext.format( {
        atom: this.atom.label,
        progress: MoleculePolarityFluent.a11y.electronDensityProgress.format( {
          progress: changeInEN > 0 ? 'more' : 'less'
        } )
      } ), 'surfaceType'
    );

    // If E Field enabled and the molecule is polar
    eFieldEnabled && !isDipoleZero && this.contextResponse(
      MoleculePolarityFluent.a11y.common.electronegativitySlider.electricFieldContextStringProperty.value, 'eFieldEnabled'
    );
  }

  /**
   * Because there's a lot of variety for bond dipole context responses,
   * they are handled in their own function.
   *
   * Mainly because atom B has two bonds on Screen 2.
   */
  private bondDipoleContextResponses(): void {

    let bondDipolesVisible: boolean;
    if ( this.viewProperties instanceof TwoAtomsViewProperties ) {
      bondDipolesVisible = this.viewProperties.bondDipoleVisibleProperty.value;
    }
    else {
      bondDipolesVisible = this.viewProperties.bondDipolesVisibleProperty.value;
    }

    this.bonds.forEach( ( bond, count ) => {
      const bondDeltaEN = bond.deltaENProperty.value;
      const bondChanges = this.calculateBondChanges( bondDeltaEN,
        this.invertMapping || count === 1 ); // Only happens for Atom B, which has inverted mapping but second bond is not
      const isBondDeltaENGrowing = bondChanges.isGrowing;
      const didBondChangeDirection = bondChanges.didBondChangeDirection;

      // If Bond Dipoles visible, emit bond dipole related context responses
      bondDipolesVisible && this.contextResponse(
        MoleculePolarityFluent.a11y.common.electronegativitySlider.dipoleContext.format( {
          bond: bond.label,
          progress: MoleculePolarityFluent.a11y.dipoleProgress.format( {
            progress: bondDeltaEN === 0 ? 'zero' : isBondDeltaENGrowing ? 'larger' : 'smaller'
          } )
        } ), 'largerSmaller'
      );

      // If bond dipole changes direction
      bondDipolesVisible && didBondChangeDirection && this.contextResponse(
        MoleculePolarityFluent.a11y.common.electronegativitySlider.dipoleDirectionChange.format( {
          bond: bond.label,
          atom: bondDeltaEN > 0 ? bond.atom2.label : bond.atom1.label
        } ), 'bondDirectionChange'
      );
    } );
  }

  private calculateBondChanges( bondDeltaEN: number, inverted: boolean ): { isGrowing: boolean; didBondChangeDirection: boolean } {
    // This is how much the atom's EN is changing because of the slider, not to be confused with deltaEN
    const currentEN = this.atom.electronegativityProperty.value;
    const changeInEN = currentEN - this.atom.previousElectronegativityProperty.value;

    // For some cases we need to invert the change in EN for context responses based on which atom is being changed
    const invertedChangeInEN = inverted ? -changeInEN : changeInEN;

    // deltaEN = EN_B - EN_A (or C depending on the bond)
    // So we revert either dEN_B or -dEN_A
    const previousBondDeltaEN = bondDeltaEN - invertedChangeInEN;

    // deltaEN > 0 might mean something different based on which atom is being changed.
    // i.e. high deltaEN means a high electron density for one atom but low for the other.
    const isGrowing = Math.abs( previousBondDeltaEN ) < Math.abs( bondDeltaEN );
    const didBondChangeDirection = bondDeltaEN * previousBondDeltaEN < 0 || previousBondDeltaEN === 0;
    return { isGrowing: isGrowing, didBondChangeDirection: didBondChangeDirection };
  }

  private changeInENtoProgress( deltaEN: number, changeInEN: number ): EPProgress {
    return deltaEN === 0 ? 'neutral' :
           deltaEN < 0 ? changeInEN < 0 ? 'morePositive' : 'lessPositive' :
           changeInEN > 0 ? 'moreNegative' : 'lessNegative';
  }
}

moleculePolarity.register( 'MoleculeContextResponsesNode', MoleculeContextResponsesNode );
