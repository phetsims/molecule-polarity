// Copyright 2023-2025, University of Colorado Boulder

/**
 * RealMoleculesColorKeyNode is the surface color key for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { SurfaceColor } from '../../common/model/SurfaceColor.js';
import { SurfaceType } from '../../common/model/SurfaceType.js';
import SurfaceColorKey from '../../common/view/SurfaceColorKey.js';
import moleculePolarity from '../../moleculePolarity.js';

export default class RealMoleculesColorKeyNode extends Node {

  public constructor( surfaceTypeProperty: StringUnionProperty<SurfaceType>,
                      surfaceColorProperty: StringUnionProperty<SurfaceColor>,
                      tandem: Tandem ) {

    const electrostaticPotentialRWBColorKey = SurfaceColorKey.createElectrostaticPotentialRWBColorKey();

    const electrostaticPotentialROYGBColorKey = SurfaceColorKey.createElectrostaticPotentialROYGBColorKey();

    const electronDensityColorKey = SurfaceColorKey.createElectronDensityColorKey();

    super( {
      children: [
        electrostaticPotentialRWBColorKey,
        electrostaticPotentialROYGBColorKey,
        electronDensityColorKey
      ],
      tandem: tandem,
      phetioVisiblePropertyInstrumented: true
    } );

    Multilink.multilink( [ surfaceTypeProperty, surfaceColorProperty ],
      ( surfaceType, surfaceColor ) => {
        electrostaticPotentialRWBColorKey.visible = ( surfaceType === 'electrostaticPotential' && surfaceColor === 'RWB' );
        electrostaticPotentialROYGBColorKey.visible = ( surfaceType === 'electrostaticPotential' && surfaceColor === 'ROYGB' );
        electronDensityColorKey.visible = ( surfaceType === 'electronDensity' );
      } );
  }
}

moleculePolarity.register( 'RealMoleculesColorKeyNode', RealMoleculesColorKeyNode );