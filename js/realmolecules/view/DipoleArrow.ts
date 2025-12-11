// Copyright 2025, University of Colorado Boulder

/**
 * A dipole arrow
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import moleculePolarity from '../../moleculePolarity.js';

export type DipoleArrowOptions = {
  color: THREE.Color;
};

const headRadius = 0.1;
const bodyRadius = headRadius * 0.4;
const headLength = headRadius * 2.0;
const crossLength = headLength * 0.4;
const crossRadius = headRadius;

export default class DipoleArrow extends THREE.Object3D {
  private body: THREE.Mesh;
  private head: THREE.Mesh;
  private cross: THREE.Mesh;

  public constructor( options: DipoleArrowOptions ) {
    super();

    const material = new THREE.MeshLambertMaterial( { color: options.color } );

    // Will be scaled below
    const bodyGeometry = new THREE.CylinderGeometry( 1, 1, 1, 24, 1, false );
    const headGeometry = new THREE.ConeGeometry( 1, 1, 24, 1, false );
    const crossGeometry = new THREE.CylinderGeometry( 1, 1, 1, 16, 1, false );

    this.body = new THREE.Mesh( bodyGeometry, material );
    this.head = new THREE.Mesh( headGeometry, material );
    this.cross = new THREE.Mesh( crossGeometry, material );

    this.body.scale.x = this.body.scale.z = bodyRadius;
    this.head.scale.x = this.head.scale.z = headRadius;
    this.head.scale.y = headLength;

    this.cross.scale.x = crossRadius;
    this.cross.scale.z = crossRadius;
    this.cross.scale.y = crossLength;

    this.add( this.body );
    this.add( this.head );
    this.add( this.cross );
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

    this.cross.position.set( 0, 2.5 * crossLength, 0 );
    this.cross.updateMatrix();
  }
}

moleculePolarity.register( 'DipoleArrow', DipoleArrow );
