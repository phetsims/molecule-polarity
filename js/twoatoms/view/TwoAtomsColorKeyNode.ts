// Copyright 2023, University of Colorado Boulder

/**
 * TwoAtomsColorKeyNode is the surface color key for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import moleculePolarity from '../../moleculePolarity.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import { SurfaceType } from '../../common/model/SurfaceType.js';
import SurfaceColorKey from '../../common/view/SurfaceColorKey.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class TwoAtomsColorKeyNode extends Node {

  public constructor( surfaceTypeProperty: StringUnionProperty<SurfaceType>, tandem: Tandem ) {

    const electrostaticPotentialColorKey = SurfaceColorKey.createElectrostaticPotentialRWBColorKey();

    const electronDensityColorKey = SurfaceColorKey.createElectronDensityColorKey();

    super( {
      children: [ electrostaticPotentialColorKey, electronDensityColorKey ],
      tandem: tandem,
      phetioVisiblePropertyInstrumented: true
    } );

    surfaceTypeProperty.link( surfaceType => {
      electrostaticPotentialColorKey.visible = ( surfaceType === 'electrostaticPotential' );
      electronDensityColorKey.visible = ( surfaceType === 'electronDensity' );
    } );
  }
}

moleculePolarity.register( 'TwoAtomsColorKeyNode', TwoAtomsColorKeyNode );