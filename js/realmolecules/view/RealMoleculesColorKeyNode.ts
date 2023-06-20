// Copyright 2023, University of Colorado Boulder

/**
 * RealMoleculesColorKeyNode is the surface color key for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import moleculePolarity from '../../moleculePolarity.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { SurfaceType } from '../../common/model/SurfaceType.js';
import SurfaceColorKey from '../../common/view/SurfaceColorKey.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { SurfaceColor } from '../../common/model/SurfaceColor.js';

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