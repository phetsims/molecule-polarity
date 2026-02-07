// Copyright 2025-2026, University of Colorado Boulder

/**
 * Molecular dipole arrow view for the 3D molecule view.
 *
 * Renders the molecular dipole as a DipoleArrowView using the same
 * per‑Debye scale as bond dipoles (from the model), oriented according
 * to the preference (positive->negative or reversed).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import moleculePolarity from '../../moleculePolarity.js';
import RealMolecule from '../model/RealMolecule.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import DipoleArrowView from './DipoleArrowView.js';

export default class MolecularDipoleView extends THREE.Object3D {
  // normalized, already includes orientationSign
  private readonly dir: Vector3;

  private readonly arrow: DipoleArrowView;

  public constructor( molecule: RealMolecule, orientationSign: number ) {
    super();

    const mu = molecule.computeMolecularDipoleFromBondDipoleVectorSum();
    const muMag = mu.getMagnitude();

    // Expect caller to check a threshold for visibility
    const centerAtom = molecule.getCentralAtom()!;
    const centerRadius = centerAtom.getDisplayRadius();

    // Direction: positive->negative, apply orientation preference
    this.dir = mu.dividedScalar( muMag ).timesScalar( orientationSign );

    const tail = centerAtom.position.plus( this.dir.timesScalar( centerRadius + 0.07 ) );

    const scale = molecule.getDipoleArrowScale();
    const drawLength = Math.max( 0, muMag * scale );

    // Choose minimum unscaled geometry size based on molecule extent
    const span = molecule.getMaximumExtent();
    const minUnscaled = Math.max( 0.2, 0.6 * span );

    const arrow = new DipoleArrowView( false );
    if ( drawLength < minUnscaled ) {
      arrow.setArrowProperties( tail, this.dir, minUnscaled );
      const uniformScale = Math.max( drawLength / Math.max( minUnscaled, 1e-6 ), 0 );
      arrow.scale.setScalar( uniformScale );
    }
    else {
      arrow.setArrowProperties( tail, this.dir, drawLength );
      arrow.scale.setScalar( 1 );
    }
    this.add( arrow );

    // Initialize cross axis aligned with the arrow direction
    arrow.setCrossPerp( this.dir );

    this.arrow = arrow;
  }

  public dispose(): void {
    this.arrow.dispose();
  }
}

moleculePolarity.register( 'MolecularDipoleView', MolecularDipoleView );

