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
import { simplifiedPartialChargesMap } from '../model/RealMoleculeSimplifiedData.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import DipoleArrow from './DipoleArrow.js';
import MPColors from '../../common/MPColors.js';

const LABEL_SIZE = 0.4;

const USE_REAL = false;

export default class RealMoleculeView extends THREE.Object3D {
  public constructor(
    moleculeProperty: TReadOnlyProperty<RealMolecule>,
    moleculeQuaternionProperty: TReadOnlyProperty<THREE.Quaternion>,
    viewProperties: RealMoleculesViewProperties,
    stepEmitter: TinyEmitter
  ) {
    super();

    const stepLabels: TextureQuad[] = [];
    let bondsMeshes: THREE.Mesh[][] = [];
    const bondRadius = 0.085;

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
      const simplifiedPartialChargeMap = simplifiedPartialChargesMap[ strippedSymbol ];

      const getPartialCharge = ( symbol: string, bondQuantity: number ): number => {
        const basicCharge = simplifiedPartialChargeMap[ symbol ];

        if ( basicCharge !== undefined ) {
          return basicCharge;
        }

        const numberedCharge = simplifiedPartialChargeMap[ `${symbol}${bondQuantity}` ];
        if ( numberedCharge !== undefined ) {
          return numberedCharge;
        }

        throw new Error( `No partial charge found for atom symbol: ${symbol} with bond quantity: ${bondQuantity}` );
      };

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

      bondsMeshes = [];

      for ( const bond of moleculeData.bonds ) {
        const meshes: THREE.Mesh[] = [];
        const bondGeometry = new THREE.CylinderGeometry( 1, 1, 1, 32, 1, false );
        const bondMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );

        for ( let i = 0; i < bond.bondType; i++ ) {
          const mesh = new THREE.Mesh( bondGeometry, bondMaterial );
          this.add( mesh );
          meshes.push( mesh );
        }
        bondsMeshes.push( meshes );
      }

