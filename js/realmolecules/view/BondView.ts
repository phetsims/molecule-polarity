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
import Color from '../../../../scenery/js/util/Color.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import MPColors from '../../common/MPColors.js';

const BOND_RADIUS = 0.085;

export default class BondView extends THREE.Object3D {
  private readonly meshes: THREE.Mesh[] = [];
  private readonly bondRadius: number;
  private readonly bond: RealBond;
  private readonly disposeCallbacks: ( () => void )[] = [];

  public constructor( bond: RealBond ) {
    super();
    this.bondRadius = BOND_RADIUS;
    this.bond = bond;

    const bondGeometry = new THREE.CylinderGeometry( 1, 1, 1, 32, 1, false );
    this.disposeCallbacks.push( () => bondGeometry.dispose() );

    const bondMaterial = new THREE.MeshLambertMaterial( {
      color: 0xffffff,
      depthTest: true,
      side: THREE.FrontSide
    } );
    this.disposeCallbacks.push( () => bondMaterial.dispose() );

    const colorListener = ( color: Color ) => {
      bondMaterial.color = ThreeUtils.colorToThree( color );
    };
    MPColors.bondProperty.link( colorListener );
    this.disposeCallbacks.push( () => MPColors.bondProperty.unlink( colorListener ) );

    if ( bond.bondType !== 1.5 ) {
      for ( let i = 0; i < bond.bondType; i++ ) {
        const mesh = new THREE.Mesh( bondGeometry, bondMaterial );
        mesh.renderOrder = BOND_RENDER_ORDER;
        this.add( mesh );
        this.meshes.push( mesh );
      }
    }
    else {
      const basicMesh = new THREE.Mesh( bondGeometry, bondMaterial );
      basicMesh.renderOrder = BOND_RENDER_ORDER;
      this.add( basicMesh );
      this.meshes.push( basicMesh );

      const dashCount = 6;

      const instancedMesh = new THREE.InstancedMesh( bondGeometry, bondMaterial, dashCount );
      instancedMesh.renderOrder = BOND_RENDER_ORDER;
      this.add( instancedMesh );
      this.meshes.push( instancedMesh );

      for ( let i = 0; i < dashCount; i++ ) {
        const m = new THREE.Matrix4();
        const y = ( -0.5 + ( i + 0.5 ) / dashCount ) * 0.87;
        const sy = 0.55 / dashCount;

        m.set(
          1, 0, 0, 0,
          0, sy, 0, y,
          0, 0, 1, 0,
          0, 0, 0, 1
        );

        instancedMesh.setMatrixAt( i, m );
      }

      instancedMesh.instanceMatrix.needsUpdate = true;
    }
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

    if ( this.bond.bondType === 1.5 && perpendicular.dot( this.bond.realMolecularDipole ) < 0 ) {
      perpendicular.negate();
    }

    const bondSeparation = this.bondRadius * ( 12 / 5 );
    let offsets: Vector3[] = [];
    switch( this.bond.bondType ) {
      case 1:
        offsets = [ new Vector3( 0, 0, 0 ) ];
        break;
      case 1.5:
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
    this.disposeCallbacks.forEach( callback => callback() );
  }
}

moleculePolarity.register( 'BondView', BondView );
