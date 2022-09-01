// Copyright 2014-2022, University of Colorado Boulder

/**
 * SurfaceNode is the base class for 2D representations of an isosurface.
 * The 2D 'look' is similar to the corresponding Jmol 3D isosurfaces, see http://jmol.sourceforge.net/docs/surface/.
 * Shapes are created in global coordinates, so this node's position should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '../../../../kite/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeOptions, Path, TColor } from '../../../../scenery/js/imports.js';
import Range from '../../../../dot/js/Range.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import DiatomicMolecule from '../model/DiatomicMolecule.js';

// constants
const DIAMETER_SCALE = 2.25; // multiply atom diameters by this scale when computing surface size

type SelfOptions = EmptySelfOptions;

export type SurfaceNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default abstract class SurfaceNode extends Node {

  protected readonly molecule: DiatomicMolecule;
  protected readonly electronegativityRange: Range;
  protected readonly colors: TColor[];
  protected readonly path: Path;

  protected constructor( molecule: DiatomicMolecule, colors: TColor[], providedOptions: SurfaceNodeOptions ) {
    assert && assert( molecule.atomA.diameter === molecule.atomB.diameter,
      'creation of gradient assumes that both atoms have the same diameter' );

    const options = optionize<SurfaceNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      phetioReadOnly: true
    }, providedOptions );

    super( options );

    this.molecule = molecule;
    this.electronegativityRange = MPConstants.ELECTRONEGATIVITY_RANGE;
    this.colors = colors;

    // each atom is surrounded with a 'cloud' (circle)
    const radius = molecule.atomA.diameter * DIAMETER_SCALE / 2;
    this.path = new Path( new Shape()
      .arc( molecule.position.x - molecule.atomB.positionProperty.value.x, molecule.position.y - molecule.atomB.positionProperty.value.y, radius, Math.PI / 4, 7 * Math.PI / 4 )
      .arc( molecule.position.x - molecule.atomA.positionProperty.value.x, molecule.position.y - molecule.atomA.positionProperty.value.y, radius, 5 * Math.PI / 4, 3 * Math.PI / 4 )
    );
    this.addChild( this.path );

    // update surface when atoms move or electronegativity changes
    const update = () => {
      if ( this.visible ) {
        this.updateFill();
      }
    };
    molecule.atoms.forEach( atom => atom.electronegativityProperty.link( update ) );

    molecule.angleProperty.link( angle => {
      if ( this.visible ) {
        this.matrix = molecule.createTransformMatrix();
      }
    } );

    // Updates the fill when this Node become visible.
    this.visibleProperty.link( visible => {
      if ( visible ) {
        this.matrix = molecule.createTransformMatrix();
        this.updateFill();
      }
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Gets the surface width.
   */
  protected getSurfaceWidth(): number {
    return this.molecule.bond.getLength() + ( DIAMETER_SCALE * this.molecule.atomA.diameter / 2 ) + ( DIAMETER_SCALE * this.molecule.atomB.diameter / 2 );
  }

  /**
   * Updates the surface fill.
   */
  protected abstract updateFill(): void;
}

moleculePolarity.register( 'SurfaceNode', SurfaceNode );