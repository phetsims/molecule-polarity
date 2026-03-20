// Copyright 2026, University of Colorado Boulder

/**
 * Describes the surface scale for the two atoms screen.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Multilink from '../../../../../axon/js/Multilink.js';
import StringUnionProperty from '../../../../../axon/js/StringUnionProperty.js';
import Node from '../../../../../scenery/js/nodes/Node.js';
import { SurfaceType } from '../../../common/model/SurfaceType.js';
import MoleculePolarityFluent from '../../../MoleculePolarityFluent.js';

export default class TwoAtomsSurfaceHeadingNode extends Node {
  public constructor(
    surfaceTypeProperty: StringUnionProperty<SurfaceType>
  ) {
    const blueWhiteRedElectrostaticPotentialNode = new Node( {
      accessibleHeading: MoleculePolarityFluent.a11y.realMoleculesScreen.electrostaticPotentialScale.accessibleHeadingStringProperty,
      accessibleParagraph: MoleculePolarityFluent.a11y.realMoleculesScreen.electrostaticPotentialScale.blueWhiteRedAccessibleParagraphStringProperty
    } );

    const electronDensityNode = new Node( {
      accessibleHeading: MoleculePolarityFluent.a11y.realMoleculesScreen.electronDensityScale.accessibleHeadingStringProperty,
      accessibleParagraph: MoleculePolarityFluent.a11y.realMoleculesScreen.electronDensityScale.accessibleParagraphStringProperty
    } );

    super();

    Multilink.multilink( [ surfaceTypeProperty ], surfaceType => {
      if ( surfaceType === 'electrostaticPotential' ) {
        this.children = [ blueWhiteRedElectrostaticPotentialNode ];
      }
      else if ( surfaceType === 'electronDensity' ) {
        this.children = [ electronDensityNode ];
      }
      else {
        this.children = [];
      }
    } );
  }
}
