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
import TextureQuad from '../../../../mobius/js/TextureQuad.js';
import NodeTexture from '../../../../mobius/js/NodeTexture.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import TinyEmitter from '../../../../axon/js/TinyEmitter.js';
import { REAL_MOLECULES_CAMERA_POSITION } from '../model/RealMoleculesModel.js';

const LABEL_SIZE = 0.4;

export default class RealMoleculeView extends THREE.Object3D {
  public constructor(
    moleculeProperty: TReadOnlyProperty<RealMolecule>,
    moleculeQuaternionProperty: TReadOnlyProperty<THREE.Quaternion>,
    viewProperties: RealMoleculesViewProperties,
    stepEmitter: TinyEmitter
  ) {
    super();

    const stepLabels: TextureQuad[] = [];

    const elementToRadius = ( element: Element ) => {
      const angstroms = element.vanDerWaalsRadius / 100;

      return 0.2 * angstroms; // scale factor for better visibility
    };

    Multilink.multilink( [
      moleculeProperty,
      viewProperties.surfaceTypeProperty,
      viewProperties.atomLabelsVisibleProperty,
      viewProperties.partialChargesVisibleProperty
    ], ( molecule, surfaceType, atomLabelsVisible, partialChargesVisible ) => {

      const strippedSymbol = molecule.symbol.replace( /<\/?sub>/g, '' );
      const moleculeData = RealMoleculeData[ strippedSymbol ];

      // Clear out children
      while ( this.children.length > 0 ) {
        this.remove( this.children[ 0 ] );
      }
      stepLabels.length = 0;

      for ( const atom of moleculeData.atoms ) {
        const element = Element.getElementBySymbol( atom.symbol );

        const threeColor = ThreeUtils.colorToThree( Color.toColor( element.color ) );

        const sphereGeometry = new THREE.SphereGeometry( elementToRadius( element ), 32, 32 );
        const atomMaterial = new THREE.MeshLambertMaterial( {
          color: threeColor
        } );

        const cubeMesh = new THREE.Mesh( sphereGeometry, atomMaterial );
        cubeMesh.position.set( atom.x, atom.y, atom.z );
        this.add( cubeMesh );
      }

      // TODO: double/triple bonds https://github.com/phetsims/molecule-polarity/issues/15
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

      if ( atomLabelsVisible ) {
        for ( const atom of moleculeData.atoms ) {
          const element = Element.getElementBySymbol( atom.symbol );

          const labelFill = [ Element.N, Element.O ].includes( element ) ? 'white' : 'black';

          const labelFont = new PhetFont( { size: 130, weight: 'bold' } );
          const labelNode = new VBox( {
            children: [
              // TODO: remap indices! https://github.com/phetsims/molecule-polarity/issues/15
              new Text( `${element.symbol}1`, {
                font: labelFont,
                fill: labelFill
              } ),
              ...( partialChargesVisible ? [
                // TODO: partial charges! https://github.com/phetsims/molecule-polarity/issues/15
                new Text( 'δ=-0.05', { font: labelFont, fill: labelFill } )
              ] : [] )
            ],
            center: new Vector2( 256, 128 )
          } );

          const labelNodeTexture = new NodeTexture( labelNode, {
            width: 512,
            height: 256
          } );

          const label = new TextureQuad( labelNodeTexture, 2 * LABEL_SIZE, LABEL_SIZE, {
            depthTest: true
          } );

          label.position.copy( ThreeUtils.vectorToThree( new Vector3( -2 * LABEL_SIZE * 0.5, -LABEL_SIZE * 0.5, 2 ) ) );

          this.add( label );
          stepLabels.push( label );
        }
      }

      if ( surfaceType !== 'none' ) {
        // https://github.com/stevinz/three-wboit
        // https://observablehq.com/@mroehlig/3d-volume-rendering-with-webgl-three-js
        // Shader-material might work + render targets --- ASK about background and what is desired!
        // NOTE: need to support reconstruction of the renderer --- use LocalGeometry/etc.?
        // https://github.com/mrdoob/three.js/wiki/Migration-Guide

        // three 104 is April 24, 2019
        // three 160 is Dec 22, 2023
        // 1.0.13 wboit: January 2, 2023

        // https://unpkg.com/:package@:version/:file

        // https://unpkg.com/three-wboit@1.0.13/build/index.module.js

        const colorizeElectrostaticPotential = ( espValue: number ): number[] => {
          espValue *= 15;

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
        meshGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( moleculeData.faceIndices.flatMap( indices => {
          const vertex0Data = moleculeData.vertexPositions[ indices[ 0 ] ];
          const vertex1Data = moleculeData.vertexPositions[ indices[ 1 ] ];
          const vertex2Data = moleculeData.vertexPositions[ indices[ 2 ] ];

          return [
            ...vertex0Data,
            ...vertex1Data,
            ...vertex2Data
          ];
        } ) ), 3 ) );
        meshGeometry.setAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( moleculeData.faceIndices.flatMap( indices => {
          const vertex0Data = moleculeData.vertexNormals[ indices[ 0 ] ];
          const vertex1Data = moleculeData.vertexNormals[ indices[ 1 ] ];
          const vertex2Data = moleculeData.vertexNormals[ indices[ 2 ] ];

          return [
            ...vertex0Data,
            ...vertex1Data,
            ...vertex2Data
          ];
        } ) ), 3 ) );
        meshGeometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array( moleculeData.faceIndices.flatMap( indices => {
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
          side: THREE.FrontSide
        } );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error Having to use external lib like this
        const mesh = new THREE.Mesh( window.ThreeLoopSubdivision.modify( meshGeometry, 2 ), meshMaterial );
        this.add( mesh );
      }
    } );

    moleculeQuaternionProperty.link( quaternion => {
      this.quaternion.copy( quaternion );
      this.updateMatrix();
      this.updateMatrixWorld();
    } );

    stepEmitter.addListener( () => {

      // TODO: factor this out https://github.com/phetsims/molecule-polarity/issues/15
      const strippedSymbol = moleculeProperty.value.symbol.replace( /<\/?sub>/g, '' );
      const moleculeData = RealMoleculeData[ strippedSymbol ];

      if ( stepLabels.length ) {
        for ( let i = 0; i < stepLabels.length; i++ ) {
          const label = stepLabels[ i ];
          const atom = moleculeData.atoms[ i ];

          const localPoint = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );
          const localUpPoint = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION.plus( Vector3.Y_UNIT ) ) ) );

          const dirToCamera = localPoint.normalized();
          const upDir = localUpPoint.minus( localPoint ).normalized();
          const rightDir = upDir.cross( dirToCamera ).normalized();

          // const atom = moleculeData.atoms[ 0 ];
          const element = Element.getElementBySymbol( atom.symbol ); // TODO: factor out https://github.com/phetsims/molecule-polarity/issues/15
          const atomPosition = new Vector3( atom.x, atom.y, atom.z );
          const atomRadius = elementToRadius( element );

          const labelCenter = atomPosition.plus( dirToCamera.timesScalar( atomRadius + 0.03 ) );
          const labelLowerLeft = labelCenter.plus( rightDir.timesScalar( -LABEL_SIZE ).plus( upDir.timesScalar( -0.5 * LABEL_SIZE ) ) );

          // OLD position... replace this with both position and rotation
          // label.position.copy( ThreeUtils.vectorToThree( new Vector3( -2 * LABEL_SIZE * 0.5, -LABEL_SIZE * 0.5, 2 ) ) );

          // label.position.copy( ThreeUtils.vectorToThree( labelLowerLeft ) );

          // TODO: don't require a renormalization https://github.com/phetsims/molecule-polarity/issues/15
          const forward = dirToCamera; // Z+
          const up = upDir; // Y+
          const right = up.cross( forward ).normalized(); // X+
          const rotMatrix = new THREE.Matrix4();
          // makeBasis(xAxis, yAxis, zAxis)
          rotMatrix.makeBasis(
            ThreeUtils.vectorToThree( right ),
            ThreeUtils.vectorToThree( up ),
            ThreeUtils.vectorToThree( forward )
          );

          label.matrixAutoUpdate = false;

          const m = new THREE.Matrix4();
          m.makeBasis(
            ThreeUtils.vectorToThree( right ),
            ThreeUtils.vectorToThree( up ),
            ThreeUtils.vectorToThree( forward )
          );
          m.setPosition( ThreeUtils.vectorToThree( labelLowerLeft ) );

          label.matrix.copy( m );
        }
      }
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