// Copyright 2025-2026, University of Colorado Boulder

/**
 * Bond mesh view wrapper (handles single/double/triple cylinders) for the 3D molecule view.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Vector3 from '../../../../dot/js/Vector3.js';
import { RealBond } from '../model/RealMolecule.js';
import { BOND_RENDER_ORDER } from './RenderOrder.js';
import moleculePolarity from '../../moleculePolarity.js';

const BOND_RADIUS = 0.085;

export default class BondView extends THREE.Object3D {
  private readonly meshes: THREE.Mesh[] = [];
  private readonly bondRadius: number;
  private readonly bond: RealBond;
  private readonly bondGeometry: THREE.CylinderGeometry;
  private readonly bondMaterial: THREE.MeshLambertMaterial;

  public constructor( bond: RealBond ) {
    super();
    this.bondRadius = BOND_RADIUS;
    this.bond = bond;

    const bondGeometry = new THREE.CylinderGeometry( 1, 1, 1, 32, 1, false );
    const bondMaterial = new THREE.MeshLambertMaterial( {
      color: 0xffffff,
      depthTest: true,
      side: THREE.FrontSide
    } );

    for ( let i = 0; i < bond.bondType; i++ ) {
      const mesh = new THREE.Mesh( bondGeometry, bondMaterial );
      mesh.renderOrder = BOND_RENDER_ORDER;
      this.add( mesh );
      this.meshes.push( mesh );
    }

    this.bondGeometry = bondGeometry;
    this.bondMaterial = bondMaterial;
  }

  public setTransforms( towardsEnd: Vector3, center: Vector3, distance: number, offsets: Vector3[] ): void {
    const threeYUnit = new THREE.Vector3( 0, 1, 0 );
    const threeTowardsEnd = new THREE.Vector3( towardsEnd.x, towardsEnd.y, towardsEnd.z );
    for ( let i = 0; i < this.meshes.length; i++ ) {
      const mesh = this.meshes[ i ];
      const translation = center.plus( offsets[ i ] );
      mesh.position.set( translation.x, translation.y, translation.z );
      mesh.quaternion.setFromUnitVectors( threeYUnit, threeTowardsEnd );
      mesh.scale.x = mesh.scale.z = this.bondRadius;
      mesh.scale.y = distance;
      mesh.updateMatrix();
    }
  }

  public setDimmed( dimmed: boolean ): void {
    for ( const mesh of this.meshes ) {
      const mat = mesh.material as THREE.MeshLambertMaterial;
      mat.transparent = dimmed;
      mat.opacity = dimmed ? 0.5 : 1.0;
    }
  }

  /**
   * Updates the bond cylinders to face the camera and handle double/triple offsets.
   */
  public update( parent: THREE.Object3D, localCamera: Vector3 ): void {
    const start = this.bond.atomA.position;
    const end = this.bond.atomB.position;
    const towardsEnd = end.minus( start ).normalized();
    const distance = start.distance( end );
    const center = start.timesScalar( 0.5 ).plus( end.timesScalar( 0.5 ) );

    // Perpendicular to bond direction and camera direction
    const perpendicular = center.minus( end ).normalized().cross( center.minus( localCamera ).normalized() ).normalized();

    const bondSeparation = this.bondRadius * ( 12 / 5 );
    let offsets: Vector3[] = [];
    switch( this.bond.bondType ) {
      case 1:
        offsets = [ new Vector3( 0, 0, 0 ) ];
        break;
      case 2:
        offsets = [ perpendicular.timesScalar( bondSeparation / 2 ), perpendicular.timesScalar( -bondSeparation / 2 ) ];
        break;
      case 3:
        offsets = [ new Vector3( 0, 0, 0 ), perpendicular.timesScalar( bondSeparation ), perpendicular.timesScalar( -bondSeparation ) ];
        break;
      default:
        throw new Error( `Unsupported bond type: ${this.bond.bondType}` );
    }

    this.setTransforms( towardsEnd, center, distance, offsets );
  }

  public dispose(): void {
    this.bondGeometry.dispose();
    this.bondMaterial.dispose();
  }
}

moleculePolarity.register( 'BondView', BondView );
