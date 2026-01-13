// Copyright 2025, University of Colorado Boulder
/**
 * Screen Summary for the Three Atoms screen
 *
 * @author Agustín Vallejo
 */

import ScreenSummaryContent, { ScreenSummaryContentOptions } from '../../../../joist/js/ScreenSummaryContent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import DescriptionMaps from '../../common/view/DescriptionMaps.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import ThreeAtomsModel from '../model/ThreeAtomsModel.js';

type SelfOptions = EmptySelfOptions;

export type ThreeAtomsScreenSummaryContentNodeOptions = SelfOptions & ScreenSummaryContentOptions;

export default class ThreeAtomsScreenSummaryContentNode extends ScreenSummaryContent {
  public constructor( model: ThreeAtomsModel, providedOptions?: ThreeAtomsScreenSummaryContentNodeOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, ThreeAtomsScreenSummaryContentNodeOptions>()( {
      currentDetailsContent: MoleculePolarityFluent.a11y.threeAtomsScreen.screenSummary.currentDetails.createProperty( {
        polarity: DescriptionMaps.createPolarityStringProperty( model.triatomicMolecule.deltaENProperty ),
        shape: DescriptionMaps.createShapeStringProperty( model.triatomicMolecule.bondAngleABCProperty ),
        field: MoleculePolarityFluent.a11y.field.createProperty( {
          state: model.eFieldEnabledProperty.derived( enabled => enabled ? 'on' : 'off' )
        } )
      } ),
      playAreaContent: MoleculePolarityStrings.a11y.threeAtomsScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: MoleculePolarityStrings.a11y.threeAtomsScreen.screenSummary.controlAreaStringProperty,
      interactionHintContent: MoleculePolarityStrings.a11y.threeAtomsScreen.screenSummary.interactionHintStringProperty
    }, providedOptions );

    super( options );
  }
}

moleculePolarity.register( 'ThreeAtomsScreenSummaryContentNode', ThreeAtomsScreenSummaryContentNode );