      // Molecular dipole arrow
      {
        const charges = moleculeData.charges && moleculeData.charges.length === moleculeData.atoms.length ? moleculeData.charges : moleculeData.atoms.map( ( atom, i ) => getPartialCharge( atom.symbol, moleculeData.bonds.filter( b => b.indexA === i || b.indexB === i ).length ) );

        // Molecular dipole computation (Jmol-style centroid method)
        const E_ANG_PER_DEBYE = 0.208194; // e*angstroms/debye
        let cPos = 0;
        let cNeg = 0;
        const pos = { x: 0, y: 0, z: 0 };
        const neg = { x: 0, y: 0, z: 0 };
        for ( let i = 0; i < moleculeData.atoms.length; i++ ) {
          const a = moleculeData.atoms[ i ];
          const q = charges[ i ];
          if ( q > 0 ) {
            cPos += q;
            pos.x += q * a.x; pos.y += q * a.y; pos.z += q * a.z;
          }
          else if ( q < 0 ) {
            cNeg += q;
            neg.x += q * a.x; neg.y += q * a.y; neg.z += q * a.z;
          }
        }
        let mu: { x: number; y: number; z: number } | null = null;
        if ( cPos !== 0 && cNeg !== 0 ) {
          pos.x /= cPos; pos.y /= cPos; pos.z /= cPos;
          neg.x /= cNeg; neg.y /= cNeg; neg.z /= cNeg;
          const sep = { x: pos.x - neg.x, y: pos.y - neg.y, z: pos.z - neg.z };
          const factor = cPos / E_ANG_PER_DEBYE;
          mu = { x: sep.x * factor, y: sep.y * factor, z: sep.z * factor };
        }

        if ( mu ) {
          // Determine center atom as closest to centroid
          const centroid = new Vector3( 0, 0, 0 );
          moleculeData.atoms.forEach( atom => {
            centroid.x += atom.x;
            centroid.y += atom.y;
            centroid.z += atom.z;
          } );
          centroid.x /= moleculeData.atoms.length;
          centroid.y /= moleculeData.atoms.length;
          centroid.z /= moleculeData.atoms.length;
          let centerIndex = 0;
          let bestDist2 = Number.POSITIVE_INFINITY;
          for ( let i = 0; i < moleculeData.atoms.length; i++ ) {
            const a = moleculeData.atoms[ i ];
            const dx = a.x - centroid.x;
            const dy = a.y - centroid.y;
            const dz = a.z - centroid.z;
            const d2 = dx * dx + dy * dy + dz * dz;
            if ( d2 < bestDist2 ) { bestDist2 = d2; centerIndex = i; }
          }

          const centerAtom = moleculeData.atoms[ centerIndex ];
          const centerElement = Element.getElementBySymbol( centerAtom.symbol );
          const centerRadius = elementToRadius( centerElement );

          const dirThree = new THREE.Vector3( -mu.x, -mu.y, -mu.z ).normalize();

          // Tail just outside the center atom
          const tail = new THREE.Vector3( centerAtom.x, centerAtom.y, centerAtom.z ).add( dirThree.clone().multiplyScalar( centerRadius + 0.07 ) );

          // Choose visual arrow length relative to molecule size
          let maxR2 = 0;
          for ( const a of moleculeData.atoms ) {
            const dx = a.x - centroid.x;
            const dy = a.y - centroid.y;
            const dz = a.z - centroid.z;
            const d2 = dx * dx + dy * dy + dz * dz;
            if ( d2 > maxR2 ) { maxR2 = d2; }
          }
          const span = Math.sqrt( maxR2 );
          const baseLength = Math.max( 0.2, span * 0.6 );

          // Scale arrow by dipole magnitude: if weaker than reference, uniformly shrink arrow;
          // if stronger, just lengthen (keep width constant).
          const muMag = Math.sqrt( mu.x * mu.x + mu.y * mu.y + mu.z * mu.z ); // Debye
          const MU_REF = 0.5; // 1 Debye as reference

          // If essentially zero, skip rendering to avoid visual noise
          if ( muMag > 1e-3 ) {
            const factor = muMag / MU_REF;
            const arrow = new DipoleArrow( { color: ThreeUtils.colorToThree( new Color( MPColors.MOLECULAR_DIPOLE ) ) } );
            if ( factor >= 1 ) {
              // Longer arrow, same thickness
              arrow.setFrom( tail, dirThree, baseLength * factor );
            }
            else {
              // Uniformly scale down (length and thickness)
              arrow.setFrom( tail, dirThree, baseLength );
              arrow.scale.setScalar( factor );
            }
            this.add( arrow );
          }
        }
      }

