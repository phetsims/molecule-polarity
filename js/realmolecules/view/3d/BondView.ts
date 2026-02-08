// Copyright 2025-2026, University of Colorado Boulder

/**
 * Bond mesh view wrapper (handles single/double/triple cylinders, or the 1.5 semi-dashed bonds) for the 3D molecule view.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Vector3 from '../../../../../dot/js/Vector3.js';
import { BOND_RENDER_ORDER } from './RenderOrder.js';
import moleculePolarity from '../../../moleculePolarity.js';
import Color from '../../../../../scenery/js/util/Color.js';
import ThreeUtils from '../../../../../mobius/js/ThreeUtils.js';
import MPColors from '../../../common/MPColors.js';
import { RealBond } from '../../model/RealBond.js';

const BOND_RADIUS = 0.085;
const BOND_SEPARATION = BOND_RADIUS * ( 12 / 5 );

export default class BondView extends THREE.Object3D {

  // The THREE.Mesh objects for the bond cylinders, could be 1, 2, or 3 for normal bonds, or 1 + an InstancedMesh for 1.5 bonds.
  private readonly meshes: THREE.Mesh[] = [];

  private readonly disposeCallbacks: ( () => void )[] = [];

  public constructor( private readonly bond: RealBond ) {
    super();

    // Unit dimensions, so it is easy to scale and position
    const bondGeometry = new THREE.CylinderGeometry( 1, 1, 1, 32, 1, false );
    this.disposeCallbacks.push( () => bondGeometry.dispose() );

    const bondMaterial = new THREE.MeshLambertMaterial( {
      depthTest: true,
      side: THREE.FrontSide
    } );
    this.disposeCallbacks.push( () => bondMaterial.dispose() );

    // Keep the color udpated
    const colorListener = ( color: Color ) => {
      bondMaterial.color = ThreeUtils.colorToThree( color );
    };
    MPColors.bondProperty.link( colorListener );
    this.disposeCallbacks.push( () => MPColors.bondProperty.unlink( colorListener ) );

    // Add meshes to position according to the bond type.
    if ( bond.bondType !== 1.5 ) {
      for ( let i = 0; i < bond.bondType; i++ ) {
        const mesh = new THREE.Mesh( bondGeometry, bondMaterial );
        mesh.renderOrder = BOND_RENDER_ORDER;
        this.add( mesh );
        this.meshes.push( mesh );
      }
    }
    else {
      // for 1.5 bonds, we have a single basic mesh and an instanced mesh with 6 dashes to indicate (half bond)

      const basicMesh = new THREE.Mesh( bondGeometry, bondMaterial );
      basicMesh.renderOrder = BOND_RENDER_ORDER;
      this.add( basicMesh );
      this.meshes.push( basicMesh );

      const dashCount = 6;

      const instancedMesh = new THREE.InstancedMesh( bondGeometry, bondMaterial, dashCount );
      instancedMesh.renderOrder = BOND_RENDER_ORDER;
      this.add( instancedMesh );
      this.meshes.push( instancedMesh );

      // Spacing and properties manually tweaked for best visual appearance for ozone
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

  /**
   * Sets the transforms for the bond meshes based on the bond direction, center, distance, and offsets for multiple bonds.
   */
  private setTransforms( towardsEnd: Vector3, center: Vector3, distance: number, offsets: Vector3[] ): void {
    const threeYUnit = new THREE.Vector3( 0, 1, 0 );
    const threeTowardsEnd = new THREE.Vector3( towardsEnd.x, towardsEnd.y, towardsEnd.z );
    for ( let i = 0; i < this.meshes.length; i++ ) {
      const mesh = this.meshes[ i ];
      const translation = center.plus( offsets[ i ] );
      mesh.position.set( translation.x, translation.y, translation.z );
      mesh.quaternion.setFromUnitVectors( threeYUnit, threeTowardsEnd );
      mesh.scale.x = mesh.scale.z = BOND_RADIUS;
      mesh.scale.y = distance;
      mesh.updateMatrix();
    }
  }

  /**
   * Sets the bond to be dimmed (lower opacity) or not, used for when molecular dipoles need to be visible through the bond
   */
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
  public update( localCamera: Vector3 ): void {
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

    let offsets: Vector3[] = [];
    switch( this.bond.bondType ) {
      case 1:
        offsets = [ new Vector3( 0, 0, 0 ) ];
        break;
      case 1.5:
      case 2:
        offsets = [ perpendicular.timesScalar( BOND_SEPARATION / 2 ), perpendicular.timesScalar( -BOND_SEPARATION / 2 ) ];
        break;
      case 3:
        offsets = [ new Vector3( 0, 0, 0 ), perpendicular.timesScalar( BOND_SEPARATION ), perpendicular.timesScalar( -BOND_SEPARATION ) ];
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
