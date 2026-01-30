// Copyright 2014-2026, University of Colorado Boulder

/**
 * The atom of a RealMolecule.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { RealBond } from './RealBond.js';
import Element from '../../../../nitroglycerin/js/Element.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Color from '../../../../scenery/js/util/Color.js';
import { elementToColorProperty } from './RealMoleculeColors.js';
import moleculePolarity from '../../moleculePolarity.js';

export class RealAtom {

  public readonly bonds: RealBond[] = [];

  public constructor(
    public readonly index: number,
    public element: Element,
    public simplifiedPartialCharge: number,
    public psi4PartialCharge: number,
    public mullikenPartialCharge: number,
    public loewdinPartialCharge: number,
    public hirshfeldPartialCharge: number,
    public mbisPartialCharge: number,
    public chelpgPartialCharge: number,
    public qeqPartialCharge: number,
    public eemPartialCharge: number,
    public qtpiePartialCharge: number,
    public position: Vector3
  ) {

  }

  public getPartialCharge(): number {
    // NOTE: if isAdvanced is false, we won't be displaying things based on partial charges, so just return hirshfeld
    return this.hirshfeldPartialCharge;
  }

  public getColorProperty(): TReadOnlyProperty<Color> {
    return elementToColorProperty( this.element );
  }

  public getDisplayRadius(): number {
    const angstroms = this.element.vanDerWaalsRadius / 100;

    return 0.25 * angstroms; // scale factor for better visibility
  }
}

moleculePolarity.register( 'RealAtom', RealAtom );