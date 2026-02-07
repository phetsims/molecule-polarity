// Copyright 2026, University of Colorado Boulder

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
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';

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
    public readonly element: Element,
    public readonly simplifiedPartialCharge: number,
    public readonly hirshfeldPartialCharge: number,
    public readonly position: Vector3
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

  /**
   * A list of all of the elements used in the screen, and in the order that they are shown in the electronegativity table.
   */
  public static readonly ORDERED_ELEMENTS = [
    Element.H,
    Element.B,
    Element.C,
    Element.N,
    Element.O,
    Element.F,
    Element.Cl
  ];

  /**
   * Returns the rounded electronegativity value for an element that we will actually display
   *
   * Updated with values from https://github.com/phetsims/molecule-polarity/issues/268#issuecomment-3865420424
   */
  public static getDisplayElectronegativity( element: Element ): number {
    switch( element.symbol ) {
      case 'H':
        return 2.2;
      case 'B':
        return 2.0;
      case 'C':
        return 2.6;
      case 'N':
        return 3.0;
      case 'O':
        return 3.4;
      case 'F':
        return 4.0;
      case 'Cl':
        return 3.2;
      default:
        throw new Error( `Unsupported element for display electronegativity: ${element.symbol}` );
    }
  }

  public static getA11yStringProperty( element: Element ): TReadOnlyProperty<string> {
    switch( element.symbol ) {
      case 'H':
        return MoleculePolarityFluent.a11y.common.elements.hydrogenStringProperty;
      case 'B':
        return MoleculePolarityFluent.a11y.common.elements.boronStringProperty;
      case 'C':
        return MoleculePolarityFluent.a11y.common.elements.carbonStringProperty;
      case 'N':
        return MoleculePolarityFluent.a11y.common.elements.nitrogenStringProperty;
      case 'O':
        return MoleculePolarityFluent.a11y.common.elements.oxygenStringProperty;
      case 'F':
        return MoleculePolarityFluent.a11y.common.elements.fluorineStringProperty;
      case 'Cl':
        return MoleculePolarityFluent.a11y.common.elements.chlorineStringProperty;
      default:
        throw new Error( `Unsupported element for a11y string property: ${element.symbol}` );
    }
  }
}

moleculePolarity.register( 'RealAtom', RealAtom );