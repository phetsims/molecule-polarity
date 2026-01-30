// Copyright 2026, University of Colorado Boulder

/**
 * Type definitions for everything in three-r160-addon-outlinepass.js, so we can use it in properly-typed ways in the
 * sim code.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare global {
  interface ThreeExampleShader {
    name?: string;
    defines?: Record<string, unknown>;
    uniforms: Record<string, THREE.IUniform>;
    vertexShader: string;
    fragmentShader: string;
  }

  class ThreePass {
    public isPass: true;

    public enabled: boolean;
    public needsSwap: boolean;
    public clear: boolean;
    public renderToScreen: boolean;

    public constructor();

    public setSize( width: number, height: number ): void;

    public render(
      renderer: THREE.WebGLRenderer,
      writeBuffer: THREE.WebGLRenderTarget,
      readBuffer: THREE.WebGLRenderTarget,
      deltaTime?: number,
      maskActive?: boolean
    ): void;

    public dispose(): void;
  }

  class ThreeFullScreenQuad {
    public constructor( material: THREE.Material | null );

    public dispose(): void;

    public render( renderer: THREE.WebGLRenderer ): void;

    public get material(): THREE.Material | THREE.Material[];
    public set material( value: THREE.Material | THREE.Material[] );
  }

  const ThreeCopyShader: ThreeExampleShader;

  class ThreeOutlinePass extends ThreePass {
    public static BlurDirectionX: THREE.Vector2;
    public static BlurDirectionY: THREE.Vector2;

    public constructor(
      resolution: THREE.Vector2,
      scene: THREE.Scene,
      camera: THREE.Camera,
      selectedObjects?: THREE.Object3D[]
    );

    public renderScene: THREE.Scene;
    public renderCamera: THREE.Camera;
    public selectedObjects: THREE.Object3D[];

    public visibleEdgeColor: THREE.Color;
    public hiddenEdgeColor: THREE.Color;

    public edgeGlow: number;
    public usePatternTexture: boolean;
    public edgeThickness: number;
    public edgeStrength: number;
    public downSampleRatio: number;
    public pulsePeriod: number;

    public patternTexture?: THREE.Texture;

    public setSize( width: number, height: number ): void;
    public dispose(): void;
  }

  class ThreeEffectComposer {
    public renderer: THREE.WebGLRenderer;

    public renderTarget1: THREE.WebGLRenderTarget;
    public renderTarget2: THREE.WebGLRenderTarget;

    public writeBuffer: THREE.WebGLRenderTarget;
    public readBuffer: THREE.WebGLRenderTarget;

    public renderToScreen: boolean;

    public passes: ThreePass[];

    public copyPass: unknown;
    public clock: THREE.Clock;

    public constructor( renderer: THREE.WebGLRenderer, renderTarget?: THREE.WebGLRenderTarget );

    public swapBuffers(): void;
    public addPass( pass: ThreePass ): void;
    public insertPass( pass: ThreePass, index: number ): void;
    public removePass( pass: ThreePass ): void;

    public isLastEnabledPass( passIndex: number ): boolean;

    public render( deltaTime?: number ): void;

    public reset( renderTarget?: THREE.WebGLRenderTarget ): void;
    public setSize( width: number, height: number ): void;
    public setPixelRatio( pixelRatio: number ): void;

    public dispose(): void;
  }

  class ThreeRenderPass extends ThreePass {
    public scene: THREE.Scene;
    public camera: THREE.Camera;

    public overrideMaterial: THREE.Material | null;
    public clearColor: THREE.ColorRepresentation | null;
    public clearAlpha: number | null;

    public clearDepth: boolean;

    public constructor(
      scene: THREE.Scene,
      camera: THREE.Camera,
      overrideMaterial?: THREE.Material | null,
      clearColor?: THREE.ColorRepresentation | null,
      clearAlpha?: number | null
    );

    public render(
      renderer: THREE.WebGLRenderer,
      writeBuffer: THREE.WebGLRenderTarget,
      readBuffer: THREE.WebGLRenderTarget,
      deltaTime?: number,
      maskActive?: boolean
    ): void;
  }

  class ThreeOutputPass extends ThreePass {
    public uniforms: Record<string, THREE.IUniform>;
    public material: THREE.RawShaderMaterial;

    public constructor();

    public dispose(): void;
  }

  class ThreeSSAARenderPass extends ThreePass {
    public scene: THREE.Scene;
    public camera: THREE.Camera;

    public sampleLevel: number;
    public unbiased: boolean;

    public clearColor: THREE.ColorRepresentation;
    public clearAlpha: number;

    public constructor(
      scene: THREE.Scene,
      camera: THREE.Camera,
      clearColor?: THREE.ColorRepresentation,
      clearAlpha?: number
    );

    public setSize( width: number, height: number ): void;

    public render(
      renderer: THREE.WebGLRenderer,
      writeBuffer: THREE.WebGLRenderTarget,
      readBuffer: THREE.WebGLRenderTarget
    ): void;

    public dispose(): void;
  }

  interface Window {
    ThreePass: typeof ThreePass;
    ThreeFullScreenQuad: typeof ThreeFullScreenQuad;
    ThreeCopyShader: typeof ThreeCopyShader;

    ThreeOutlinePass: typeof ThreeOutlinePass;
    ThreeEffectComposer: typeof ThreeEffectComposer;
    ThreeRenderPass: typeof ThreeRenderPass;
    ThreeOutputPass: typeof ThreeOutputPass;
    ThreeSSAARenderPass: typeof ThreeSSAARenderPass;
  }
}

export {};