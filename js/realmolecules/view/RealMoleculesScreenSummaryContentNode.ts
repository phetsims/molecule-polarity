// Copyright 2026, University of Colorado Boulder
/**
 * Screen Summary for the Real Molecules screen
 *
 * @author Agustín Vallejo
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DynamicProperty from '../../../../axon/js/DynamicProperty.js';
import ScreenSummaryContent, { ScreenSummaryContentOptions } from '../../../../joist/js/ScreenSummaryContent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import DescriptionMaps from '../../common/view/DescriptionMaps.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import RealMolecule from '../model/RealMolecule.js';
import RealMoleculesModel from '../model/RealMoleculesModel.js';

type SelfOptions = EmptySelfOptions;

export type RealMoleculesScreenSummaryContentNodeOptions = SelfOptions & ScreenSummaryContentOptions;

export default class RealMoleculesScreenSummaryContentNode extends ScreenSummaryContent {
  public constructor( model: RealMoleculesModel, providedOptions?: RealMoleculesScreenSummaryContentNodeOptions ) {

    const currentMoleculeNameDynamicProperty = new DynamicProperty<string, unknown, RealMolecule>( model.moleculeProperty, {
      derive: 'fullNameProperty'
    } );

    const options = optionize<SelfOptions, EmptySelfOptions, RealMoleculesScreenSummaryContentNodeOptions>()( {
      currentDetailsContent: MoleculePolarityFluent.a11y.realMoleculesScreen.screenSummary.currentDetails.createProperty( {
        moleculeName: currentMoleculeNameDynamicProperty,
        shapeGeometry: DescriptionMaps.createShapeGeometryStringProperty(
          new DerivedProperty( [ model.moleculeProperty ], molecule => molecule.geometry )
        )
      } ),
      playAreaContent: MoleculePolarityStrings.a11y.realMoleculesScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: MoleculePolarityStrings.a11y.realMoleculesScreen.screenSummary.controlAreaStringProperty,
      interactionHintContent: MoleculePolarityStrings.a11y.realMoleculesScreen.screenSummary.interactionHintStringProperty
    }, providedOptions );

    super( options );
  }
}

moleculePolarity.register( 'RealMoleculesScreenSummaryContentNode', RealMoleculesScreenSummaryContentNode );