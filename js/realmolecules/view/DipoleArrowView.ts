// Copyright 2025-2026, University of Colorado Boulder

/**
 * A dipole arrow in the 3d view
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import moleculePolarity from '../../moleculePolarity.js';
import MPColors from '../../common/MPColors.js';
import Color from '../../../../scenery/js/util/Color.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import { DIPOLE_RENDER_ORDER } from './RenderOrder.js';

const bodyRadius = 0.03;
const headRadius = 0.1;
const headLength = headRadius * 2.5;
const crossLength = bodyRadius * 2;
const crossRadius = headRadius;

export default class DipoleArrowView extends THREE.Object3D {
  // The main cylinder of the arrow
  private readonly body: THREE.Mesh;

  // The cone-shaped head
  private readonly head: THREE.Mesh;

  // Dipole arrows have a cross near the tail to indicate direction, this is the cylinder for that cross
  private readonly cross: THREE.Mesh;

  // Helps position the cross at a fixed distance from the tail, and rotate it to be perpendicular to the arrow direction
  private readonly crossAnchor: THREE.Object3D;

  private readonly disposeCallbacks: ( () => void )[] = [];

  public constructor(
    isBondDipole: boolean
  ) {
    super();

    const colorProperty = isBondDipole ? MPColors.bondDipoleProperty : MPColors.molecularDipoleProperty;

    const material = new THREE.MeshLambertMaterial( {
      // depthWrite: true for molecular dipole arrows, see https://github.com/phetsims/molecule-polarity/issues/265
      depthWrite: !isBondDipole
    } );
    this.disposeCallbacks.push( () => material.dispose() );

    // Color listener
    const colorListener = ( color: Color ) => {
      material.color = ThreeUtils.colorToThree( color );
    };
    colorProperty.link( colorListener );
    this.disposeCallbacks.push( () => colorProperty.unlink( colorListener ) );

    // Will be scaled below, so we'll use unit dimensions to make things easy.
    const bodyGeometry = new THREE.CylinderGeometry( 1, 1, 1, 24, 1, false );
    this.disposeCallbacks.push( () => bodyGeometry.dispose() );
    const headGeometry = new THREE.ConeGeometry( 1, 1, 24, 1, false );
    this.disposeCallbacks.push( () => headGeometry.dispose() );
    const crossGeometry = new THREE.CylinderGeometry( 1, 1, 1, 16, 1, false );
    this.disposeCallbacks.push( () => crossGeometry.dispose() );

    this.body = new THREE.Mesh( bodyGeometry, material );
    this.head = new THREE.Mesh( headGeometry, material );
    this.cross = new THREE.Mesh( crossGeometry, material );
    this.crossAnchor = new THREE.Object3D();

    this.body.renderOrder = DIPOLE_RENDER_ORDER;
    this.head.renderOrder = DIPOLE_RENDER_ORDER;
    this.cross.renderOrder = DIPOLE_RENDER_ORDER;

    this.body.scale.x = this.body.scale.z = bodyRadius;
    this.head.scale.x = this.head.scale.z = headRadius;
    this.head.scale.y = headLength;

    this.cross.scale.x = crossRadius * ( isBondDipole ? 1 : 0.7 );
    this.cross.scale.z = crossRadius * ( isBondDipole ? 1 : 0.7 );
    this.cross.scale.y = crossLength;

    this.crossAnchor.add( this.cross );

    this.add( this.body );
    this.add( this.head );
    this.add( this.crossAnchor );
  }

  /**
   * Set the position and orientation of the arrow based on the provided origin, direction, and total length.
   */
  public setArrowProperties( origin: Vector3, direction: Vector3, totalLength: number ): void {
    const originThree = ThreeUtils.vectorToThree( origin );
    const dir = ThreeUtils.vectorToThree( direction ).normalize();

    const headLength = this.head.scale.y;

    // Don't allow a zero-length arrow
    const bodyLength = Math.max( 0.0001, totalLength - headLength );

    const up = new THREE.Vector3( 0, 1, 0 );
    const quat = new THREE.Quaternion().setFromUnitVectors( up, dir );
    this.quaternion.copy( quat );

    this.position.copy( originThree );

    this.body.position.set( 0, bodyLength / 2, 0 );
    this.body.scale.y = bodyLength;
    this.body.updateMatrix();

    this.head.position.set( 0, bodyLength + headLength / 2, 0 );
    this.head.updateMatrix();

    this.crossAnchor.position.set( 0, 2.5 * crossLength, 0 );
    this.crossAnchor.updateMatrix();
  }

  /**
   * Set the cross orientation so its axis is perpendicular to both arrow direction and camera direction.
   * Provided vector is in the parent (arrow group) space.
   *
   * This is done for bond dipoles to make the cross easier to read (since they are shaded pure black)
   */
  public setCrossPerp( perpParentDir: Vector3 ): void {
    const inv = this.quaternion.clone().invert();
    const up = new THREE.Vector3( 0, 1, 0 );
    const localPerp = ThreeUtils.vectorToThree( perpParentDir ).normalize().applyQuaternion( inv );
    if ( localPerp.lengthSq() > 1e-6 ) {
      this.cross.quaternion.setFromUnitVectors( up, localPerp );
    }
  }

  public dispose(): void {
    this.disposeCallbacks.forEach( callback => callback() );
  }
}

moleculePolarity.register( 'DipoleArrowView', DipoleArrowView );
