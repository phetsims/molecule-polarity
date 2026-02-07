// Copyright 2026, University of Colorado Boulder

/**
 * A custom pass that composites the rendered scene over a solid background color,
 * to handle the case where we want to have correct alpha compositing over a non-transparent background.
 *
 * This is required because we (a) need to apply the outline pass BEFORE compositing over the background.
 *
 * NOTE: It is incredibly important that we don't muck up the depth buffer, since the passes that come after will
 * need that data. Thus the implementation of this class essentially "copies" things from the read to write buffer,
 * then writes into the read buffer (color), so that the depth buffer data still lives undisturbed in the read buffer
 * for the passes that come after. This order is intentional and should not be rearranged.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import moleculePolarity from '../../moleculePolarity.js';

export default class BackgroundCompositePass extends window.ThreePass {

  // uniforms for the RawShaderMaterials
  private readonly uniforms: {
    tDiffuse: { value: THREE.Texture | null };
    uBg: { value: THREE.Vector3 };
  };
  private readonly copyUniforms: {
    tDiffuse: { value: THREE.Texture | null };
    opacity: { value: number };
  };

  // The actual materials
  private readonly material: THREE.RawShaderMaterial;
  private readonly copyMaterial: THREE.RawShaderMaterial;

  // Quads that will be used to render over the full screen.
  private readonly fullscreenQuad: InstanceType<typeof window.ThreeFullScreenQuad>;
  private readonly fullscreenQuadCopy: InstanceType<typeof window.ThreeFullScreenQuad>;

  public constructor( private backgroundColor: THREE.Color ) {
    super();

    this.uniforms = {
      tDiffuse: { value: null },
      uBg: {
        value: new THREE.Vector3(
          this.backgroundColor.r,
          this.backgroundColor.g,
          this.backgroundColor.b
        )
      }
    };
    this.copyUniforms = {
      tDiffuse: { value: null },
      opacity: { value: 1.0 }
    };

    this.material = new THREE.RawShaderMaterial( {
      uniforms: this.uniforms,
      vertexShader: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform sampler2D tDiffuse;
        uniform vec3 uBg;
        varying vec2 vUv;

        void main() {
          vec4 src = texture2D(tDiffuse, vUv);
          vec3 rgb = mix(uBg, src.rgb, src.a);
          gl_FragColor = vec4(rgb, 1.0);
        }
      `,
      depthTest: false,
      depthWrite: false
    } );

    this.copyMaterial = new THREE.ShaderMaterial( {
      uniforms: this.copyUniforms,

      // eslint-disable-next-line no-undef
      vertexShader: ThreeCopyShader.vertexShader,

      // eslint-disable-next-line no-undef
      fragmentShader: ThreeCopyShader.fragmentShader,
      blending: THREE.NoBlending,
      depthTest: false,
      depthWrite: false
    } );

    this.fullscreenQuad = new window.ThreeFullScreenQuad( this.material );
    this.fullscreenQuadCopy = new window.ThreeFullScreenQuad( this.copyMaterial );

    this.needsSwap = false;
  }

  public setBackgroundColor( color: THREE.Color ): void {
    this.backgroundColor.copy( color );
    this.uniforms.uBg.value.set( color.r, color.g, color.b );
  }

  public override render( renderer: THREE.WebGLRenderer, writeBuffer: THREE.WebGLRenderTarget, readBuffer: THREE.WebGLRenderTarget ): void {
    const oldAutoClear = renderer.autoClear;
    renderer.autoClear = false;

    // First copy things over from readBuffer to writeBuffer (just color)
    {
      this.copyUniforms.tDiffuse.value = readBuffer.texture;

      renderer.setRenderTarget( this.renderToScreen ? null : writeBuffer );

      this.fullscreenQuadCopy.render( renderer );
    }

    // Then write into the readBuffer (preserving depth buffer contents for later passes)
    {
      this.uniforms.tDiffuse.value = writeBuffer.texture;

      renderer.setRenderTarget( this.renderToScreen ? null : readBuffer );
      this.fullscreenQuad.render( renderer );
    }

    renderer.autoClear = oldAutoClear;
  }

  public override dispose(): void {
    this.material.dispose();
    this.copyMaterial.dispose();
    this.fullscreenQuad.dispose();
    this.fullscreenQuadCopy.dispose();
  }
}

moleculePolarity.register( 'BackgroundCompositePass', BackgroundCompositePass );
