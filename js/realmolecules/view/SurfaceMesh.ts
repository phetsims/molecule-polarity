// Copyright 2025, University of Colorado Boulder

/**
 * Electrostatic potential or electron density surface mesh for a RealMolecule.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import RealMolecule from '../model/RealMolecule.js';
import { SURFACE_MESH_RENDER_ORDER } from './RenderOrder.js';
import moleculePolarity from '../../moleculePolarity.js';
import { colorizeElectrostaticPotentialROYGB, colorizeElectrostaticPotentialRWB, colorizeJavaElectronDensity, colorizeRealElectronDensity } from '../model/RealMoleculeColors.js';
import { SurfaceType } from '../../common/model/SurfaceType.js';
import { SurfaceColor } from '../../common/model/SurfaceColor.js';

export default class SurfaceMesh extends THREE.Mesh {

  private meshGeometry: THREE.BufferGeometry;
  private meshMaterial: THREE.MeshBasicMaterial;

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

    const meshMaterial = new THREE.MeshBasicMaterial( {
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      side: THREE.FrontSide
    } );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error Having to use external lib like this
    super( window.ThreeLoopSubdivision.modify( meshGeometry, 2 ), meshMaterial );

    this.renderOrder = SURFACE_MESH_RENDER_ORDER;
    this.meshGeometry = meshGeometry;
    this.meshMaterial = meshMaterial;
  }

  public dispose(): void {
    this.meshGeometry.dispose();
    this.meshMaterial.dispose();
  }
}

moleculePolarity.register( 'SurfaceMesh', SurfaceMesh );
