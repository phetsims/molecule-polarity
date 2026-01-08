// Copyright 2025, University of Colorado Boulder

/**
 * Bond dipole arrow view for the 3D molecule view.
 *
 * Uses the model-provided per‑Debye scale so bond dipoles and molecular
 * dipoles share visual scaling. Handles side-offset selection stable across
 * frames and keeps the crossbar perpendicular to camera direction.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import moleculePolarity from '../../moleculePolarity.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import RealMolecule, { RealBond } from '../model/RealMolecule.js';
import DipoleArrowView from './DipoleArrowView.js';
import MPQueryParameters from '../../common/MPQueryParameters.js';

const BOND_DIPOLE_OFFSET = 0.4; // view units offset from bond centerline

export default class BondDipoleView extends THREE.Object3D {
  private readonly molecule: RealMolecule;
  private readonly bond: RealBond;
  private readonly arrow: DipoleArrowView;
  private lastOffsetDir: Vector3 | null = null;

  public constructor( molecule: RealMolecule, bond: RealBond ) {
    super();
    this.molecule = molecule;
    this.bond = bond;

    this.arrow = new DipoleArrowView( true );
    this.add( this.arrow );
  }

  public update( parent: THREE.Object3D, localCamera: Vector3, orientationSign: number ): void {
    const start = this.bond.atomA.position;
    const end = this.bond.atomB.position;
    const dist = start.distance( end );
    if ( dist === 0 ) { return; }

    const center = this.bond.getVisibleCenter();
    const bondDir = end.minus( start ).normalized();

    // Perpendicular offset relative to camera
    const viewDir = center.minus( localCamera ).normalized();
    let perpendicular = bondDir.cross( viewDir ).normalized();
    if ( perpendicular.getMagnitudeSquared() < 1e-6 ) {
      const alt = ( Math.abs( bondDir.dot( Vector3.X_UNIT ) ) > 0.9 ) ? Vector3.Y_UNIT : Vector3.X_UNIT;
      perpendicular = bondDir.cross( alt ).normalized();
    }
    const negatedPerpendicular = perpendicular.timesScalar( -1 );

    // Side selection
    let chosen = perpendicular;
    const partner = this.molecule.getSymmetricPartnerBond( this.bond );
    if ( partner ) {
      // Handle the CO2 case where both bonds are aligned
      if ( partner.getDirection().dot( this.bond.getDirection() ) < -0.9 ) {
        // Exact opposites! Just choose a consistent side
        chosen = perpendicular.y > 0 ? perpendicular : negatedPerpendicular;
      }
      else {
        // Enforce obtuse-side selection relative to the partner bond
        const central = this.molecule.getCentralAtom();
        if ( central ) {
          const other = partner.atomA === central ? partner.atomB : partner.atomB === central ? partner.atomA : null;
          if ( other ) {
            const u = bondDir.minus( viewDir.timesScalar( bondDir.dot( viewDir ) ) ).normalized();
            const v = viewDir.cross( u ).normalized(); // in-plane perpendicular basis
            const w = other.position.minus( central.position ).normalized();
            const wProj = w.minus( viewDir.timesScalar( w.dot( viewDir ) ) ).normalized();
            const s = wProj.dot( v );
            // If partner is on +v side, choose +perp (which corresponds to -v); otherwise choose -perp
            chosen = s > 0 ? perpendicular : negatedPerpendicular;
          }
        }
      }
    }
    else if ( this.lastOffsetDir ) {
      // Stable side selection
      const d1 = perpendicular.dot( this.lastOffsetDir );
      const d2 = negatedPerpendicular.dot( this.lastOffsetDir );
      chosen = ( d2 > d1 ) ? negatedPerpendicular : perpendicular;
    }
    this.lastOffsetDir = chosen;

    const muMag = this.bond.getDipoleMagnitudeDebye();
    const drawLength = Math.max( 0, muMag * this.molecule.getDipoleScale() );
    const sideOffsetScale = ( this.bond.bondType === 3 ? 1.3 : ( this.bond.bondType === 2 ? 1.1 : 0.9 ) );
    const dir = this.bond.getPositiveToNegativeUnit().timesScalar( orientationSign );

    const electronegativityDir = this.bond.atomB.position.minus( this.bond.atomA.position ).timesScalar( this.bond.atomB.element.electronegativity! - this.bond.atomA.element.electronegativity! );
    if ( MPQueryParameters.debug3DModels && electronegativityDir.dot( dir ) < 0 ) {
      console.log( `${this.molecule.rawSymbol} ${this.bond.atomA.element.symbol}-${this.bond.atomB.element.symbol} reversed` );
      this.arrow.updateColor( false );
    }

    const tail = center
      .plus( chosen.timesScalar( BOND_DIPOLE_OFFSET * sideOffsetScale ) )
      .plus( dir.timesScalar( -drawLength / 2 ) );

    // Cross axis perpendicular to camera at arrow location
    const arrowPosFrame = tail; // tail in parent space
    const viewDirFrame = new Vector3( arrowPosFrame.x - localCamera.x, arrowPosFrame.y - localCamera.y, arrowPosFrame.z - localCamera.z ).normalized();
    let axis = dir.minus( viewDirFrame.timesScalar( dir.dot( viewDirFrame ) ) ).normalized();
    if ( axis.getMagnitudeSquared() < 1e-6 ) {
      const alt = ( Math.abs( viewDirFrame.dot( Vector3.X_UNIT ) ) > 0.9 ) ? Vector3.Y_UNIT : Vector3.X_UNIT;
      axis = viewDirFrame.cross( alt ).normalized();
    }

    const minUnscaled = Math.max( 0.2, 0.72 * dist );
    if ( drawLength < minUnscaled ) {
      const tailForM = center
        .plus( chosen.timesScalar( BOND_DIPOLE_OFFSET * sideOffsetScale ) )
        .plus( dir.timesScalar( -drawLength / 2 ) );
      this.arrow.setFrom( tailForM, dir, minUnscaled );
      const uniformScale = Math.max( drawLength / Math.max( minUnscaled, 1e-6 ), 0 );
      this.arrow.scale.setScalar( uniformScale );
    }
    else {
      this.arrow.setFrom( tail, dir, drawLength );
      this.arrow.scale.setScalar( 1 );
    }
    this.arrow.setCrossPerp( axis );
  }

  public dispose(): void {
    this.arrow.dispose();
  }
}

moleculePolarity.register( 'BondDipoleView', BondDipoleView );
