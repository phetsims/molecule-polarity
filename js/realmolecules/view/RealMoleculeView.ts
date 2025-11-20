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
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Vector3 from '../../../../dot/js/Vector3.js';

export default class RealMoleculeView extends THREE.Object3D {
  public constructor(
    moleculeProperty: TReadOnlyProperty<RealMolecule>,
    moleculeQuaternionProperty: TReadOnlyProperty<THREE.Quaternion>,
    viewProperties: RealMoleculesViewProperties
  ) {
    super();

    Multilink.multilink( [ moleculeProperty, viewProperties.surfaceTypeProperty ], ( molecule, surfaceType ) => {

      const strippedSymbol = molecule.symbol.replace( /<\/?sub>/g, '' );
      const moleculeData = RealMoleculeData[ strippedSymbol ];

      while ( this.children.length > 0 ) {
        this.remove( this.children[ 0 ] );
      }

      for ( const atom of moleculeData.atoms ) {
        const element = Element.getElementBySymbol( atom.symbol === 'CL' ? 'Cl' : atom.symbol );

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

      for ( const bond of moleculeData.bonds ) {
        const atomA = moleculeData.atoms[ bond[ 0 ] ];
        const atomB = moleculeData.atoms[ bond[ 1 ] ];

        const positionA = new Vector3( atomA.x, atomA.y, atomA.z );
        const positionB = new Vector3( atomB.x, atomB.y, atomB.z );

        const bondGeometry = new THREE.CylinderGeometry( 1, 1, 1, 32, 1, false );
        const bondMaterial = new THREE.MeshLambertMaterial( {
          color: 0xffffff
        } );

        const bondMesh = new THREE.Mesh( bondGeometry, bondMaterial );

        bondMesh.position.set(
          0.5 * ( atomA.x + atomB.x ),
          0.5 * ( atomA.y + atomB.y ),
          0.5 * ( atomA.z + atomB.z )
        );

        bondMesh.quaternion.setFromUnitVectors(
          new THREE.Vector3( 0, 1, 0 ),
          ThreeUtils.vectorToThree( positionB.minus( positionA ).normalized() )
        );

        bondMesh.scale.x = bondMesh.scale.z = 0.1; // BOND RADIUS

        bondMesh.scale.y = positionA.distance( positionB );

        bondMesh.updateMatrix();

        this.add( bondMesh );
      }

      if ( surfaceType !== 'none' ) {
        // https://github.com/stevinz/three-subdivide
        // https://github.com/stevinz/three-wboit
        // https://observablehq.com/@mroehlig/3d-volume-rendering-with-webgl-three-js
        // Shader-material might work + render targets --- ASK about background and what is desired!
        // NOTE: need to support reconstruction of the renderer --- use LocalGeometry/etc.?
        // https://github.com/mrdoob/three.js/wiki/Migration-Guide

        // three 104 is April 24, 2019
        // 1.0.13 wboit: January 2, 2023

        // https://unpkg.com/:package@:version/:file

        // https://unpkg.com/three-wboit@1.0.13/build/index.module.js

        const colorizeElectrostaticPotential = ( espValue: number ): number[] => {
          espValue *= 7;

          if ( espValue > 0 ) {
            const v = clamp( 1 - espValue, 0, 1 );
            return [ v, v, 1 ];
          }
          else {
            const v = clamp( 1 + espValue, 0, 1 );
            return [ 1, v, v ];
          }
        };

        const colorizeElectronDensity = ( densityValue: number ): number[] => {
          densityValue *= 7;

          const clampedValue = clamp( densityValue, 0, 1 );
          return [ clampedValue, clampedValue, clampedValue ];
        };

        const toColor = surfaceType === 'electrostaticPotential' ? colorizeElectrostaticPotential : colorizeElectronDensity;

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
            ...toColor( v0 ),
            ...toColor( v1 ),
            ...toColor( v2 )
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