// Copyright 2014-2022, University of Colorado Boulder

/**
 * BondNode is the visual representation of a bond between 2 atoms. It is intended to be rendered before the 2 atoms,
 * so that the atoms cover the portion of the bond that overlaps the atoms.
 * Shapes are created in global coordinates, so this node's position should be (0,0).
 * Clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Line, LineOptions, NodeOptions } from '../../../../scenery/js/imports.js';
import moleculePolarity from '../../moleculePolarity.js';
import Bond from '../model/Bond.js';
import MPColors from '../MPColors.js';

type SelfOptions = EmptySelfOptions;

type BondNodeOptions = SelfOptions &
  PickRequired<LineOptions, 'tandem'> &
  PickOptional<NodeOptions, 'phetioInputEnabledPropertyInstrumented'>;

export default class BondNode extends Line {

  public constructor( bond: Bond, providedOptions: BondNodeOptions ) {

    const options = optionize<BondNodeOptions, SelfOptions, LineOptions>()( {

      // LineOptions
      stroke: MPColors.BOND,
      lineWidth: 12,
      visiblePropertyOptions: { phetioReadOnly: true }
    }, providedOptions );

    super( bond.atom1.positionProperty.value, bond.atom2.positionProperty.value, options );

    // adjust the bond when its endpoints change
    bond.atom1.positionProperty.link( position => this.setPoint1( position ) );
    bond.atom2.positionProperty.link( position => this.setPoint2( position ) );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

moleculePolarity.register( 'BondNode', BondNode );