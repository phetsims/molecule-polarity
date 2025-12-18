// Copyright 2025, University of Colorado Boulder

/**
 * AccessibleAtomNode is an extension of AccessibleSlider that controls the movement of an AtomNode,
 * Mainly used for the atoms of the TriatomicMolecule
 *
 * @author Agustín Vallejo
 */

import TProperty from '../../../../axon/js/TProperty.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import moleculePolarity from '../../moleculePolarity.js';
import Atom from '../model/Atom.js';
import AtomNode, { AtomNodeOptions } from './AtomNode.js';
import MPAccessibleSlider, { MPAccessibleSliderOptions } from './MPAccessibleSlider.js';


type SelfOptions = {
  atomNodeOptions?: AtomNodeOptions;
};

export type AccessibleAtomNodeNodeOptions = SelfOptions & MPAccessibleSliderOptions;

export default class AccessibleAtomNode extends MPAccessibleSlider {

  public constructor( atom: Atom, angleProperty: TProperty<number>, providedOptions: AccessibleAtomNodeNodeOptions ) {

    const options = optionize<AccessibleAtomNodeNodeOptions, SelfOptions, MPAccessibleSliderOptions>()(
      {
        // SelfOptions
        atomNodeOptions: {
          tandem: Tandem.OPT_OUT
        },

        // NodeOptions
        cursor: 'pointer',
        phetioInputEnabledPropertyInstrumented: true,
        isDisposable: false
      }, providedOptions );

    super( angleProperty, options );

    // atom
    this.addChild( new AtomNode( atom, options.atomNodeOptions ) );

    atom.positionProperty.link( position => {
      this.focusHighlight = new Shape().circle(
        position,
        atom.diameter * 0.6
      );
    } );
  }
}

moleculePolarity.register( 'AccessibleAtomNode', AccessibleAtomNode );