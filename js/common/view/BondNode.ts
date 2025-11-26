// Copyright 2014-2025, University of Colorado Boulder

/**
 * BondNode is the visual representation of a bond between 2 atoms. It is intended to be rendered before the 2 atoms,
 * so that the atoms cover the portion of the bond that overlaps the atoms.
 * Shapes are created in global coordinates, so this node's position should be (0,0).
 * Clients should not attempt to position this node.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { LineOptions } from '../../../../scenery/js/nodes/Line.js';
import { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle, { RectangleOptions } from '../../../../scenery/js/nodes/Rectangle.js';
import moleculePolarity from '../../moleculePolarity.js';
import Bond from '../model/Bond.js';
import MPColors from '../MPColors.js';

type SelfOptions = EmptySelfOptions;

type BondNodeOptions = SelfOptions &
  PickRequired<RectangleOptions, 'tandem'> &
  PickOptional<NodeOptions, 'phetioInputEnabledPropertyInstrumented'>;

export default class BondNode extends Rectangle {

  public constructor( bond: Bond, providedOptions: BondNodeOptions ) {

    const options = optionize<BondNodeOptions, SelfOptions, LineOptions>()( {

      // LineOptions
      fill: MPColors.BOND,
      stroke: 'black',
      visiblePropertyOptions: { phetioReadOnly: true },
      isDisposable: false
    }, providedOptions );

    const bondLength = bond.atom1.positionProperty.value.distance( bond.atom2.positionProperty.value );

    super( 0, 0, 12, bondLength, options );

    Multilink.multilink(
      [
        bond.atom1.positionProperty,
        bond.atom2.positionProperty
      ],
      ( position1, position2 ) => {

        // Since the atoms only rotate, no need to stretch the bond, just position and rotate
        const delta = position2.minus( position1 );
        const angle = delta.angle;
        this.rotation = angle + Math.PI / 2;

        // Set center in the middle of the two atoms
        this.centerX = ( position1.x + position2.x ) / 2;
        this.centerY = ( position1.y + position2.y ) / 2;
      }
    );
  }
}

moleculePolarity.register( 'BondNode', BondNode );