      if ( atomLabelsVisible ) {
        for ( const atom of moleculeData.atoms ) {
          const atomIndex = moleculeData.atoms.indexOf( atom );
          const element = Element.getElementBySymbol( atom.symbol );
          const partialCharge = getPartialCharge( atom.symbol, moleculeData.bonds.filter( bond => bond.indexA === atomIndex || bond.indexB === atomIndex ).length );
          const atomVisualIndex = moleculeData.atoms.filter( a => a.symbol === atom.symbol ).indexOf( atom );

          const labelFill = [ Element.N, Element.O ].includes( element ) ? 'white' : 'black';

          const labelFont = new PhetFont( { size: 130, weight: 'bold' } );
          const labelNode = new VBox( {
            children: [
              new Text( `${element.symbol}${atomVisualIndex + 1}`, {
                font: labelFont,
                fill: labelFill
              } ),
              ...( partialChargesVisible ? [
                // TODO: strings! https://github.com/phetsims/molecule-polarity/issues/15
                new Text( `δ=${toFixed( partialCharge, 2 )}`, { font: labelFont, fill: labelFill } )
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
          if ( USE_REAL ) {
            densityValue *= 200;

            const clampedValue = clamp( 1 - densityValue, 0, 1 );
            return [ clampedValue, clampedValue, clampedValue ];
          }
          else {
            const clampedValue = clamp( 15 * densityValue / 2 + 0.5, 0, 1 );
            return [ clampedValue, clampedValue, clampedValue ];
          }
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


          if ( USE_REAL ) {
            const data = ( surfaceType === 'electrostaticPotential' ? moleculeData.vertexESPs : moleculeData.vertexDTs );
            const v0 = data[ indices[ 0 ] ];
            const v1 = data[ indices[ 1 ] ];
            const v2 = data[ indices[ 2 ] ];

            return [
              ...toColor( v0 ),
              ...toColor( v1 ),
              ...toColor( v2 )
            ];
          }
          else {
            const getColor = ( location: [ number, number, number ] ): number[] => {
              let espValue = 0;

              for ( let i = 0; i < moleculeData.atoms.length; i++ ) {
                const atom = moleculeData.atoms[ i ];
                const distance = Math.sqrt(
                  ( location[ 0 ] - atom.x ) ** 2 +
                  ( location[ 1 ] - atom.y ) ** 2 +
                  ( location[ 2 ] - atom.z ) ** 2
                );

                const partialCharge = getPartialCharge( atom.symbol, moleculeData.bonds.filter( bond => bond.indexA === i || bond.indexB === i ).length );

                espValue += partialCharge / distance;
              }

              return toColor( espValue );
            };
            return [
              ...getColor( moleculeData.vertexPositions[ indices[ 0 ] ] ),
              ...getColor( moleculeData.vertexPositions[ indices[ 1 ] ] ),
              ...getColor( moleculeData.vertexPositions[ indices[ 2 ] ] )
            ];
          }
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

      // Update bonds to face the camera and handle double/triple offsets
      {
        const strippedSymbol = moleculeProperty.value.symbol.replace( /<\/?sub>/g, '' );
        const moleculeData = RealMoleculeData[ strippedSymbol ];

        const localCamera = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );

        const threeYUnit = new THREE.Vector3( 0, 1, 0 );

        const bondSeparation = bondRadius * ( 12 / 5 );

        for ( let b = 0; b < moleculeData.bonds.length; b++ ) {
          const bond = moleculeData.bonds[ b ];
          const atomA = moleculeData.atoms[ bond.indexA ];
          const atomB = moleculeData.atoms[ bond.indexB ];

          const start = new Vector3( atomA.x, atomA.y, atomA.z );
          const end = new Vector3( atomB.x, atomB.y, atomB.z );
          const towardsEnd = end.minus( start ).normalized();
          const distance = start.distance( end );
          const center = start.timesScalar( 0.5 ).plus( end.timesScalar( 0.5 ) );

          // Perpendicular to bond direction and camera direction
          const perpendicular = center.minus( end ).normalized().cross( center.minus( localCamera ).normalized() ).normalized();

          let offsets: Vector3[] = [];
          switch( bond.bondType ) {
            case 1:
              offsets = [ new Vector3( 0, 0, 0 ) ];
              break;
            case 2:
              offsets = [ perpendicular.timesScalar( bondSeparation / 2 ), perpendicular.timesScalar( -bondSeparation / 2 ) ];
              break;
            case 3:
              offsets = [ new Vector3( 0, 0, 0 ), perpendicular.timesScalar( bondSeparation ), perpendicular.timesScalar( -bondSeparation ) ];
              break;
            default:
              throw new Error( `Unsupported bond type: ${bond.bondType}` );
          }

          const threeTowardsEnd = ThreeUtils.vectorToThree( towardsEnd );
          for ( let i = 0; i < bondsMeshes[ b ].length; i++ ) {
            const mesh = bondsMeshes[ b ][ i ];
            const translation = center.plus( offsets[ i ] );
            mesh.position.set( translation.x, translation.y, translation.z );
            mesh.quaternion.setFromUnitVectors( threeYUnit, threeTowardsEnd );
            mesh.scale.x = mesh.scale.z = bondRadius;
            mesh.scale.y = distance;
            mesh.updateMatrix();
          }
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
