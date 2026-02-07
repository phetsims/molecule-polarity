// Copyright 2025-2026, University of Colorado Boulder

/**
 * Electrostatic potential or electron density surface mesh for a RealMolecule.
 *
 * The surface is actually rendered with two "meshes": a foreground and a background. This helps make the
 * "semi-transparent" surface easier to see, while allowing the atom and contents "inside" to be more visible.
 *
 * Notably, both the foreground and background meshes effectively render the same thing, which is the FRONT of the
 * surface ONLY. Both meshes render the front, and the background isn't rendered at all (seems to improve visual
 * understanding).
 *
 * The background is rendered as if it is "behind" everything else (even though in space coordinates it is in front).
 * This allows the background to essentially have "more" of the surface opacity rendered, WITHOUT covering up the
 * molecule. Then the foreground adds the "over the molecule" effect with a much lower opacity.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import Multilink from '../../../../axon/js/Multilink.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import Color from '../../../../scenery/js/util/Color.js';
import { SurfaceColor } from '../../common/model/SurfaceColor.js';
import { SurfaceType } from '../../common/model/SurfaceType.js';
import MPColors from '../../common/MPColors.js';
import moleculePolarity from '../../moleculePolarity.js';
import RealMolecule from '../model/RealMolecule.js';
import { colorizeElectrostaticPotentialROYGB, colorizeElectrostaticPotentialRWB, colorizeJavaElectronDensity, colorizeRealElectronDensity } from '../model/RealMoleculeColors.js';
import { SURFACE_BACKGROUND_RENDER_ORDER, SURFACE_FOREGROUND_RENDER_ORDER } from './RenderOrder.js';

// The number of subdivision steps to perform on the original geometry. Higher numbers will
// smooth the surface more, but will also increase the number of triangles (and thus reduce performance).
const SUBDIVIDE_STEPS = 2;

export default class SurfaceMesh extends THREE.Object3D {

  private readonly disposeCallbacks: ( () => void )[] = [];

  public constructor(
    molecule: RealMolecule,
    surfaceType: SurfaceType,
    surfaceColor: SurfaceColor
  ) {
    // Select the colorization based on surface type and mode.
    const toColor = surfaceType === 'electrostaticPotential'
      ? ( surfaceColor === 'rainbow' ? colorizeElectrostaticPotentialROYGB : colorizeElectrostaticPotentialRWB )
      : ( molecule.isAdvancedProperty.value ? colorizeRealElectronDensity : colorizeJavaElectronDensity );

    const meshGeometry = new THREE.BufferGeometry();

    // Read positions and normals directly from the input data
    meshGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( molecule.faces.flatMap( vertices => {
      return vertices.flatMap( vertex => vertex.getPositionArray() );
    } ) ), 3 ) );
    meshGeometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( molecule.faces.flatMap( vertices => {
      return vertices.flatMap( vertex => vertex.getNormalArray() );
    } ) ), 3 ) );

    // Read values from the model, and colorize them. Separate function so colors can be updated (based on color profile)
    const getColorBufferAttribute = () => {
      return new THREE.BufferAttribute( new Float32Array( molecule.faces.flatMap( vertices => {
        return vertices.flatMap( vertex => {
          const value = ( surfaceType === 'electrostaticPotential' ? molecule.getElectrostaticPotential( vertex ) : molecule.getElectronDensity( vertex ) );
          return toColor( value );
        } );
      } ) ), 3 );
    };
    meshGeometry.setAttribute( 'color', getColorBufferAttribute() );

    // Material for rendering "on top of the molecule"
    const foregroundMeshMaterial = new THREE.MeshBasicMaterial( {
      vertexColors: true,
      transparent: true,
      opacity: surfaceType === 'none' ? 0 : MPColors.moleculeSurfaceFrontAlphaProperty.value.alpha, // SurfaceMesh regenerated when this color changes
      depthWrite: false,
      side: THREE.FrontSide
    } );

    // Material for rendering "behind the molecule".
    const backgroundMeshMaterial = new THREE.MeshBasicMaterial( {
      vertexColors: true,
      depthWrite: false,
      side: THREE.FrontSide
    } );

    // HANDLE custom shader to blend with the background color --- since our backgroundMeshMaterial can't be transparent
    // otherwise it renders "in front" of things.
    backgroundMeshMaterial.userData.uBg = ThreeUtils.colorToThree( MPColors.screenBackgroundColorProperty.value );
    // SurfaceMesh regenerated when this color changes
    backgroundMeshMaterial.userData.uAlpha = surfaceType === 'none' ? 0 : MPColors.moleculeSurfaceBackAlphaProperty.value.alpha;
    backgroundMeshMaterial.onBeforeCompile = ( shader: THREE.Shader ) => {
      shader.uniforms.uBg = { value: backgroundMeshMaterial.userData.uBg };
      shader.uniforms.uAlpha = { value: backgroundMeshMaterial.userData.uAlpha };

      // Inject uniforms
      shader.fragmentShader =
        `
        uniform vec3 uBg;
        uniform float uAlpha;
        ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        `
        #include <opaque_fragment>
      
        // Fake "blend over background" while staying opaque for ordering.
        gl_FragColor.rgb = mix( uBg, gl_FragColor.rgb, uAlpha );
        gl_FragColor.a = 1.0;
        `
      );

      // Keep a handle so you can update uniforms later
      backgroundMeshMaterial.userData._shader = shader;
    };

    // The sherpa preload three-subdivide-1.1.3 adds this global behavior which will allow subdividing the mesh and
    // essentially interpolating its attributes (position, normal, color). This allows us
    // to get a much smoother surface that is much more visibly appealing, without having to ship a significantly larger
    // amount of molecular surface data.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error Having to use external lib like this
    const highResolutionGeometry: THREE.Geometry = window.ThreeLoopSubdivision.modify( meshGeometry, SUBDIVIDE_STEPS );

    super();

    const updateBackgroundColor = ( backgroundColor: Color ) => {
      const threeColor = ThreeUtils.colorToThree( backgroundColor );

      backgroundMeshMaterial.userData.uBg.copy( threeColor );
      if ( backgroundMeshMaterial.userData._shader ) {
        backgroundMeshMaterial.userData._shader.uniforms.uBg.value.copy( threeColor );
      }
    };
    MPColors.screenBackgroundColorProperty.lazyLink( updateBackgroundColor );
    this.disposeCallbacks.push( () => {
      MPColors.screenBackgroundColorProperty.unlink( updateBackgroundColor );
    } );

    const foregroundMesh = new THREE.Mesh( highResolutionGeometry, foregroundMeshMaterial );
    const backgroundMesh = new THREE.Mesh( highResolutionGeometry, backgroundMeshMaterial );

    foregroundMesh.renderOrder = SURFACE_FOREGROUND_RENDER_ORDER;
    backgroundMesh.renderOrder = SURFACE_BACKGROUND_RENDER_ORDER;

    // Update colors a bit more dynamically on changes
    const colorMultilink = Multilink.lazyMultilink( [
      MPColors.surfaceRWBRedProperty,
      MPColors.surfaceRWBWhiteProperty,
      MPColors.surfaceRWBBlueProperty,
      MPColors.surfaceBWBlackProperty,
      MPColors.surfaceBWWhiteProperty
    ], () => {
      // Update color buffer attribute
      meshGeometry.setAttribute( 'color', getColorBufferAttribute() );

      // Re-generate the high-resolution geometry
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error Having to use external lib like this
      const highResolutionUpdateGeometry = window.ThreeLoopSubdivision.modify( meshGeometry, SUBDIVIDE_STEPS );

      foregroundMesh.geometry.dispose();
      backgroundMesh.geometry.dispose();

      foregroundMesh.geometry = highResolutionUpdateGeometry;
      backgroundMesh.geometry = highResolutionUpdateGeometry;
    } );
    this.disposeCallbacks.push( () => colorMultilink.dispose() );

    this.add( foregroundMesh );
    this.add( backgroundMesh );

    this.disposeCallbacks.push( () => meshGeometry.dispose() );
    this.disposeCallbacks.push( () => foregroundMeshMaterial.dispose() );
  }

  public dispose(): void {
    this.disposeCallbacks.forEach( callback => callback() );
  }
}

moleculePolarity.register( 'SurfaceMesh', SurfaceMesh );
