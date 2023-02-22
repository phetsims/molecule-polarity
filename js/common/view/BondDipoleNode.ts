// Copyright 2014-2023, University of Colorado Boulder

/**
 * Visual representation of a bond dipole.
 * Controls its own position, so clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Node } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import Bond from '../model/Bond.js';
import MPColors from '../MPColors.js';
import DipoleNode, { DipoleNodeOptions } from './DipoleNode.js';

// constants
const PERPENDICULAR_OFFSET = 55; // offset perpendicular to the axis of the bond

type SelfOptions = EmptySelfOptions;

type BondDipoleNodeOptions = SelfOptions & DipoleNodeOptions;

export default class BondDipoleNode extends DipoleNode {

  public constructor( bond: Bond, providedOptions?: BondDipoleNodeOptions ) {

    const options = optionize<BondDipoleNodeOptions, SelfOptions, DipoleNodeOptions>()( {

      // DipoleNodeOptions
      fill: MPColors.BOND_DIPOLE
    }, providedOptions );

    super( bond.dipoleProperty, options );

    // position the dipole to be parallel with the bond, with some perpendicular offset
    bond.dipoleProperty.link( dipole => {

      const bondAngle = bond.getAngle();
      const isInPhase = Math.abs( bondAngle - dipole.angle ) < ( Math.PI / 4 );
      const dipoleViewLength = dipole.magnitude * ( this.referenceLength / this.referenceMagnitude );

      // position of tail in polar coordinates, relative to center of bond
      const offsetX = isInPhase ? ( dipoleViewLength / 2 ) : -( dipoleViewLength / 2 );
      const offsetAngle = Math.atan( offsetX / PERPENDICULAR_OFFSET );
      const tailDistance = PERPENDICULAR_OFFSET / Math.cos( offsetAngle );
      const tailAngle = bondAngle - ( Math.PI / 2 ) - offsetAngle;

      // position of tail in Cartesian coordinates, relative to center of bond
      const tailX = tailDistance * Math.cos( tailAngle );
      const tailY = tailDistance * Math.sin( tailAngle );

      // position of tail in global coordinate frame
      this.translation = bond.getCenter().plusXY( tailX, tailY );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Creates an icon, for use in control panels.
   */
  public static override createIcon(): Node {
    return DipoleNode.createIcon( { fill: MPColors.BOND_DIPOLE } );
  }
}

moleculePolarity.register( 'BondDipoleNode', BondDipoleNode );