// Copyright 2025, University of Colorado Boulder

/**
 * Atom mesh view wrapper for the 3D molecule view.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { RealAtom } from '../model/RealMolecule.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import moleculePolarity from '../../moleculePolarity.js';

export default class AtomView extends THREE.Object3D {
  private readonly mesh: THREE.Mesh;

  public constructor( atom: RealAtom ) {
    super();

    const sphereGeometry = new THREE.SphereGeometry( atom.getDisplayRadius(), 32, 32 );
    const atomMaterial = new THREE.MeshLambertMaterial( {
      color: ThreeUtils.colorToThree( atom.getColor() ),
      side: THREE.FrontSide
    } );
    atomMaterial.depthWrite = true;

    this.mesh = new THREE.Mesh( sphereGeometry, atomMaterial );
    this.mesh.renderOrder = 0;
    this.add( this.mesh );
  }

  public setDimmed( dimmed: boolean ): void {
    const mat = this.mesh.material as THREE.MeshLambertMaterial;
    mat.transparent = dimmed;
    mat.opacity = dimmed ? 0.5 : 1.0;
  }
}

moleculePolarity.register( 'AtomView', AtomView );