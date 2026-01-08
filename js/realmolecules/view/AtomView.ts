// Copyright 2025, University of Colorado Boulder

/**
 * Atom mesh view wrapper for the 3D molecule view.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { RealAtom } from '../model/RealMolecule.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import { ATOM_RENDER_ORDER } from './RenderOrder.js';
import moleculePolarity from '../../moleculePolarity.js';

export default class AtomView extends THREE.Object3D {
  private readonly mesh: THREE.Mesh;
  private readonly sphereGeometry: THREE.SphereGeometry;
  private readonly atomMaterial: THREE.MeshLambertMaterial;

  public constructor( atom: RealAtom ) {
    super();

    const sphereGeometry = new THREE.SphereGeometry( atom.getDisplayRadius(), 32, 32 );
    const atomMaterial = new THREE.MeshLambertMaterial( {
      color: ThreeUtils.colorToThree( atom.getColor() ),
      side: THREE.FrontSide
    } );
    atomMaterial.depthWrite = true;

    this.mesh = new THREE.Mesh( sphereGeometry, atomMaterial );
    this.mesh.renderOrder = ATOM_RENDER_ORDER;
    this.add( this.mesh );

    // Position at the atom's location
    this.position.set( atom.position.x, atom.position.y, atom.position.z );

    this.sphereGeometry = sphereGeometry;
    this.atomMaterial = atomMaterial;
  }

  public setDimmed( dimmed: boolean ): void {
    const mat = this.mesh.material as THREE.MeshLambertMaterial;
    mat.transparent = dimmed;
    mat.opacity = dimmed ? 0.5 : 1.0;
  }

  public dispose(): void {
    this.sphereGeometry.dispose();
    this.atomMaterial.dispose();
  }
}

moleculePolarity.register( 'AtomView', AtomView );
