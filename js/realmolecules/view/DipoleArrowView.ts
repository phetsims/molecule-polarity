// Copyright 2025, University of Colorado Boulder

/**
 * A dipole arrow in the 3d view
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import moleculePolarity from '../../moleculePolarity.js';
import MPColors from '../../common/MPColors.js';
import Color from '../../../../scenery/js/util/Color.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';

const headRadius = 0.1;
const bodyRadius = headRadius * 0.3;
const headLength = headRadius * 2.0;
const crossLength = bodyRadius * 0.8;
const crossRadius = headRadius;

export default class DipoleArrowView extends THREE.Object3D {
  private body: THREE.Mesh;
  private head: THREE.Mesh;
  private cross: THREE.Mesh;
  private crossAnchor: THREE.Object3D;

  public constructor(
    isBondDipole: boolean
  ) {
    super();

    const material = new THREE.MeshLambertMaterial( { color: isBondDipole ? 0x000000 : ThreeUtils.colorToThree( new Color( MPColors.MOLECULAR_DIPOLE ) ) } );

    // Will be scaled below
    const bodyGeometry = new THREE.CylinderGeometry( 1, 1, 1, 24, 1, false );
    const headGeometry = new THREE.ConeGeometry( 1, 1, 24, 1, false );
    const crossGeometry = new THREE.CylinderGeometry( 1, 1, 1, 16, 1, false );

    this.body = new THREE.Mesh( bodyGeometry, material );
    this.head = new THREE.Mesh( headGeometry, material );
    this.cross = new THREE.Mesh( crossGeometry, material );
    this.crossAnchor = new THREE.Object3D();

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

  public setFrom( origin: THREE.Vector3, direction: THREE.Vector3, totalLength: number ): void {
    const dir = direction.clone().normalize();

    const headLength = this.head.scale.y;
    const bodyLength = Math.max( 0.0001, totalLength - headLength );

    const up = new THREE.Vector3( 0, 1, 0 );
    const quat = new THREE.Quaternion().setFromUnitVectors( up, dir );
    this.quaternion.copy( quat );

    this.position.copy( origin );

    this.body.position.set( 0, bodyLength / 2, 0 );
    this.body.scale.y = bodyLength;
    this.body.updateMatrix();

    this.head.position.set( 0, bodyLength + headLength / 2, 0 );
    this.head.updateMatrix();

    this.crossAnchor.position.set( 0, 3 * crossLength, 0 );
    this.crossAnchor.updateMatrix();
  }

  /**
   * Set the cross orientation so its axis is perpendicular to both arrow direction and camera direction.
   * Provided vector is in the parent (arrow group) space.
   */
  public setCrossPerp( perpParentDir: THREE.Vector3 ): void {
    const inv = this.quaternion.clone().invert();
    const up = new THREE.Vector3( 0, 1, 0 );
    const localPerp = perpParentDir.clone().normalize().applyQuaternion( inv );
    if ( localPerp.lengthSq() > 1e-6 ) {
      this.cross.quaternion.setFromUnitVectors( up, localPerp );
    }
  }
}

moleculePolarity.register( 'DipoleArrowView', DipoleArrowView );
