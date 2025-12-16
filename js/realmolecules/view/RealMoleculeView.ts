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
import MPPreferences from '../../common/model/MPPreferences.js';
import DipoleArrowView from './DipoleArrowView.js';
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
    const atomMeshes: THREE.Mesh[] = [];
    let bondsMeshes: THREE.Mesh[][] = [];
    type BondDipoleState = {
      arrow: DipoleArrowView;
      tailAtomIndex: number;
      dir: THREE.Vector3; // unit vector, positive -> negative
      baseLength: number;
      factor: number; // magnitude scaling
      tailRadius: number;
      start: Vector3;
      end: Vector3;
      centerVisible: Vector3;
      bondType: number;
      lastOffsetDir?: THREE.Vector3; // unit vector for side selection persistence
    };
    let bondDipoleStates: BondDipoleState[] = [];
    // Track molecular arrow so we can update its cross orientation per frame
    let molecularArrow: DipoleArrowView | null = null;
    let molecularArrowDir: THREE.Vector3 | null = null;
    let bondDipoleGlobalScale = 1; // rescales all bond dipole lengths uniformly
    const BOND_DIPOLE_OFFSET = 0.3; // view units offset from bond centerline
    const BOND_DIPOLE_SCALE = 0.6; // overall scale for bond dipole arrows (length and thickness)
    const BOND_DIPOLE_FACTOR = 0.6; // max fraction of bond length allowed for the longest dipole
    const bondRadius = 0.085;

    const elementToRadius = ( element: Element ) => {
      const angstroms = element.vanDerWaalsRadius / 100;

      return 0.2 * angstroms; // scale factor for better visibility
    };

    Multilink.multilink( [
      moleculeProperty,
      viewProperties.surfaceTypeProperty,
      viewProperties.atomLabelsVisibleProperty,
      viewProperties.partialChargesVisibleProperty,
      viewProperties.molecularDipoleVisibleProperty,
      viewProperties.bondDipolesVisibleProperty,
      MPPreferences.dipoleDirectionProperty,
      MPPreferences.surfaceColorProperty
    ], ( molecule, surfaceType, atomLabelsVisible, partialChargesVisible, molecularDipoleVisible, bondDipolesVisible, dipoleDirection, surfaceColor ) => {

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

      // Select charge source per requested rule: when USE_REAL is true, use moleculeData.charges;
      // otherwise use simplified partial charges.
      const charges: number[] = ( USE_REAL && moleculeData.charges && moleculeData.charges.length === moleculeData.atoms.length ) ?
        moleculeData.charges :
        moleculeData.atoms.map( ( atom, i ) => getPartialCharge( atom.symbol, moleculeData.bonds.filter( b => b.indexA === i || b.indexB === i ).length ) );

      // Dipole direction preference: default is positiveToNegative; otherwise reverse arrows
      const orientationSign = ( dipoleDirection === 'positiveToNegative' ) ? 1 : -1;

      // Clear out children
      while ( this.children.length > 0 ) {
        this.remove( this.children[ 0 ] );
      }
      molecularArrow = null;
      molecularArrowDir = null;
      stepLabels.length = 0;

      atomMeshes.length = 0;
      for ( const atom of moleculeData.atoms ) {
        const element = Element.getElementBySymbol( atom.symbol );

        const threeColor = ThreeUtils.colorToThree( Color.toColor( element === Element.C ? '#444' : element.color ) );

        const sphereGeometry = new THREE.SphereGeometry( elementToRadius( element ), 32, 32 );
        const atomMaterial = new THREE.MeshLambertMaterial( {
          color: threeColor,
          side: THREE.FrontSide // for when transparent
        } );

        // Ensure atoms write depth (default), so bonds can depth-test against them
        atomMaterial.depthWrite = true;
        const sphereMesh = new THREE.Mesh( sphereGeometry, atomMaterial );
        // Lower renderOrder so atoms render before bonds
        sphereMesh.renderOrder = 0;
        sphereMesh.position.set( atom.x, atom.y, atom.z );
        this.add( sphereMesh );
        atomMeshes.push( sphereMesh );
      }

      bondsMeshes = [];
      bondDipoleStates = [];
      bondDipoleGlobalScale = 1;

      for ( const bond of moleculeData.bonds ) {
        const meshes: THREE.Mesh[] = [];
        const bondGeometry = new THREE.CylinderGeometry( 1, 1, 1, 32, 1, false );
        // Bonds: depthTest against atoms, but do not write depth to avoid self-occlusion artifacts when semi-transparent
        const bondMaterial = new THREE.MeshLambertMaterial( {
          color: 0xffffff,
          depthTest: true,
          side: THREE.FrontSide // for when transparent
        } );

        for ( let i = 0; i < bond.bondType; i++ ) {
          const mesh = new THREE.Mesh( bondGeometry, bondMaterial );
          // Higher renderOrder so bonds render after atoms regardless of transparency
          mesh.renderOrder = 10;
          this.add( mesh );
          meshes.push( mesh );
        }
        bondsMeshes.push( meshes );
      }

      // Molecular dipole arrow
      if ( molecularDipoleVisible ) {

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

          // Chemistry default: arrow from positive -> negative (we previously inverted from physics μ)
          const dirThreeBase = new THREE.Vector3( -mu.x, -mu.y, -mu.z ).normalize();
          const dirThree = dirThreeBase.clone().multiplyScalar( orientationSign );

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

          // Cap the maximum displayed arrow length to 1.5x the longest bond length in the molecule
          let maxBondLength = 0;
          for ( const b of moleculeData.bonds ) {
            const a1 = moleculeData.atoms[ b.indexA ];
            const a2 = moleculeData.atoms[ b.indexB ];
            const dx = a2.x - a1.x;
            const dy = a2.y - a1.y;
            const dz = a2.z - a1.z;
            const d = Math.sqrt( dx * dx + dy * dy + dz * dz );
            if ( d > maxBondLength ) { maxBondLength = d; }
          }
          const molecularCap = 1.5 * maxBondLength;

          // Scale arrow by dipole magnitude: if weaker than reference, uniformly shrink arrow;
          // if stronger, just lengthen (keep width constant).
          const muMag = Math.sqrt( mu.x * mu.x + mu.y * mu.y + mu.z * mu.z ); // Debye
          const MU_REF = 0.5; // 1 Debye as reference

          // If essentially zero, skip rendering to avoid visual noise
          if ( muMag > 1e-3 ) {
            const factor = muMag / MU_REF;
            const desiredDisplayedLength = baseLength * factor; // consistent for both branches
            const cappedDisplayedLength = Math.min( molecularCap, desiredDisplayedLength );

            const arrow = new DipoleArrowView( { color: ThreeUtils.colorToThree( new Color( MPColors.MOLECULAR_DIPOLE ) ) } );
            if ( factor >= 1 ) {
              // No uniform scale; set the final displayed length directly
              arrow.setFrom( tail, dirThree, cappedDisplayedLength );
            }
            else {
              // Uniformly scale arrow by factor; pre-scale length so final displayed length equals the cap
              const preScaleLength = cappedDisplayedLength / Math.max( factor, 1e-6 );
              arrow.setFrom( tail, dirThree, preScaleLength );
              arrow.scale.setScalar( factor );
            }
            this.add( arrow );

            // Initialize cross axis aligned with the arrow direction
            arrow.setCrossPerp( dirThree );

            // Track for per-frame update
            molecularArrow = arrow;
            molecularArrowDir = dirThree.clone();

            // Dim the non-central atom that lies along the arrow direction (if any)
            const alignmentThreshold = 0.95; // cosine threshold for alignment
            let bestDot = alignmentThreshold;
            let alignedIndex: number | null = null;
            for ( let i = 0; i < moleculeData.atoms.length; i++ ) {
              if ( i === centerIndex ) { continue; }
              const a = moleculeData.atoms[ i ];
              const v = new THREE.Vector3( a.x - centerAtom.x, a.y - centerAtom.y, a.z - centerAtom.z ).normalize();
              const d = v.dot( dirThree );
              if ( d > bestDot ) {
                bestDot = d;
                alignedIndex = i;
              }
            }

            if ( alignedIndex !== null ) {
              // Dim the aligned atom mesh
              const atomMesh = atomMeshes[ alignedIndex ];
              if ( atomMesh ) {
                const mat = atomMesh.material as THREE.MeshLambertMaterial;
                mat.transparent = true;
                mat.opacity = 0.5;
              }

              // Dim the bond mesh between center and aligned atom
              const bondIndex = moleculeData.bonds.findIndex( b =>
                ( b.indexA === centerIndex && b.indexB === alignedIndex ) ||
                ( b.indexB === centerIndex && b.indexA === alignedIndex )
              );
              if ( bondIndex >= 0 && bondsMeshes[ bondIndex ] ) {
                for ( const mesh of bondsMeshes[ bondIndex ] ) {
                  const bmat = mesh.material as THREE.MeshLambertMaterial;
                  bmat.transparent = true;
                  bmat.opacity = 0.5;
                }
              }
            }
          }
        }
      }

      // Bond dipole arrows (black), one per bond
      if ( bondDipolesVisible ) {
        const E_ANG_PER_DEBYE = 0.208194;
        const MU_REF_BOND = 0.5; // reference Debye for scaling

        // First pass: compute raw (unclamped) draw lengths to determine a global scale
        type BondRaw = {
          iA: number; iB: number;
          a: typeof moleculeData.atoms[number];
          b: typeof moleculeData.atoms[number];
          start: Vector3; end: Vector3; dist: number;
          dirThree: THREE.Vector3; tailAtomIndex: number; tailRadius: number;
          baseLength: number; factor: number; rawLength: number;
          centerVisible: Vector3;
        };
        const raws: BondRaw[] = [];

        for ( const bond of moleculeData.bonds ) {
          const iA = bond.indexA;
          const iB = bond.indexB;
          const a = moleculeData.atoms[ iA ];
          const b = moleculeData.atoms[ iB ];
          const c1 = charges[ iA ];
          const c2 = charges[ iB ];

          const start = new Vector3( a.x, a.y, a.z );
          const end = new Vector3( b.x, b.y, b.z );
          const dist = start.distance( end );
          if ( dist === 0 ) { continue; }

          // Bond dipole magnitude in Debye (Jmol convention)
          const valueDebye = ( ( c1 - c2 ) / 2 ) * ( dist / E_ANG_PER_DEBYE );
          const muMag = Math.abs( valueDebye );
          if ( muMag <= 1e-3 ) { continue; }

          // Direction from positive to negative end (then apply preference)
          let dirThree: THREE.Vector3;
          let tailAtomIndex: number;
          if ( ( c1 - c2 ) >= 0 ) {
            dirThree = ThreeUtils.vectorToThree( end.minus( start ).normalized() );
            tailAtomIndex = iA; // positive end near A
          }
          else {
            dirThree = ThreeUtils.vectorToThree( start.minus( end ).normalized() );
            tailAtomIndex = iB; // positive end near B
          }
          dirThree.multiplyScalar( orientationSign );

          // Base length proportional to bond length
          const baseLength = Math.max( 0.1, dist * 0.6 );
          const factor = muMag / MU_REF_BOND;
          const rawLength = baseLength * BOND_DIPOLE_SCALE * factor;

          const tailAtom = moleculeData.atoms[ tailAtomIndex ];
          const tailElement = Element.getElementBySymbol( tailAtom.symbol );
          const tailRadius = elementToRadius( tailElement );

          // Compute visible center for this bond using displayed radii
          const rA = elementToRadius( Element.getElementBySymbol( a.symbol ) );
          const rB = elementToRadius( Element.getElementBySymbol( b.symbol ) );
          const u = end.minus( start ).normalized();
          const pA = start.plus( u.timesScalar( rA ) );
          const pB = end.minus( u.timesScalar( rB ) );
          const centerVisible = pA.plus( pB ).timesScalar( 0.5 );

          raws.push( {
            iA: iA,
            iB: iB,
            a: a,
            b: b,
            start: start,
            end: end,
            dist: dist,
            dirThree: dirThree,
            tailAtomIndex: tailAtomIndex,
            tailRadius: tailRadius,
            baseLength: baseLength,
            factor: factor,
            rawLength: rawLength,
            centerVisible: centerVisible
          } );
        }

        // Compute global scale so that max(rawLength) per bond does not exceed BOND_DIPOLE_FACTOR * bondLength
        // Second pass: create arrows with per-bond clamping (no global downscale)
        for ( const r of raws ) {
          const { start, end, dist, dirThree, tailAtomIndex, tailRadius, baseLength, factor, rawLength, centerVisible } = r;

          const arrow = new DipoleArrowView( { color: 0x000000 } );
          // Initial placement centered at the visible bond centerline (no side offset yet)
          // Cap to BOND_DIPOLE_FACTOR * dist to avoid overshooting
          const drawLength = Math.min( BOND_DIPOLE_FACTOR * dist, rawLength );
          const centerInit = new THREE.Vector3( centerVisible.x, centerVisible.y, centerVisible.z );
          const initialTail = centerInit.clone().add( dirThree.clone().multiplyScalar( -drawLength / 2 ) );
          arrow.setFrom( initialTail, dirThree, drawLength );
          // Scale thickness consistently with the final length scaling
          const baseScaledLength = baseLength * BOND_DIPOLE_SCALE;
          const effectiveScalar = Math.min( 1, drawLength / baseScaledLength );
          const thicknessFactor = BOND_DIPOLE_SCALE * effectiveScalar;
          arrow.scale.set( thicknessFactor, 1, thicknessFactor );
          this.add( arrow );

          // Initial crossbar orientation
          const localCamera2 = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );
          const viewDirInit = new THREE.Vector3( centerInit.x - localCamera2.x, centerInit.y - localCamera2.y, centerInit.z - localCamera2.z ).normalize();
          // axisInit: projection of bond direction onto camera plane
          let axisInit = dirThree.clone().sub( viewDirInit.clone().multiplyScalar( dirThree.dot( viewDirInit ) ) ).normalize();
          if ( axisInit.lengthSq() < 1e-6 ) {
            const worldX = new THREE.Vector3( 1, 0, 0 );
            axisInit = new THREE.Vector3().crossVectors( viewDirInit, ( Math.abs( viewDirInit.dot( worldX ) ) > 0.9 ? new THREE.Vector3( 0, 1, 0 ) : worldX ) ).normalize();
          }
          arrow.setCrossPerp( axisInit );

          bondDipoleStates.push( {
            arrow: arrow,
            tailAtomIndex: tailAtomIndex,
            dir: dirThree.clone(),
            baseLength: baseLength,
            factor: factor,
            tailRadius: tailRadius,
            start: start,
            end: end,
            centerVisible: centerVisible,
            bondType: moleculeData.bonds.find( bb => ( bb.indexA === r.iA && bb.indexB === r.iB ) || ( bb.indexA === r.iB && bb.indexB === r.iA ) )?.bondType || 1
          } );
        }
      }

      if ( atomLabelsVisible || partialChargesVisible ) {
        for ( const atom of moleculeData.atoms ) {
          const atomIndex = moleculeData.atoms.indexOf( atom );
          const element = Element.getElementBySymbol( atom.symbol );
          const partialCharge = getPartialCharge( atom.symbol, moleculeData.bonds.filter( bond => bond.indexA === atomIndex || bond.indexB === atomIndex ).length );
          const atomVisualIndex = moleculeData.atoms.filter( a => a.symbol === atom.symbol ).indexOf( atom );

          const labelFill = [ Element.N, Element.O, Element.C ].includes( element ) ? 'white' : 'black';

          const labelFont = new PhetFont( { size: 130, weight: 'bold' } );
          const labelNode = new VBox( {
            children: [
              ...( atomLabelsVisible ? [
                new Text( `${element.symbol}${atomVisualIndex + 1}`, {
                  font: labelFont,
                  fill: labelFill
                } )
              ] : [] ),
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

          ( label as unknown as THREE.Object3D ).renderOrder = 100;

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

        // Two palettes for Electrostatic Potential: RWB (red-white-blue) and ROYGB (rainbow)
        const colorizeElectrostaticPotentialRWB = ( espValue: number ): number[] => {
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

        const colorizeElectrostaticPotentialROYGB = ( espValue: number ): number[] => {
          // Normalize to [0,1] range centered at 0 using same scaling as RWB
          const scaled = clamp( ( espValue * 15 + 1 ) / 2, 0, 1 );
          // Simple ROYGB gradient stops (red, orange, yellow, green, blue)
          const stops: [number, number, number][] = [
            [ 1, 0, 0 ],      // red
            [ 1, 0.5, 0 ],    // orange
            [ 1, 1, 0 ],      // yellow
            [ 0, 1, 0 ],      // green
            [ 0, 0, 1 ]       // blue
          ];
          const n = stops.length;
          const t = scaled * ( n - 1 );
          const i = Math.floor( t );
          const f = t - i;
          const c0 = stops[ Math.max( 0, Math.min( i, n - 1 ) ) ];
          const c1 = stops[ Math.max( 0, Math.min( i + 1, n - 1 ) ) ];
          return [
            c0[ 0 ] * ( 1 - f ) + c1[ 0 ] * f,
            c0[ 1 ] * ( 1 - f ) + c1[ 1 ] * f,
            c0[ 2 ] * ( 1 - f ) + c1[ 2 ] * f
          ];
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

        const toColor = surfaceType === 'electrostaticPotential'
          ? ( surfaceColor === 'ROYGB' ? colorizeElectrostaticPotentialROYGB : colorizeElectrostaticPotentialRWB )
          : colorizeElectronDensity;

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

      // Update bond dipole arrows to offset perpendicular to view and bond, with stable side selection
      if ( viewProperties.bondDipolesVisibleProperty.value && bondDipoleStates.length ) {
        const localCamera = ThreeUtils.threeToVector( this.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );
        for ( const state of bondDipoleStates ) {
          const start = state.start;
          const end = state.end;
          const center = state.centerVisible;
          const bondDir = ThreeUtils.vectorToThree( end.minus( start ).normalized() );

          // Compute a perpendicular direction relative to camera
          const viewDir = ThreeUtils.vectorToThree( center.minus( localCamera ).normalized() );
          let perp = new THREE.Vector3().crossVectors( bondDir, viewDir ).normalize();
          if ( perp.lengthSq() < 1e-6 ) {
            // Fallback perpendicular independent of view
            const worldX = new THREE.Vector3( 1, 0, 0 );
            const alt = ( Math.abs( bondDir.dot( worldX ) ) > 0.9 ) ? new THREE.Vector3( 0, 1, 0 ) : worldX;
            perp = new THREE.Vector3().crossVectors( bondDir, alt ).normalize();
          }
          const perpNeg = perp.clone().multiplyScalar( -1 );

          // Choose side closest to previous frame
          let chosen = perp;
          if ( state.lastOffsetDir ) {
            const d1 = perp.dot( state.lastOffsetDir );
            const d2 = perpNeg.dot( state.lastOffsetDir );
            chosen = ( d2 > d1 ) ? perpNeg : perp;
          }
          state.lastOffsetDir = chosen.clone();

          // Recompute tail position so that the arrow is centered at the bond center,
          // with side offset perpendicular to view and bond.
          const centerThree = ThreeUtils.vectorToThree( center );
          const distNow = start.distance( end );
          const rawLength = state.baseLength * BOND_DIPOLE_SCALE * state.factor;
          const drawLength = Math.min( BOND_DIPOLE_FACTOR * distNow, rawLength * bondDipoleGlobalScale );
          const sideOffsetScale = ( state.bondType === 3 ? 1.2 : 1 );
          const tail = centerThree.clone()
            .add( chosen.clone().multiplyScalar( BOND_DIPOLE_OFFSET * sideOffsetScale ) )
            .add( state.dir.clone().multiplyScalar( -drawLength / 2 ) );
          state.arrow.setFrom( tail, state.dir, drawLength );
          // Cross axis should be parallel to bond direction but perpendicular to camera at arrow location (tail)
          const arrowPosFrame = state.arrow.position; // tail in parent space
          const viewDirFrame = new THREE.Vector3( arrowPosFrame.x - localCamera.x, arrowPosFrame.y - localCamera.y, arrowPosFrame.z - localCamera.z ).normalize();
          let axisFrame = state.dir.clone().sub( viewDirFrame.clone().multiplyScalar( state.dir.dot( viewDirFrame ) ) ).normalize();
          if ( axisFrame.lengthSq() < 1e-6 ) {
            const worldX = new THREE.Vector3( 1, 0, 0 );
            axisFrame = new THREE.Vector3().crossVectors( viewDirFrame, ( Math.abs( viewDirFrame.dot( worldX ) ) > 0.9 ? new THREE.Vector3( 0, 1, 0 ) : worldX ) ).normalize();
          }
          state.arrow.setCrossPerp( axisFrame );
          // Scale thickness consistently with the final length scaling
          const baseScaledLengthU = state.baseLength * BOND_DIPOLE_SCALE;
          const effectiveScalarU = Math.min( 1, drawLength / baseScaledLengthU );
          const thicknessFactorU = BOND_DIPOLE_SCALE * effectiveScalarU;
          state.arrow.scale.set( thicknessFactorU, 1, thicknessFactorU );
        }
      }

      // Update molecular dipole cross orientation each frame (aligned with arrow)
      if ( molecularArrow && molecularArrowDir ) {
        molecularArrow.setCrossPerp( molecularArrowDir );
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
