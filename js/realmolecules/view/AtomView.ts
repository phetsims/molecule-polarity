// Copyright 2025-2026, University of Colorado Boulder

/**
 * Atom mesh view wrapper for the 3D molecule view.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import { ATOM_RENDER_ORDER } from './RenderOrder.js';
import moleculePolarity from '../../moleculePolarity.js';
import Color from '../../../../scenery/js/util/Color.js';
import { RealAtom } from '../model/RealAtom.js';

export default class AtomView extends THREE.Object3D {
  private readonly material: THREE.MeshLambertMaterial;

  private readonly disposeCallbacks: ( () => void )[] = [];

  public constructor( atom: RealAtom ) {
    super();

    const sphereGeometry = new THREE.SphereGeometry( atom.getDisplayRadius(), 32, 32 );
    this.disposeCallbacks.push( () => sphereGeometry.dispose() );

    const atomMaterial = new THREE.MeshLambertMaterial( {
      side: THREE.FrontSide,
      depthWrite: true
    } );
    this.material = atomMaterial;
    this.disposeCallbacks.push( () => atomMaterial.dispose() );

    // Update the color when the atom's color property changes
    const atomColorProperty = atom.getColorProperty();
    const colorListener = ( color: Color ) => {
      atomMaterial.color = ThreeUtils.colorToThree( color );
    };
    atomColorProperty.link( colorListener );
    this.disposeCallbacks.push( () => atomColorProperty.unlink( colorListener ) );

    const mesh = new THREE.Mesh( sphereGeometry, atomMaterial );
    mesh.renderOrder = ATOM_RENDER_ORDER;
    this.add( mesh );

    // Position at the atom's location
    this.position.set( atom.position.x, atom.position.y, atom.position.z );
  }

  /**
   * Sets the atom to be dimmed (lower opacity) or not, used for when molecular dipoles need to be visible through the atom
   */
  public setDimmed( dimmed: boolean ): void {
    this.material.transparent = dimmed;
    this.material.opacity = dimmed ? 0.5 : 1.0;
  }

  public dispose(): void {
    this.disposeCallbacks.forEach( callback => callback() );
  }
}

moleculePolarity.register( 'AtomView', AtomView );
