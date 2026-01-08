// Copyright 2025-2026, University of Colorado Boulder

/**
 * Atom mesh view wrapper for the 3D molecule view.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { RealAtom } from '../model/RealMolecule.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import { ATOM_RENDER_ORDER } from './RenderOrder.js';
import moleculePolarity from '../../moleculePolarity.js';
import Color from '../../../../scenery/js/util/Color.js';

export default class AtomView extends THREE.Object3D {
  private readonly mesh: THREE.Mesh;
  private readonly disposeCallbacks: ( () => void )[] = [];

  public constructor( atom: RealAtom ) {
    super();

    const sphereGeometry = new THREE.SphereGeometry( atom.getDisplayRadius(), 32, 32 );
    this.disposeCallbacks.push( () => sphereGeometry.dispose() );

    const atomMaterial = new THREE.MeshLambertMaterial( {
      side: THREE.FrontSide
    } );
    this.disposeCallbacks.push( () => atomMaterial.dispose() );

    const atomColorProperty = atom.getColorProperty();
    const colorListener = ( color: Color ) => {
      atomMaterial.color = ThreeUtils.colorToThree( color );
    };
    atomColorProperty.link( colorListener );
    this.disposeCallbacks.push( () => atomColorProperty.unlink( colorListener ) );

    atomMaterial.depthWrite = true;

    this.mesh = new THREE.Mesh( sphereGeometry, atomMaterial );
    this.mesh.renderOrder = ATOM_RENDER_ORDER;
    this.add( this.mesh );

    // Position at the atom's location
    this.position.set( atom.position.x, atom.position.y, atom.position.z );
  }

  public setDimmed( dimmed: boolean ): void {
    const mat = this.mesh.material as THREE.MeshLambertMaterial;
    mat.transparent = dimmed;
    mat.opacity = dimmed ? 0.5 : 1.0;
  }

  public dispose(): void {
    this.disposeCallbacks.forEach( callback => callback() );
  }
}

moleculePolarity.register( 'AtomView', AtomView );
