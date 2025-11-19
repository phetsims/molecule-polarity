// Copyright 2025, University of Colorado Boulder

/**
 * 3D view of the molecule.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import RealMolecule from '../model/RealMolecule.js';
import moleculePolarity from '../../moleculePolarity.js';
import { RealMoleculeData } from '../model/RealMoleculeData.js';
import Element from '../../../../nitroglycerin/js/Element.js';
import Color from '../../../../scenery/js/util/Color.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import { clamp } from '../../../../dot/js/util/clamp.js';

export default class RealMoleculeView extends THREE.Object3D {
  public constructor(
    moleculeProperty: TReadOnlyProperty<RealMolecule>,
    moleculeQuaternionProperty: TReadOnlyProperty<THREE.Quaternion>
  ) {
    super();

    moleculeProperty.link( molecule => {
      const strippedSymbol = molecule.symbol.replace( /<\/?sub>/g, '' );
      const moleculeData = RealMoleculeData[ strippedSymbol ];

      while ( this.children.length > 0 ) {
        this.remove( this.children[ 0 ] );
      }

      for ( const atom of moleculeData.atoms ) {
        const element = Element.getElementBySymbol( atom.symbol );

        const vanDerWallsRadiusInAngstroms = element.vanDerWaalsRadius / 100;
        const threeColor = ThreeUtils.colorToThree( Color.toColor( element.color ) );

        const sphereGeometry = new THREE.SphereGeometry( 0.2 * vanDerWallsRadiusInAngstroms, 32, 32 );
        const atomMaterial = new THREE.MeshLambertMaterial( {
          color: threeColor
        } );

        const cubeMesh = new THREE.Mesh( sphereGeometry, atomMaterial );
        cubeMesh.position.set( atom.x, atom.y, atom.z );
        this.add( cubeMesh );
      }

      {
        // https://github.com/stevinz/three-subdivide
        // https://github.com/stevinz/three-wboit
        // Shader-material might work + render targets --- ASK about background and what is desired!

        const meshGeometry = new THREE.BufferGeometry();
        meshGeometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( moleculeData.faceIndices.flatMap( indices => {
          const vertex0Data = moleculeData.vertexPositions[ indices[ 0 ] ];
          const vertex1Data = moleculeData.vertexPositions[ indices[ 1 ] ];
          const vertex2Data = moleculeData.vertexPositions[ indices[ 2 ] ];

          return [
            ...vertex0Data,
            ...vertex1Data,
            ...vertex2Data
          ];
        } ) ), 3 ) );
        meshGeometry.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( moleculeData.faceIndices.flatMap( indices => {
          const vertex0Data = moleculeData.vertexNormals[ indices[ 0 ] ];
          const vertex1Data = moleculeData.vertexNormals[ indices[ 1 ] ];
          const vertex2Data = moleculeData.vertexNormals[ indices[ 2 ] ];

          return [
            ...vertex0Data,
            ...vertex1Data,
            ...vertex2Data
          ];
        } ) ), 3 ) );
        meshGeometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( moleculeData.faceIndices.flatMap( indices => {
          const v0 = moleculeData.vertexESPs[ indices[ 0 ] ];
          const v1 = moleculeData.vertexESPs[ indices[ 1 ] ];
          const v2 = moleculeData.vertexESPs[ indices[ 2 ] ];

          return [
            clamp( v0 + 0.5, 0, 1 ), 0, 0,
            clamp( v1 + 0.5, 0, 1 ), 0, 0,
            clamp( v2 + 0.5, 0, 1 ), 0, 0
          ];
        } ) ), 3 ) );

        const meshMaterial = new THREE.MeshBasicMaterial( {
          vertexColors: true,
          // color: 0x888888
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
          side: THREE.DoubleSide
        } );

        const mesh = new THREE.Mesh( meshGeometry, meshMaterial );
        this.add( mesh );
      }
    } );


    moleculeQuaternionProperty.link( quaternion => {
      this.quaternion.copy( quaternion );
      this.updateMatrix();
      this.updateMatrixWorld();
    } );
  }

  /**
   * Disposes this view, so that its components can be reused for new molecules.
   */
  public dispose(): void {
    // Will fill in disposal
  }
}

moleculePolarity.register( 'RealMoleculeView', RealMoleculeView );