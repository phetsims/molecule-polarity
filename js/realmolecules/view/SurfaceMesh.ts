// Copyright 2025-2026, University of Colorado Boulder

/**
 * Electrostatic potential or electron density surface mesh for a RealMolecule.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import RealMolecule from '../model/RealMolecule.js';
import { BACK_SURFACE_MESH_RENDER_ORDER, SURFACE_MESH_RENDER_ORDER } from './RenderOrder.js';
import moleculePolarity from '../../moleculePolarity.js';
import { colorizeElectrostaticPotentialROYGB, colorizeElectrostaticPotentialRWB, colorizeJavaElectronDensity, colorizeRealElectronDensity } from '../model/RealMoleculeColors.js';
import { SurfaceType } from '../../common/model/SurfaceType.js';
import { SurfaceColor } from '../../common/model/SurfaceColor.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import MPColors from '../../common/MPColors.js';
import Color from '../../../../scenery/js/util/Color.js';

export default class SurfaceMesh extends THREE.Object3D {

  private readonly disposeCallbacks: ( () => void )[] = [];

  public constructor(
    molecule: RealMolecule,
    surfaceType: SurfaceType,
    surfaceColor: SurfaceColor
  ) {
    const toColor = surfaceType === 'electrostaticPotential'
      ? ( surfaceColor === 'ROYGB' ? colorizeElectrostaticPotentialROYGB : colorizeElectrostaticPotentialRWB )
      : ( molecule.fieldModelProperty.value === 'psi4' ? colorizeRealElectronDensity : colorizeJavaElectronDensity );

    const meshGeometry = new THREE.BufferGeometry();
    meshGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( molecule.faces.flatMap( vertices => {
      return vertices.flatMap( vertex => vertex.getPositionArray() );
    } ) ), 3 ) );
    meshGeometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( molecule.faces.flatMap( vertices => {
      return vertices.flatMap( vertex => vertex.getNormalArray() );
    } ) ), 3 ) );
    meshGeometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( molecule.faces.flatMap( vertices => {
      return vertices.flatMap( vertex => {
        const value = ( surfaceType === 'electrostaticPotential' ? molecule.getElectrostaticPotential( vertex ) : molecule.getElectronDensity( vertex ) );
        return toColor( value );
      } );
    } ) ), 3 ) );

    const frontMeshMaterial = new THREE.MeshBasicMaterial( {
      vertexColors: true,
      transparent: true,
      opacity: surfaceType === 'none' ? 0 : 0.25,
      depthWrite: false,
      side: THREE.FrontSide
    } );

    const backMeshMaterial = new THREE.MeshBasicMaterial( {
      vertexColors: true,
      depthWrite: false,
      side: THREE.FrontSide
    } );

    // HANDLE custom shader to blend with the background color --- since our backMeshMaterial can't be transparent
    // otherwise it renders "in front" of things.
    backMeshMaterial.userData.uBg = ThreeUtils.colorToThree( MPColors.screenBackgroundColorProperty.value );
    backMeshMaterial.userData.uAlpha = surfaceType === 'none' ? 0 : 0.75; // not updated
    backMeshMaterial.onBeforeCompile = ( shader: THREE.Shader ) => {
      console.log( 'onBeforeCompile for', backMeshMaterial.uuid );
      console.log( shader.fragmentShader ); // inspect it

      shader.uniforms.uBg = { value: backMeshMaterial.userData.uBg };
      shader.uniforms.uAlpha = { value: backMeshMaterial.userData.uAlpha };

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
      backMeshMaterial.userData._shader = shader;
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error Having to use external lib like this
    const highResolutionGeometry = window.ThreeLoopSubdivision.modify( meshGeometry, 2 );

    super();

    const updateBackgroundColor = ( backgroundColor: Color ) => {
      const threeColor = ThreeUtils.colorToThree( backgroundColor );

      backMeshMaterial.userData.uBg.copy( threeColor );
      if ( backMeshMaterial.userData._shader ) {
        backMeshMaterial.userData._shader.uniforms.uBg.value.copy( threeColor );
      }
    };
    MPColors.screenBackgroundColorProperty.lazyLink( updateBackgroundColor );
    this.disposeCallbacks.push( () => {
      MPColors.screenBackgroundColorProperty.unlink( updateBackgroundColor );
    } );

    const frontMesh = new THREE.Mesh( highResolutionGeometry, frontMeshMaterial );
    const backMesh = new THREE.Mesh( highResolutionGeometry, backMeshMaterial );

    frontMesh.renderOrder = SURFACE_MESH_RENDER_ORDER;
    backMesh.renderOrder = BACK_SURFACE_MESH_RENDER_ORDER;

    this.add( frontMesh );
    this.add( backMesh );

    this.disposeCallbacks.push( () => meshGeometry.dispose() );
    this.disposeCallbacks.push( () => frontMeshMaterial.dispose() );
  }

  public dispose(): void {
    this.disposeCallbacks.forEach( callback => callback() );
  }
}

moleculePolarity.register( 'SurfaceMesh', SurfaceMesh );
