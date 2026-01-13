// Copyright 2025, University of Colorado Boulder
/**
 * Screen Summary for the Real Molecules screen
 *
 * @author Agustín Vallejo
 */

import ScreenSummaryContent, { ScreenSummaryContentOptions } from '../../../../joist/js/ScreenSummaryContent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import RealMoleculesModel from '../model/RealMoleculesModel.js';

type SelfOptions = EmptySelfOptions;

export type RealMoleculesScreenSummaryContentNodeOptions = SelfOptions & ScreenSummaryContentOptions;

export default class RealMoleculesScreenSummaryContentNode extends ScreenSummaryContent {
  public constructor( model: RealMoleculesModel, providedOptions?: RealMoleculesScreenSummaryContentNodeOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, RealMoleculesScreenSummaryContentNodeOptions>()( {
      currentDetailsContent: MoleculePolarityFluent.a11y.realMoleculesScreen.screenSummary.currentDetails.createProperty( {
        moleculeName: 'TODO', // DescriptionMaps.createPolarityStringProperty( model.triatomicMolecule.deltaENProperty ),
        realPolarity: 'TODO', // DescriptionMaps.createShapeStringProperty( model.triatomicMolecule.bondAngleABCProperty ),
        shapeGeometry: 'TODO' // MoleculePolarityFluent.a11y.field.createProperty( {
          // state: model.eFieldEnabledProperty.derived( enabled => enabled ? 'on' : 'off' )
        // } )
      } ),
      playAreaContent: MoleculePolarityStrings.a11y.realMoleculesScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: MoleculePolarityStrings.a11y.realMoleculesScreen.screenSummary.controlAreaStringProperty,
      interactionHintContent: MoleculePolarityStrings.a11y.realMoleculesScreen.screenSummary.interactionHintStringProperty
    }, providedOptions );

    super( options );
  }
}

moleculePolarity.register( 'RealMoleculesScreenSummaryContentNode', RealMoleculesScreenSummaryContentNode );