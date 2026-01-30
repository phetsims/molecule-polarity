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
import { elementToColorProperty, elementToForegroundColorProperty } from './RealMoleculeColors.js';
import moleculePolarity from '../../moleculePolarity.js';

export class RealAtom {

  public readonly bonds: RealBond[] = [];

  /**
   * @param index
   * @param element
   * @param simplifiedPartialCharge - partial charges from the original Java simulation
   * @param hirshfeldPartialCharge - partial charges from ORCA (Hirshfeld analysis)
   * @param position
   */
  public constructor(
    public readonly index: number,
    public element: Element,
    public simplifiedPartialCharge: number,
    public hirshfeldPartialCharge: number,
    public position: Vector3
  ) {

  }

  /**
   * Gets the partial charge to be used for display purposes.
   */
  public getPartialCharge(): number {
    // NOTE: if isAdvanced is false, we won't be displaying things based on partial charges, so just return hirshfeld
    return this.hirshfeldPartialCharge;
  }

  /**
   * Gets the color property for this atom.
   */
  public getColorProperty(): TReadOnlyProperty<Color> {
    return elementToColorProperty( this.element );
  }

  /**
   * Gets the foreground color property for this atom.
   */
  public getForegroundColorProperty(): TReadOnlyProperty<Color> {
    return elementToForegroundColorProperty( this.element );
  }

  /**
   * Gets the display radius for this atom in view coordinates.
   */
  public getDisplayRadius(): number {
    const angstroms = this.element.vanDerWaalsRadius / 100;

    return 0.25 * angstroms; // scale factor for better visibility
  }
}

moleculePolarity.register( 'RealAtom', RealAtom );