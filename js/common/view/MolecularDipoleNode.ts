// Copyright 2014-2025, University of Colorado Boulder

/**
 * Visual representation of a molecular dipole.
 * Controls its own position in global coordinates, so clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import moleculePolarity from '../../moleculePolarity.js';
import Molecule from '../model/Molecule.js';
import MPColors from '../MPColors.js';
import DipoleNode, { DipoleNodeOptions } from './DipoleNode.js';

// constants
const OFFSET = 55; // offset in the direction that the dipole points

type SelfOptions = EmptySelfOptions;

type MolecularDipoleNodeOptions = SelfOptions & DipoleNodeOptions;

export default class MolecularDipoleNode extends DipoleNode {

  public constructor( molecule: Molecule, providedOptions?: MolecularDipoleNodeOptions ) {

    const options = optionize<MolecularDipoleNodeOptions, SelfOptions, DipoleNodeOptions>()( {

      // DipoleNodeOptions
      fill: MPColors.molecularDipoleProperty
    }, providedOptions );

    super( molecule.dipoleProperty, options );

    // position the dipole with some radial offset from the molecule's position
    molecule.dipoleProperty.link( dipole => {

      // offset vector relative to molecule position
      const v = Vector2.createPolar( OFFSET, dipole.angle );

      // offset in global coordinate frame
      this.translation = molecule.position.plus( v );
    } );
  }

  /**
   * Creates an icon, for use in control panels.
   */
  public static override createIcon(): Node {
    return DipoleNode.createIcon( { fill: MPColors.molecularDipoleProperty } );
  }
}

moleculePolarity.register( 'MolecularDipoleNode', MolecularDipoleNode );