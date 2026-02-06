// Copyright 2026, University of Colorado Boulder

/**
 * A THREE.js Pass which is effectively a simplified RenderPass that just renders the atom labels. This is done by
 * setting the layers of the atom labels AND this custom duplicate camera to a specific layer, so that it renders
 * nothing else in the scene (and the atom labels aren't rendered in the normal RenderPass).
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import moleculePolarity from '../../moleculePolarity.js';

export const ATOM_LABEL_LAYER = 1;

export default class AtomLabelRenderPass extends window.ThreePass {
  public constructor( public scene: THREE.Scene, public camera: THREE.Camera ) {
    super();

    // We write directly into the "read" buffer, so we don't need to swap buffers after this pass.
    this.needsSwap = false;
  }

  public override render( renderer: THREE.WebGLRenderer, writeBuffer: THREE.WebGLRenderTarget, readBuffer: THREE.WebGLRenderTarget ): void {
    const oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;

    renderer.setRenderTarget( this.renderToScreen ? null : readBuffer );

    // Clone the camera, and adjust its layers so that it only renders the atom labels.
    // The atom labels are on a separate layer so that they aren't rendered in the normal RenderPass.
    const customCamera = this.camera.clone();
    customCamera.layers.set( ATOM_LABEL_LAYER );

    renderer.render( this.scene, customCamera );

    renderer.autoClear = oldAutoClear;
  }

  public override setSize( width: number, height: number ): void {
    // no-op
  }

  public override dispose(): void {
    // no-op
  }
}

moleculePolarity.register( 'AtomLabelRenderPass', AtomLabelRenderPass );