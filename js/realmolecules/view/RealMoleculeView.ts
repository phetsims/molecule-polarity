// Copyright 2025, University of Colorado Boulder

/**
 * 3D view of the molecule.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import RealMolecule from '../model/RealMolecule.js';
import moleculePolarity from '../../moleculePolarity.js';

export default class RealMoleculeView extends THREE.Object3D {
  public constructor(
    moleculeProperty: TReadOnlyProperty<RealMolecule>,
    moleculeQuaternionProperty: TReadOnlyProperty<THREE.Quaternion>
  ) {
    super();

    const cubeGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    const cubeMaterial = new THREE.MeshLambertMaterial( {
      color: 0xFF0000
    } );

    // Create a mesh with the geometry and material
    const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial );
    this.add( cubeMesh );

    moleculeQuaternionProperty.link( quaternion => {
      this.quaternion.copy( quaternion );
      this.updateMatrix();
      this.updateMatrixWorld();
    } );
  }

  /**
   * Disposes this view, so that its components can be reused for new molecules.
   */
  public dispose(): void {
    // Will fill in disposal
  }
}

moleculePolarity.register( 'RealMoleculeView', RealMoleculeView );