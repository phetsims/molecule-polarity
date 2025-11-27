// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from molecule-polarity-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import type { FluentVariable } from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import moleculePolarity from './moleculePolarity.js';
import MoleculePolarityStrings from './MoleculePolarityStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( MoleculePolarityStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'molecule_polarity_title', 'molecule-polarity.titleStringProperty' );
addToMapIfDefined( 'screen_twoAtoms', 'screen.twoAtomsStringProperty' );
addToMapIfDefined( 'screen_threeAtoms', 'screen.threeAtomsStringProperty' );
addToMapIfDefined( 'screen_realMolecules', 'screen.realMoleculesStringProperty' );
addToMapIfDefined( 'electricField', 'electricFieldStringProperty' );
addToMapIfDefined( 'on', 'onStringProperty' );
addToMapIfDefined( 'off', 'offStringProperty' );
addToMapIfDefined( 'bondCharacter', 'bondCharacterStringProperty' );
addToMapIfDefined( 'partialCharges', 'partialChargesStringProperty' );
addToMapIfDefined( 'bondDipole', 'bondDipoleStringProperty' );
addToMapIfDefined( 'bondDipoles', 'bondDipolesStringProperty' );
addToMapIfDefined( 'molecularDipole', 'molecularDipoleStringProperty' );
addToMapIfDefined( 'electronegativity', 'electronegativityStringProperty' );
addToMapIfDefined( 'less', 'lessStringProperty' );
addToMapIfDefined( 'more', 'moreStringProperty' );
addToMapIfDefined( 'atomA', 'atomAStringProperty' );
addToMapIfDefined( 'atomB', 'atomBStringProperty' );
addToMapIfDefined( 'atomC', 'atomCStringProperty' );
addToMapIfDefined( 'moreCovalent', 'moreCovalentStringProperty' );
addToMapIfDefined( 'moreIonic', 'moreIonicStringProperty' );
addToMapIfDefined( 'none', 'noneStringProperty' );
addToMapIfDefined( 'electrostaticPotential', 'electrostaticPotentialStringProperty' );
addToMapIfDefined( 'electronDensity', 'electronDensityStringProperty' );
addToMapIfDefined( 'surface', 'surfaceStringProperty' );
addToMapIfDefined( 'view', 'viewStringProperty' );
addToMapIfDefined( 'atomLabels', 'atomLabelsStringProperty' );
addToMapIfDefined( 'molecule', 'moleculeStringProperty' );
addToMapIfDefined( 'atomElectronegativities', 'atomElectronegativitiesStringProperty' );
addToMapIfDefined( 'positive', 'positiveStringProperty' );
addToMapIfDefined( 'negative', 'negativeStringProperty' );
addToMapIfDefined( 'ammonia', 'ammoniaStringProperty' );
addToMapIfDefined( 'borane', 'boraneStringProperty' );
addToMapIfDefined( 'boronTrifluoride', 'boronTrifluorideStringProperty' );
addToMapIfDefined( 'carbonDioxide', 'carbonDioxideStringProperty' );
addToMapIfDefined( 'chloroform', 'chloroformStringProperty' );
addToMapIfDefined( 'difluoromethane', 'difluoromethaneStringProperty' );
addToMapIfDefined( 'fluorine', 'fluorineStringProperty' );
addToMapIfDefined( 'fluoromethane', 'fluoromethaneStringProperty' );
addToMapIfDefined( 'formaldehyde', 'formaldehydeStringProperty' );
addToMapIfDefined( 'hydrogen', 'hydrogenStringProperty' );
addToMapIfDefined( 'hydrogenCyanide', 'hydrogenCyanideStringProperty' );
addToMapIfDefined( 'hydrogenFluoride', 'hydrogenFluorideStringProperty' );
addToMapIfDefined( 'methane', 'methaneStringProperty' );
addToMapIfDefined( 'nitrogen', 'nitrogenStringProperty' );
addToMapIfDefined( 'oxygen', 'oxygenStringProperty' );
addToMapIfDefined( 'ozone', 'ozoneStringProperty' );
addToMapIfDefined( 'tetrafluoromethane', 'tetrafluoromethaneStringProperty' );
addToMapIfDefined( 'trifluoromethane', 'trifluoromethaneStringProperty' );
addToMapIfDefined( 'water', 'waterStringProperty' );
addToMapIfDefined( 'dipoleDirection', 'dipoleDirectionStringProperty' );
addToMapIfDefined( 'deltaPlus', 'deltaPlusStringProperty' );
addToMapIfDefined( 'deltaMinus', 'deltaMinusStringProperty' );
addToMapIfDefined( 'surfaceColorRealMolecules', 'surfaceColorRealMoleculesStringProperty' );
addToMapIfDefined( 'underDevelopment_line1', 'underDevelopment.line1StringProperty' );
addToMapIfDefined( 'underDevelopment_line2', 'underDevelopment.line2StringProperty' );
addToMapIfDefined( 'a11y_common_electronegativitySlider_accessibleName', 'a11y.common.electronegativitySlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_atom_accessibleName', 'a11y.common.atom.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_atom_accessibleHelpText', 'a11y.common.atom.accessibleHelpTextStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${stringProperty.value.replace('\n','\n ')}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const MoleculePolarityFluent = {
  "molecule-polarity": {
    titleStringProperty: _.get( MoleculePolarityStrings, 'molecule-polarity.titleStringProperty' )
  },
  screen: {
    twoAtomsStringProperty: _.get( MoleculePolarityStrings, 'screen.twoAtomsStringProperty' ),
    threeAtomsStringProperty: _.get( MoleculePolarityStrings, 'screen.threeAtomsStringProperty' ),
    realMoleculesStringProperty: _.get( MoleculePolarityStrings, 'screen.realMoleculesStringProperty' )
  },
  electricFieldStringProperty: _.get( MoleculePolarityStrings, 'electricFieldStringProperty' ),
  onStringProperty: _.get( MoleculePolarityStrings, 'onStringProperty' ),
  offStringProperty: _.get( MoleculePolarityStrings, 'offStringProperty' ),
  bondCharacterStringProperty: _.get( MoleculePolarityStrings, 'bondCharacterStringProperty' ),
  partialChargesStringProperty: _.get( MoleculePolarityStrings, 'partialChargesStringProperty' ),
  bondDipoleStringProperty: _.get( MoleculePolarityStrings, 'bondDipoleStringProperty' ),
  bondDipolesStringProperty: _.get( MoleculePolarityStrings, 'bondDipolesStringProperty' ),
  molecularDipoleStringProperty: _.get( MoleculePolarityStrings, 'molecularDipoleStringProperty' ),
  electronegativityStringProperty: _.get( MoleculePolarityStrings, 'electronegativityStringProperty' ),
  lessStringProperty: _.get( MoleculePolarityStrings, 'lessStringProperty' ),
  moreStringProperty: _.get( MoleculePolarityStrings, 'moreStringProperty' ),
  atomAStringProperty: _.get( MoleculePolarityStrings, 'atomAStringProperty' ),
  atomBStringProperty: _.get( MoleculePolarityStrings, 'atomBStringProperty' ),
  atomCStringProperty: _.get( MoleculePolarityStrings, 'atomCStringProperty' ),
  moreCovalentStringProperty: _.get( MoleculePolarityStrings, 'moreCovalentStringProperty' ),
  moreIonicStringProperty: _.get( MoleculePolarityStrings, 'moreIonicStringProperty' ),
  pattern: {
    atomNameStringProperty: _.get( MoleculePolarityStrings, 'pattern.atomNameStringProperty' ),
    symbolNameStringProperty: _.get( MoleculePolarityStrings, 'pattern.symbolNameStringProperty' ),
    dipoleDirectionStringProperty: _.get( MoleculePolarityStrings, 'pattern.dipoleDirectionStringProperty' )
  },
  noneStringProperty: _.get( MoleculePolarityStrings, 'noneStringProperty' ),
  electrostaticPotentialStringProperty: _.get( MoleculePolarityStrings, 'electrostaticPotentialStringProperty' ),
  electronDensityStringProperty: _.get( MoleculePolarityStrings, 'electronDensityStringProperty' ),
  surfaceStringProperty: _.get( MoleculePolarityStrings, 'surfaceStringProperty' ),
  viewStringProperty: _.get( MoleculePolarityStrings, 'viewStringProperty' ),
  atomLabelsStringProperty: _.get( MoleculePolarityStrings, 'atomLabelsStringProperty' ),
  moleculeStringProperty: _.get( MoleculePolarityStrings, 'moleculeStringProperty' ),
  atomElectronegativitiesStringProperty: _.get( MoleculePolarityStrings, 'atomElectronegativitiesStringProperty' ),
  positiveStringProperty: _.get( MoleculePolarityStrings, 'positiveStringProperty' ),
  negativeStringProperty: _.get( MoleculePolarityStrings, 'negativeStringProperty' ),
  ammoniaStringProperty: _.get( MoleculePolarityStrings, 'ammoniaStringProperty' ),
  boraneStringProperty: _.get( MoleculePolarityStrings, 'boraneStringProperty' ),
  boronTrifluorideStringProperty: _.get( MoleculePolarityStrings, 'boronTrifluorideStringProperty' ),
  carbonDioxideStringProperty: _.get( MoleculePolarityStrings, 'carbonDioxideStringProperty' ),
  chloroformStringProperty: _.get( MoleculePolarityStrings, 'chloroformStringProperty' ),
  difluoromethaneStringProperty: _.get( MoleculePolarityStrings, 'difluoromethaneStringProperty' ),
  fluorineStringProperty: _.get( MoleculePolarityStrings, 'fluorineStringProperty' ),
  fluoromethaneStringProperty: _.get( MoleculePolarityStrings, 'fluoromethaneStringProperty' ),
  formaldehydeStringProperty: _.get( MoleculePolarityStrings, 'formaldehydeStringProperty' ),
  hydrogenStringProperty: _.get( MoleculePolarityStrings, 'hydrogenStringProperty' ),
  hydrogenCyanideStringProperty: _.get( MoleculePolarityStrings, 'hydrogenCyanideStringProperty' ),
  hydrogenFluorideStringProperty: _.get( MoleculePolarityStrings, 'hydrogenFluorideStringProperty' ),
  methaneStringProperty: _.get( MoleculePolarityStrings, 'methaneStringProperty' ),
  nitrogenStringProperty: _.get( MoleculePolarityStrings, 'nitrogenStringProperty' ),
  oxygenStringProperty: _.get( MoleculePolarityStrings, 'oxygenStringProperty' ),
  ozoneStringProperty: _.get( MoleculePolarityStrings, 'ozoneStringProperty' ),
  tetrafluoromethaneStringProperty: _.get( MoleculePolarityStrings, 'tetrafluoromethaneStringProperty' ),
  trifluoromethaneStringProperty: _.get( MoleculePolarityStrings, 'trifluoromethaneStringProperty' ),
  waterStringProperty: _.get( MoleculePolarityStrings, 'waterStringProperty' ),
  dipoleDirectionStringProperty: _.get( MoleculePolarityStrings, 'dipoleDirectionStringProperty' ),
  deltaPlusStringProperty: _.get( MoleculePolarityStrings, 'deltaPlusStringProperty' ),
  deltaMinusStringProperty: _.get( MoleculePolarityStrings, 'deltaMinusStringProperty' ),
  surfaceColorRealMoleculesStringProperty: _.get( MoleculePolarityStrings, 'surfaceColorRealMoleculesStringProperty' ),
  underDevelopment: {
    line1StringProperty: _.get( MoleculePolarityStrings, 'underDevelopment.line1StringProperty' ),
    line2StringProperty: _.get( MoleculePolarityStrings, 'underDevelopment.line2StringProperty' )
  },
  a11y: {
    common: {
      electronegativitySlider: {
        accessibleName: new FluentPattern<{ atomName: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_electronegativitySlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.common.electronegativitySlider.accessibleNameStringProperty' ), [{"name":"atomName"}] )
      },
      atom: {
        accessibleName: new FluentPattern<{ name: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_atom_accessibleName', _.get( MoleculePolarityStrings, 'a11y.common.atom.accessibleNameStringProperty' ), [{"name":"name"}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atom_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.common.atom.accessibleHelpTextStringProperty' ) )
      }
    }
  }
};

export default MoleculePolarityFluent;

moleculePolarity.register('MoleculePolarityFluent', MoleculePolarityFluent);
