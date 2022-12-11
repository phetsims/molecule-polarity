// Copyright 2014-2022, University of Colorado Boulder

/**
 * Atom is a make-believe atom whose electronegativity is mutable.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TProperty from '../../../../axon/js/TProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { TColor } from '../../../../scenery/js/imports.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import moleculePolarity from '../../moleculePolarity.js';
import MPConstants from '../MPConstants.js';

type SelfOptions = {
  diameter?: number; // the atom's diameter
  color?: TColor; // base color of the atom
  position?: Vector2; // initial position
  electronegativity?: number;
};

type AtomOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class Atom extends PhetioObject {

  public readonly labelStringProperty: TReadOnlyProperty<string>;
  public readonly diameter: number;
  public readonly color: TColor;
  public readonly positionProperty: TProperty<Vector2>;
  public readonly electronegativityProperty: NumberProperty;
  public readonly partialChargeProperty: TProperty<number>;

  public constructor( labelStringProperty: TReadOnlyProperty<string>, providedOptions: AtomOptions ) {

    const options = optionize<AtomOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      diameter: MPConstants.ATOM_DIAMETER,
      color: 'white',
      position: new Vector2( 0, 0 ),
      electronegativity: MPConstants.ELECTRONEGATIVITY_RANGE.min,

      // PhetioObjectOptions
      phetioState: false
    }, providedOptions );

    super( options );

    this.labelStringProperty = labelStringProperty;
    this.diameter = options.diameter;
    this.color = options.color;

    this.positionProperty = new Vector2Property( options.position, {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioDocumentation: 'The position of this atom. (0,0) is at the upper-LEFT, +x is to the right, and +y is DOWN.',
      phetioReadOnly: true // because position is constrained by molecule structure
    } );

    this.electronegativityProperty = new NumberProperty( options.electronegativity, {
      range: MPConstants.ELECTRONEGATIVITY_RANGE,
      tandem: options.tandem.createTandem( 'electronegativityProperty' )
    } );

    // partial charge is zero until this atom participates in a bond
    this.partialChargeProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'partialChargeProperty' ),
      phetioDocumentation: 'qualitative scalar representation of the partial charge, computed as the electronegativity difference',
      phetioReadOnly: true // because this is computed based on electronegativity of atoms in a molecule
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public reset(): void {
    this.electronegativityProperty.reset();
    // Do not reset positionProperty and partialChargeProperty. They will be reset by their parent molecule.
  }
}

moleculePolarity.register( 'Atom', Atom );