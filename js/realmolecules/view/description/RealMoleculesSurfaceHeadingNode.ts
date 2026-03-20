// Copyright 2026, University of Colorado Boulder

/**
 * Describes the surface scale for the real molecules screen.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Jonathan Olson (PhET Interactive Simulations)
 */

import Node from '../../../../../scenery/js/nodes/Node.js';
import { SurfaceType } from '../../../common/model/SurfaceType.js';
import StringUnionProperty from '../../../../../axon/js/StringUnionProperty.js';
import MPPreferences from '../../../common/model/MPPreferences.js';
import MoleculePolarityFluent from '../../../MoleculePolarityFluent.js';
import Multilink from '../../../../../axon/js/Multilink.js';

export default class RealMoleculesSurfaceHeadingNode extends Node {
  public constructor(
    surfaceTypeProperty: StringUnionProperty<SurfaceType>
  ) {
    const blueWhiteRedElectrostaticPotentialNode = new Node( {
      accessibleHeading: MoleculePolarityFluent.a11y.realMoleculesScreen.electrostaticPotentialScale.accessibleHeadingStringProperty,
      accessibleParagraph: MoleculePolarityFluent.a11y.realMoleculesScreen.electrostaticPotentialScale.blueWhiteRedAccessibleParagraphStringProperty
    } );

    const rainbowElectrostaticPotentialNode = new Node( {
      accessibleHeading: MoleculePolarityFluent.a11y.realMoleculesScreen.electrostaticPotentialScale.accessibleHeadingStringProperty,
      accessibleParagraph: MoleculePolarityFluent.a11y.realMoleculesScreen.electrostaticPotentialScale.rainbowAccessibleParagraphStringProperty
    } );

    const electronDensityNode = new Node( {
      accessibleHeading: MoleculePolarityFluent.a11y.realMoleculesScreen.electronDensityScale.accessibleHeadingStringProperty,
      accessibleParagraph: MoleculePolarityFluent.a11y.realMoleculesScreen.electronDensityScale.accessibleParagraphStringProperty
    } );

    super();

    Multilink.multilink( [ surfaceTypeProperty, MPPreferences.surfaceColorProperty ], ( surfaceType, surfaceColor ) => {
      if ( surfaceType === 'electrostaticPotential' ) {
        this.children = surfaceColor === 'blueWhiteRed' ? [ blueWhiteRedElectrostaticPotentialNode ] : [ rainbowElectrostaticPotentialNode ];
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
