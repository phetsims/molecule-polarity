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