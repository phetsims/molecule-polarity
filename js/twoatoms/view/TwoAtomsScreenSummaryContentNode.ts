// Copyright 2025, University of Colorado Boulder
/**
 * Screen Summary for the Two Atoms screen
 *
 * @author Agustín Vallejo
 */

import ScreenSummaryContent, { ScreenSummaryContentOptions } from '../../../../joist/js/ScreenSummaryContent.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import TwoAtomsModel from '../model/TwoAtomsModel.js';
import BondDescriptionMaps from './BondDescriptionMaps.js';

type SelfOptions = EmptySelfOptions;

export type TwoAtomsScreenSummaryContentNodeOptions = SelfOptions & ScreenSummaryContentOptions;

export default class TwoAtomsScreenSummaryContentNode extends ScreenSummaryContent {
  public constructor( model: TwoAtomsModel, providedOptions?: TwoAtomsScreenSummaryContentNodeOptions ) {
    const options = optionize<SelfOptions, EmptySelfOptions, TwoAtomsScreenSummaryContentNodeOptions>()( {
      currentDetailsContent: MoleculePolarityFluent.a11y.twoAtomsScreen.screenSummary.currentDetails.createProperty( {
        polarity: BondDescriptionMaps.createPolarityStringProperty( model.diatomicMolecule.deltaENProperty ),
        field: MoleculePolarityFluent.a11y.field.createProperty( {
          state: model.eFieldEnabledProperty.derived( enabled => enabled ? 'on' : 'off' )
        } )
      } ),
      playAreaContent: MoleculePolarityStrings.a11y.twoAtomsScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: MoleculePolarityStrings.a11y.twoAtomsScreen.screenSummary.controlAreaStringProperty,
      interactionHintContent: MoleculePolarityStrings.a11y.twoAtomsScreen.screenSummary.interactionHintStringProperty
    }, providedOptions );

    super( options );
  }
}

moleculePolarity.register( 'TwoAtomsScreenSummaryContentNode', TwoAtomsScreenSummaryContentNode );