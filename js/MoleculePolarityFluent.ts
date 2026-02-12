// Copyright 2025-2026, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from molecule-polarity-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import { TReadOnlyProperty } from '../../axon/js/TReadOnlyProperty.js';
import FluentLibrary from '../../chipper/js/browser-and-node/FluentLibrary.js';
import FluentComment from '../../chipper/js/browser/FluentComment.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import type {FluentVariable} from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
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
addToMapIfDefined( 'bondCharacter', 'bondCharacterStringProperty' );
addToMapIfDefined( 'partialCharges', 'partialChargesStringProperty' );
addToMapIfDefined( 'bondDipole', 'bondDipoleStringProperty' );
addToMapIfDefined( 'bondDipoles', 'bondDipolesStringProperty' );
addToMapIfDefined( 'molecularDipole', 'molecularDipoleStringProperty' );
addToMapIfDefined( 'electronegativity', 'electronegativityStringProperty' );
addToMapIfDefined( 'less', 'lessStringProperty' );
addToMapIfDefined( 'more', 'moreStringProperty' );
addToMapIfDefined( 'A', 'AStringProperty' );
addToMapIfDefined( 'B', 'BStringProperty' );
addToMapIfDefined( 'C', 'CStringProperty' );
addToMapIfDefined( 'moreCovalent', 'moreCovalentStringProperty' );
addToMapIfDefined( 'moreIonic', 'moreIonicStringProperty' );
addToMapIfDefined( 'none', 'noneStringProperty' );
addToMapIfDefined( 'electrostaticPotential', 'electrostaticPotentialStringProperty' );
addToMapIfDefined( 'electronDensity', 'electronDensityStringProperty' );
addToMapIfDefined( 'basic', 'basicStringProperty' );
addToMapIfDefined( 'advanced', 'advancedStringProperty' );
addToMapIfDefined( 'surface', 'surfaceStringProperty' );
addToMapIfDefined( 'model', 'modelStringProperty' );
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
addToMapIfDefined( 'dipoleDirectionDescription', 'dipoleDirectionDescriptionStringProperty' );
addToMapIfDefined( 'deltaPlus', 'deltaPlusStringProperty' );
addToMapIfDefined( 'deltaMinus', 'deltaMinusStringProperty' );
addToMapIfDefined( 'surfaceColorRealMolecules', 'surfaceColorRealMoleculesStringProperty' );
addToMapIfDefined( 'surfaceColorDescription', 'surfaceColorDescriptionStringProperty' );
addToMapIfDefined( 'a11y_common_upper', 'a11y.common.upperStringProperty' );
addToMapIfDefined( 'a11y_common_elements_hydrogen', 'a11y.common.elements.hydrogenStringProperty' );
addToMapIfDefined( 'a11y_common_elements_boron', 'a11y.common.elements.boronStringProperty' );
addToMapIfDefined( 'a11y_common_elements_carbon', 'a11y.common.elements.carbonStringProperty' );
addToMapIfDefined( 'a11y_common_elements_nitrogen', 'a11y.common.elements.nitrogenStringProperty' );
addToMapIfDefined( 'a11y_common_elements_oxygen', 'a11y.common.elements.oxygenStringProperty' );
addToMapIfDefined( 'a11y_common_elements_fluorine', 'a11y.common.elements.fluorineStringProperty' );
addToMapIfDefined( 'a11y_common_elements_chlorine', 'a11y.common.elements.chlorineStringProperty' );
addToMapIfDefined( 'a11y_common_preferencesDialog_positiveToNegative', 'a11y.common.preferencesDialog.positiveToNegativeStringProperty' );
addToMapIfDefined( 'a11y_common_preferencesDialog_negativeToPositive', 'a11y.common.preferencesDialog.negativeToPositiveStringProperty' );
addToMapIfDefined( 'a11y_common_preferencesDialog_blueToRed', 'a11y.common.preferencesDialog.blueToRedStringProperty' );
addToMapIfDefined( 'a11y_common_preferencesDialog_rainbowBlueToRed', 'a11y.common.preferencesDialog.rainbowBlueToRedStringProperty' );
addToMapIfDefined( 'a11y_common_screenIcons_twoAtoms', 'a11y.common.screenIcons.twoAtomsStringProperty' );
addToMapIfDefined( 'a11y_common_screenIcons_threeAtoms', 'a11y.common.screenIcons.threeAtomsStringProperty' );
addToMapIfDefined( 'a11y_common_screenIcons_realMolecules', 'a11y.common.screenIcons.realMoleculesStringProperty' );
addToMapIfDefined( 'a11y_common_electronegativitySlider_accessibleName', 'a11y.common.electronegativitySlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_electronegativitySlider_dipoleContext', 'a11y.common.electronegativitySlider.dipoleContextStringProperty' );
addToMapIfDefined( 'a11y_common_electronegativitySlider_dipoleDirectionChange', 'a11y.common.electronegativitySlider.dipoleDirectionChangeStringProperty' );
addToMapIfDefined( 'a11y_common_electronegativitySlider_bondCharacterContext', 'a11y.common.electronegativitySlider.bondCharacterContextStringProperty' );
addToMapIfDefined( 'a11y_common_electronegativitySlider_electrostaticContext', 'a11y.common.electronegativitySlider.electrostaticContextStringProperty' );
addToMapIfDefined( 'a11y_common_electronegativitySlider_electronDensityContext', 'a11y.common.electronegativitySlider.electronDensityContextStringProperty' );
addToMapIfDefined( 'a11y_common_electronegativitySlider_electricFieldContext', 'a11y.common.electronegativitySlider.electricFieldContextStringProperty' );
addToMapIfDefined( 'a11y_common_bondDipoleCheckbox_accessibleName', 'a11y.common.bondDipoleCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_bondDipoleCheckbox_accessibleNamePlural', 'a11y.common.bondDipoleCheckbox.accessibleNamePluralStringProperty' );
addToMapIfDefined( 'a11y_common_bondDipoleCheckbox_accessibleHelpText', 'a11y.common.bondDipoleCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_bondDipoleCheckbox_accessibleHelpTextPlural', 'a11y.common.bondDipoleCheckbox.accessibleHelpTextPluralStringProperty' );
addToMapIfDefined( 'a11y_common_bondDipoleCheckbox_checked', 'a11y.common.bondDipoleCheckbox.checkedStringProperty' );
addToMapIfDefined( 'a11y_common_bondDipoleCheckbox_unchecked', 'a11y.common.bondDipoleCheckbox.uncheckedStringProperty' );
addToMapIfDefined( 'a11y_common_bondDipoleCheckbox_checkedPlural', 'a11y.common.bondDipoleCheckbox.checkedPluralStringProperty' );
addToMapIfDefined( 'a11y_common_bondDipoleCheckbox_uncheckedPlural', 'a11y.common.bondDipoleCheckbox.uncheckedPluralStringProperty' );
addToMapIfDefined( 'a11y_common_partialChargesCheckbox_accessibleName', 'a11y.common.partialChargesCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_partialChargesCheckbox_accessibleHelpText', 'a11y.common.partialChargesCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_partialChargesCheckbox_checked', 'a11y.common.partialChargesCheckbox.checkedStringProperty' );
addToMapIfDefined( 'a11y_common_partialChargesCheckbox_unchecked', 'a11y.common.partialChargesCheckbox.uncheckedStringProperty' );
addToMapIfDefined( 'a11y_common_bondCharacterCheckbox_accessibleName', 'a11y.common.bondCharacterCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_bondCharacterCheckbox_accessibleHelpText', 'a11y.common.bondCharacterCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_bondCharacterCheckbox_checked', 'a11y.common.bondCharacterCheckbox.checkedStringProperty' );
addToMapIfDefined( 'a11y_common_bondCharacterCheckbox_unchecked', 'a11y.common.bondCharacterCheckbox.uncheckedStringProperty' );
addToMapIfDefined( 'a11y_common_molecularDipoleCheckbox_accessibleName', 'a11y.common.molecularDipoleCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_molecularDipoleCheckbox_accessibleHelpText', 'a11y.common.molecularDipoleCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_molecularDipoleCheckbox_checked', 'a11y.common.molecularDipoleCheckbox.checkedStringProperty' );
addToMapIfDefined( 'a11y_common_molecularDipoleCheckbox_unchecked', 'a11y.common.molecularDipoleCheckbox.uncheckedStringProperty' );
addToMapIfDefined( 'a11y_common_atomLabelsCheckbox_accessibleName', 'a11y.common.atomLabelsCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_atomLabelsCheckbox_accessibleHelpText', 'a11y.common.atomLabelsCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_atomLabelsCheckbox_checked', 'a11y.common.atomLabelsCheckbox.checkedStringProperty' );
addToMapIfDefined( 'a11y_common_atomLabelsCheckbox_unchecked', 'a11y.common.atomLabelsCheckbox.uncheckedStringProperty' );
addToMapIfDefined( 'a11y_common_atomElectronegativitiesCheckbox_accessibleName', 'a11y.common.atomElectronegativitiesCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_atomElectronegativitiesCheckbox_accessibleHelpText', 'a11y.common.atomElectronegativitiesCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_atomElectronegativitiesCheckbox_checked', 'a11y.common.atomElectronegativitiesCheckbox.checkedStringProperty' );
addToMapIfDefined( 'a11y_common_atomElectronegativitiesCheckbox_unchecked', 'a11y.common.atomElectronegativitiesCheckbox.uncheckedStringProperty' );
addToMapIfDefined( 'a11y_common_surfaceRadioButtonGroup_accessibleName', 'a11y.common.surfaceRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_surfaceRadioButtonGroup_accessibleHelpText', 'a11y.common.surfaceRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_surfaceRadioButtonGroup_electrostaticPotentialHelpText', 'a11y.common.surfaceRadioButtonGroup.electrostaticPotentialHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_surfaceRadioButtonGroup_electronDensityHelpText', 'a11y.common.surfaceRadioButtonGroup.electronDensityHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_surfaceRadioButtonGroup_noneSelected', 'a11y.common.surfaceRadioButtonGroup.noneSelectedStringProperty' );
addToMapIfDefined( 'a11y_common_surfaceRadioButtonGroup_electrostaticSelected', 'a11y.common.surfaceRadioButtonGroup.electrostaticSelectedStringProperty' );
addToMapIfDefined( 'a11y_common_surfaceRadioButtonGroup_electronDensitySelected', 'a11y.common.surfaceRadioButtonGroup.electronDensitySelectedStringProperty' );
addToMapIfDefined( 'a11y_common_electricFieldToggle_accessibleName', 'a11y.common.electricFieldToggle.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_electricFieldToggle_accessibleHelpText', 'a11y.common.electricFieldToggle.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_common_electricFieldToggle_on', 'a11y.common.electricFieldToggle.onStringProperty' );
addToMapIfDefined( 'a11y_common_electricFieldToggle_off', 'a11y.common.electricFieldToggle.offStringProperty' );
addToMapIfDefined( 'a11y_common_atom_accessibleName', 'a11y.common.atom.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_moveMolecule', 'a11y.common.keyboardHelpContent.moveMoleculeStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_rotateMolecule', 'a11y.common.keyboardHelpContent.rotateMoleculeStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_rotateInSmallerSteps', 'a11y.common.keyboardHelpContent.rotateInSmallerStepsStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_moveAtomsOrMolecule', 'a11y.common.keyboardHelpContent.moveAtomsOrMoleculeStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_moveAtomAAndC', 'a11y.common.keyboardHelpContent.moveAtomAAndCStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_rotateOrMoveInSmallerSteps', 'a11y.common.keyboardHelpContent.rotateOrMoveInSmallerStepsStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_chooseRealMolecule', 'a11y.common.keyboardHelpContent.chooseRealMoleculeStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_molecule', 'a11y.common.keyboardHelpContent.moleculeStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_molecules', 'a11y.common.keyboardHelpContent.moleculesStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_rotateMoleculeWASD', 'a11y.common.keyboardHelpContent.rotateMoleculeWASDStringProperty' );
addToMapIfDefined( 'a11y_common_keyboardHelpContent_rotateInSmallerStepsWASD', 'a11y.common.keyboardHelpContent.rotateInSmallerStepsWASDStringProperty' );
addToMapIfDefined( 'a11y_common_bondDipoleDirection', 'a11y.common.bondDipoleDirectionStringProperty' );
addToMapIfDefined( 'a11y_common_molecularDipoleResponses_molecularDipoleContext', 'a11y.common.molecularDipoleResponses.molecularDipoleContextStringProperty' );
addToMapIfDefined( 'a11y_common_molecularDipoleResponses_molecularDipoleDirection', 'a11y.common.molecularDipoleResponses.molecularDipoleDirectionStringProperty' );
addToMapIfDefined( 'a11y_common_molecularDipoleResponses_molecularDipoleDirectionOnly', 'a11y.common.molecularDipoleResponses.molecularDipoleDirectionOnlyStringProperty' );
addToMapIfDefined( 'a11y_common_electronegativity_heading', 'a11y.common.electronegativity.headingStringProperty' );
addToMapIfDefined( 'a11y_common_electronegativity_currentValue', 'a11y.common.electronegativity.currentValueStringProperty' );
addToMapIfDefined( 'a11y_common_electronegativity_description', 'a11y.common.electronegativity.descriptionStringProperty' );
addToMapIfDefined( 'a11y_common_electronegativity_elementElectronegativity', 'a11y.common.electronegativity.elementElectronegativityStringProperty' );
addToMapIfDefined( 'a11y_common_electronegativity_accessibleHelpText', 'a11y.common.electronegativity.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_bondCharacter', 'a11y.bondCharacterStringProperty' );
addToMapIfDefined( 'a11y_bondCharacterProgress', 'a11y.bondCharacterProgressStringProperty' );
addToMapIfDefined( 'a11y_dipoleProgress', 'a11y.dipoleProgressStringProperty' );
addToMapIfDefined( 'a11y_electronDensity', 'a11y.electronDensityStringProperty' );
addToMapIfDefined( 'a11y_electronDensityShift', 'a11y.electronDensityShiftStringProperty' );
addToMapIfDefined( 'a11y_electronDensityProgress', 'a11y.electronDensityProgressStringProperty' );
addToMapIfDefined( 'a11y_electrostaticPotentialUppercase', 'a11y.electrostaticPotentialUppercaseStringProperty' );
addToMapIfDefined( 'a11y_electrostaticPotentialProgress', 'a11y.electrostaticPotentialProgressStringProperty' );
addToMapIfDefined( 'a11y_electrostaticRegions', 'a11y.electrostaticRegionsStringProperty' );
addToMapIfDefined( 'a11y_electronegativity', 'a11y.electronegativityStringProperty' );
addToMapIfDefined( 'a11y_field', 'a11y.fieldStringProperty' );
addToMapIfDefined( 'a11y_molecularDipole', 'a11y.molecularDipoleStringProperty' );
addToMapIfDefined( 'a11y_atAngle', 'a11y.atAngleStringProperty' );
addToMapIfDefined( 'a11y_toAngle', 'a11y.toAngleStringProperty' );
addToMapIfDefined( 'a11y_betweenAngles', 'a11y.betweenAnglesStringProperty' );
addToMapIfDefined( 'a11y_degrees', 'a11y.degreesStringProperty' );
addToMapIfDefined( 'a11y_oClock', 'a11y.oClockStringProperty' );
addToMapIfDefined( 'a11y_orientationMolecule', 'a11y.orientationMoleculeStringProperty' );
addToMapIfDefined( 'a11y_partialChargeSign', 'a11y.partialChargeSignStringProperty' );
addToMapIfDefined( 'a11y_polarity', 'a11y.polarityStringProperty' );
addToMapIfDefined( 'a11y_partialChargeMagnitude', 'a11y.partialChargeMagnitudeStringProperty' );
addToMapIfDefined( 'a11y_bondDipole', 'a11y.bondDipoleStringProperty' );
addToMapIfDefined( 'a11y_molecularPolarity', 'a11y.molecularPolarityStringProperty' );
addToMapIfDefined( 'a11y_rotation', 'a11y.rotationStringProperty' );
addToMapIfDefined( 'a11y_shape', 'a11y.shapeStringProperty' );
addToMapIfDefined( 'a11y_shapeGeometry', 'a11y.shapeGeometryStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_screenSummary_playArea', 'a11y.twoAtomsScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_screenSummary_controlArea', 'a11y.twoAtomsScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_screenSummary_currentDetails', 'a11y.twoAtomsScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_screenSummary_interactionHint', 'a11y.twoAtomsScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_heading', 'a11y.twoAtomsScreen.moleculeAB.headingStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_currentState', 'a11y.twoAtomsScreen.moleculeAB.currentStateStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_bondDipoleDescription', 'a11y.twoAtomsScreen.moleculeAB.bondDipoleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_bondDipoleDirection', 'a11y.twoAtomsScreen.moleculeAB.bondDipoleDirectionStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_partialChargesDescription', 'a11y.twoAtomsScreen.moleculeAB.partialChargesDescriptionStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_partialChargesDetail', 'a11y.twoAtomsScreen.moleculeAB.partialChargesDetailStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_bondCharacterDescription', 'a11y.twoAtomsScreen.moleculeAB.bondCharacterDescriptionStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_electrostaticPotentialDescription', 'a11y.twoAtomsScreen.moleculeAB.electrostaticPotentialDescriptionStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_electrostaticPotentialRegions', 'a11y.twoAtomsScreen.moleculeAB.electrostaticPotentialRegionsStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_electronDensityDescription_firstTwoRegions', 'a11y.twoAtomsScreen.moleculeAB.electronDensityDescription.firstTwoRegionsStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_electronDensityDescription_lastFourRegions', 'a11y.twoAtomsScreen.moleculeAB.electronDensityDescription.lastFourRegionsStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_electricFieldAligned', 'a11y.twoAtomsScreen.moleculeAB.electricFieldAlignedStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_orientationDescription', 'a11y.twoAtomsScreen.moleculeAB.orientationDescriptionStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_accessibleName', 'a11y.twoAtomsScreen.rotateMoleculeSlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_accessibleHelpText', 'a11y.twoAtomsScreen.rotateMoleculeSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_electricFieldContext', 'a11y.twoAtomsScreen.rotateMoleculeSlider.electricFieldContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_screenSummary_playArea', 'a11y.threeAtomsScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_screenSummary_controlArea', 'a11y.threeAtomsScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_screenSummary_currentDetails', 'a11y.threeAtomsScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_screenSummary_interactionHint', 'a11y.threeAtomsScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_heading', 'a11y.threeAtomsScreen.moleculeABC.headingStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_currentState', 'a11y.threeAtomsScreen.moleculeABC.currentStateStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_orientationDescription', 'a11y.threeAtomsScreen.moleculeABC.orientationDescriptionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_electricFieldAligned', 'a11y.threeAtomsScreen.moleculeABC.electricFieldAlignedStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_electronegativityValues', 'a11y.threeAtomsScreen.moleculeABC.electronegativityValuesStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_molecularDipoleDescription', 'a11y.threeAtomsScreen.moleculeABC.molecularDipoleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_molecularDipoleDirection', 'a11y.threeAtomsScreen.moleculeABC.molecularDipoleDirectionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_molecularDipoleTwice', 'a11y.threeAtomsScreen.moleculeABC.molecularDipoleTwiceStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_bondDipoleAB', 'a11y.threeAtomsScreen.moleculeABC.bondDipoleABStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_bondDipoleABDescription', 'a11y.threeAtomsScreen.moleculeABC.bondDipoleABDescriptionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_bondDipoleBC', 'a11y.threeAtomsScreen.moleculeABC.bondDipoleBCStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_bondDipoleBCDescription', 'a11y.threeAtomsScreen.moleculeABC.bondDipoleBCDescriptionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_overlapping', 'a11y.threeAtomsScreen.moleculeABC.overlappingStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_onTopOf', 'a11y.threeAtomsScreen.moleculeABC.onTopOfStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_partialChargesDescription', 'a11y.threeAtomsScreen.moleculeABC.partialChargesDescriptionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomASlider_accessibleName', 'a11y.threeAtomsScreen.moveAtomASlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomASlider_accessibleHelpText', 'a11y.threeAtomsScreen.moveAtomASlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomCSlider_accessibleName', 'a11y.threeAtomsScreen.moveAtomCSlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomCSlider_accessibleHelpText', 'a11y.threeAtomsScreen.moveAtomCSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_accessibleName', 'a11y.threeAtomsScreen.rotateMoleculeSlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_accessibleHelpText', 'a11y.threeAtomsScreen.rotateMoleculeSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_screenSummary_playArea', 'a11y.realMoleculesScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_screenSummary_controlArea', 'a11y.realMoleculesScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_screenSummary_currentDetails', 'a11y.realMoleculesScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_screenSummary_interactionHint', 'a11y.realMoleculesScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_realMolecule', 'a11y.realMoleculesScreen.realMoleculeStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_draggableMolecule_accessibleName', 'a11y.realMoleculesScreen.draggableMolecule.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_draggableMolecule_accessibleHelpText', 'a11y.realMoleculesScreen.draggableMolecule.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_draggableMolecule_objectResponses', 'a11y.realMoleculesScreen.draggableMolecule.objectResponsesStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_electronegativitiesTable', 'a11y.realMoleculesScreen.electronegativitiesTableStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculeComboBox_accessibleName', 'a11y.realMoleculesScreen.moleculeComboBox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculeComboBox_accessibleHelpText', 'a11y.realMoleculesScreen.moleculeComboBox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_modelRadioButtonGroup_accessibleName', 'a11y.realMoleculesScreen.modelRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_modelRadioButtonGroup_basicHelpText', 'a11y.realMoleculesScreen.modelRadioButtonGroup.basicHelpTextStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_modelRadioButtonGroup_advancedHelpText', 'a11y.realMoleculesScreen.modelRadioButtonGroup.advancedHelpTextStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_molecules_description', 'a11y.realMoleculesScreen.molecules.descriptionStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_molecules_bondDipole', 'a11y.realMoleculesScreen.molecules.bondDipoleStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_molecules_molecularDipole', 'a11y.realMoleculesScreen.molecules.molecularDipoleStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_molecules_electrostaticPotential', 'a11y.realMoleculesScreen.molecules.electrostaticPotentialStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_molecules_electronDensity', 'a11y.realMoleculesScreen.molecules.electronDensityStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_description', 'a11y.realMoleculesScreen.moleculesAdvanced.descriptionStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_bondDipole', 'a11y.realMoleculesScreen.moleculesAdvanced.bondDipoleStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_molecularDipole', 'a11y.realMoleculesScreen.moleculesAdvanced.molecularDipoleStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_electrostaticPotential', 'a11y.realMoleculesScreen.moleculesAdvanced.electrostaticPotentialStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_hydrogen', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.hydrogenStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_nitrogen', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.nitrogenStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_oxygen', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.oxygenStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_fluorine', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.fluorineStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_hydrogenFluoride', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.hydrogenFluorideStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_water', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.waterStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_carbonDioxide', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.carbonDioxideStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_hydrogenCyanide', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.hydrogenCyanideStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_ozone', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.ozoneStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_ammonia', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.ammoniaStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_borane', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.boraneStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_boronTrifluoride', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.boronTrifluorideStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_formaldehyde', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.formaldehydeStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_methane', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.methaneStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_fluoromethane', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.fluoromethaneStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_difluoromethane', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.difluoromethaneStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_trifluoromethane', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.trifluoromethaneStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_tetrafluoromethane', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.tetrafluoromethaneStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_chloroform', 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.chloroformStringProperty' );
addToMapIfDefined( 'a11y_realMoleculesScreen_moleculesAdvanced_electronDensity', 'a11y.realMoleculesScreen.moleculesAdvanced.electronDensityStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${FluentLibrary.formatMultilineForFtl( stringProperty.value )}\n`;
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
  _comment_0: new FluentComment( {"comment":"===================","associatedKey":"bondCharacter"} ),
  _comment_1: new FluentComment( {"comment":"REGIONS / PARAMETERS","associatedKey":"bondCharacter"} ),
  _comment_2: new FluentComment( {"comment":"===================","associatedKey":"bondCharacter"} ),
  _comment_3: new FluentComment( {"comment":"BondChar6 - Bond Character (Screen 1)","associatedKey":"bondCharacter"} ),
  bondCharacterStringProperty: _.get( MoleculePolarityStrings, 'bondCharacterStringProperty' ),
  partialChargesStringProperty: _.get( MoleculePolarityStrings, 'partialChargesStringProperty' ),
  _comment_4: new FluentComment( {"comment":"bondDipole6 - Bond Dipole magnitude (Screen 1)","associatedKey":"bondDipole"} ),
  bondDipoleStringProperty: _.get( MoleculePolarityStrings, 'bondDipoleStringProperty' ),
  bondDipolesStringProperty: _.get( MoleculePolarityStrings, 'bondDipolesStringProperty' ),
  _comment_5: new FluentComment( {"comment":"MolecularDipole11 - Molecular Dipole magnitude (Screen 2)","associatedKey":"molecularDipole"} ),
  molecularDipoleStringProperty: _.get( MoleculePolarityStrings, 'molecularDipoleStringProperty' ),
  _comment_6: new FluentComment( {"comment":"Electronegativity description","associatedKey":"electronegativity"} ),
  _comment_7: new FluentComment( {"comment":"EN6 - Electronegativity levels (Screen 1/2)","associatedKey":"electronegativity"} ),
  electronegativityStringProperty: _.get( MoleculePolarityStrings, 'electronegativityStringProperty' ),
  lessStringProperty: _.get( MoleculePolarityStrings, 'lessStringProperty' ),
  moreStringProperty: _.get( MoleculePolarityStrings, 'moreStringProperty' ),
  AStringProperty: _.get( MoleculePolarityStrings, 'AStringProperty' ),
  BStringProperty: _.get( MoleculePolarityStrings, 'BStringProperty' ),
  CStringProperty: _.get( MoleculePolarityStrings, 'CStringProperty' ),
  moreCovalentStringProperty: _.get( MoleculePolarityStrings, 'moreCovalentStringProperty' ),
  moreIonicStringProperty: _.get( MoleculePolarityStrings, 'moreIonicStringProperty' ),
  pattern: {
    atomNameStringProperty: _.get( MoleculePolarityStrings, 'pattern.atomNameStringProperty' ),
    symbolNameStringProperty: _.get( MoleculePolarityStrings, 'pattern.symbolNameStringProperty' ),
    dipoleDirectionStringProperty: _.get( MoleculePolarityStrings, 'pattern.dipoleDirectionStringProperty' )
  },
  noneStringProperty: _.get( MoleculePolarityStrings, 'noneStringProperty' ),
  electrostaticPotentialStringProperty: _.get( MoleculePolarityStrings, 'electrostaticPotentialStringProperty' ),
  _comment_8: new FluentComment( {"comment":"ElectronDensity6 - Electron Density (Screen 1)","associatedKey":"electronDensity"} ),
  electronDensityStringProperty: _.get( MoleculePolarityStrings, 'electronDensityStringProperty' ),
  basicStringProperty: _.get( MoleculePolarityStrings, 'basicStringProperty' ),
  advancedStringProperty: _.get( MoleculePolarityStrings, 'advancedStringProperty' ),
  surfaceStringProperty: _.get( MoleculePolarityStrings, 'surfaceStringProperty' ),
  modelStringProperty: _.get( MoleculePolarityStrings, 'modelStringProperty' ),
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
  dipoleDirectionDescriptionStringProperty: _.get( MoleculePolarityStrings, 'dipoleDirectionDescriptionStringProperty' ),
  deltaPlusStringProperty: _.get( MoleculePolarityStrings, 'deltaPlusStringProperty' ),
  deltaMinusStringProperty: _.get( MoleculePolarityStrings, 'deltaMinusStringProperty' ),
  deltaNonNegativeValueStringProperty: _.get( MoleculePolarityStrings, 'deltaNonNegativeValueStringProperty' ),
  deltaNegativeValueStringProperty: _.get( MoleculePolarityStrings, 'deltaNegativeValueStringProperty' ),
  surfaceColorRealMoleculesStringProperty: _.get( MoleculePolarityStrings, 'surfaceColorRealMoleculesStringProperty' ),
  surfaceColorDescriptionStringProperty: _.get( MoleculePolarityStrings, 'surfaceColorDescriptionStringProperty' ),
  a11y: {
    common: {
      upperStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_upper', _.get( MoleculePolarityStrings, 'a11y.common.upperStringProperty' ) ),
      elements: {
        hydrogenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_elements_hydrogen', _.get( MoleculePolarityStrings, 'a11y.common.elements.hydrogenStringProperty' ) ),
        boronStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_elements_boron', _.get( MoleculePolarityStrings, 'a11y.common.elements.boronStringProperty' ) ),
        carbonStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_elements_carbon', _.get( MoleculePolarityStrings, 'a11y.common.elements.carbonStringProperty' ) ),
        nitrogenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_elements_nitrogen', _.get( MoleculePolarityStrings, 'a11y.common.elements.nitrogenStringProperty' ) ),
        oxygenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_elements_oxygen', _.get( MoleculePolarityStrings, 'a11y.common.elements.oxygenStringProperty' ) ),
        fluorineStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_elements_fluorine', _.get( MoleculePolarityStrings, 'a11y.common.elements.fluorineStringProperty' ) ),
        chlorineStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_elements_chlorine', _.get( MoleculePolarityStrings, 'a11y.common.elements.chlorineStringProperty' ) )
      },
      preferencesDialog: {
        positiveToNegativeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_preferencesDialog_positiveToNegative', _.get( MoleculePolarityStrings, 'a11y.common.preferencesDialog.positiveToNegativeStringProperty' ) ),
        negativeToPositiveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_preferencesDialog_negativeToPositive', _.get( MoleculePolarityStrings, 'a11y.common.preferencesDialog.negativeToPositiveStringProperty' ) ),
        blueToRedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_preferencesDialog_blueToRed', _.get( MoleculePolarityStrings, 'a11y.common.preferencesDialog.blueToRedStringProperty' ) ),
        rainbowBlueToRedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_preferencesDialog_rainbowBlueToRed', _.get( MoleculePolarityStrings, 'a11y.common.preferencesDialog.rainbowBlueToRedStringProperty' ) )
      },
      screenIcons: {
        twoAtomsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_screenIcons_twoAtoms', _.get( MoleculePolarityStrings, 'a11y.common.screenIcons.twoAtomsStringProperty' ) ),
        threeAtomsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_screenIcons_threeAtoms', _.get( MoleculePolarityStrings, 'a11y.common.screenIcons.threeAtomsStringProperty' ) ),
        realMoleculesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_screenIcons_realMolecules', _.get( MoleculePolarityStrings, 'a11y.common.screenIcons.realMoleculesStringProperty' ) )
      },
      electronegativitySlider: {
        accessibleName: new FluentPattern<{ atomName: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_electronegativitySlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.common.electronegativitySlider.accessibleNameStringProperty' ), [{"name":"atomName"}] ),
        dipoleContext: new FluentPattern<{ bond: FluentVariable, progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_electronegativitySlider_dipoleContext', _.get( MoleculePolarityStrings, 'a11y.common.electronegativitySlider.dipoleContextStringProperty' ), [{"name":"bond"},{"name":"progress"}] ),
        dipoleDirectionChange: new FluentPattern<{ atom: FluentVariable, bond: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_electronegativitySlider_dipoleDirectionChange', _.get( MoleculePolarityStrings, 'a11y.common.electronegativitySlider.dipoleDirectionChangeStringProperty' ), [{"name":"atom"},{"name":"bond"}] ),
        bondCharacterContext: new FluentPattern<{ progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_electronegativitySlider_bondCharacterContext', _.get( MoleculePolarityStrings, 'a11y.common.electronegativitySlider.bondCharacterContextStringProperty' ), [{"name":"progress"}] ),
        electrostaticContext: new FluentPattern<{ atom: FluentVariable, progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_electronegativitySlider_electrostaticContext', _.get( MoleculePolarityStrings, 'a11y.common.electronegativitySlider.electrostaticContextStringProperty' ), [{"name":"atom"},{"name":"progress"}] ),
        electronDensityContext: new FluentPattern<{ atom: FluentVariable, progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_electronegativitySlider_electronDensityContext', _.get( MoleculePolarityStrings, 'a11y.common.electronegativitySlider.electronDensityContextStringProperty' ), [{"name":"atom"},{"name":"progress"}] ),
        electricFieldContextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_electronegativitySlider_electricFieldContext', _.get( MoleculePolarityStrings, 'a11y.common.electronegativitySlider.electricFieldContextStringProperty' ) )
      },
      bondDipoleCheckbox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_bondDipoleCheckbox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.common.bondDipoleCheckbox.accessibleNameStringProperty' ) ),
        accessibleNamePluralStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_bondDipoleCheckbox_accessibleNamePlural', _.get( MoleculePolarityStrings, 'a11y.common.bondDipoleCheckbox.accessibleNamePluralStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_bondDipoleCheckbox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.common.bondDipoleCheckbox.accessibleHelpTextStringProperty' ) ),
        accessibleHelpTextPluralStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_bondDipoleCheckbox_accessibleHelpTextPlural', _.get( MoleculePolarityStrings, 'a11y.common.bondDipoleCheckbox.accessibleHelpTextPluralStringProperty' ) ),
        checkedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_bondDipoleCheckbox_checked', _.get( MoleculePolarityStrings, 'a11y.common.bondDipoleCheckbox.checkedStringProperty' ) ),
        uncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_bondDipoleCheckbox_unchecked', _.get( MoleculePolarityStrings, 'a11y.common.bondDipoleCheckbox.uncheckedStringProperty' ) ),
        checkedPluralStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_bondDipoleCheckbox_checkedPlural', _.get( MoleculePolarityStrings, 'a11y.common.bondDipoleCheckbox.checkedPluralStringProperty' ) ),
        uncheckedPluralStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_bondDipoleCheckbox_uncheckedPlural', _.get( MoleculePolarityStrings, 'a11y.common.bondDipoleCheckbox.uncheckedPluralStringProperty' ) )
      },
      partialChargesCheckbox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_partialChargesCheckbox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.common.partialChargesCheckbox.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_partialChargesCheckbox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.common.partialChargesCheckbox.accessibleHelpTextStringProperty' ) ),
        checkedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_partialChargesCheckbox_checked', _.get( MoleculePolarityStrings, 'a11y.common.partialChargesCheckbox.checkedStringProperty' ) ),
        uncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_partialChargesCheckbox_unchecked', _.get( MoleculePolarityStrings, 'a11y.common.partialChargesCheckbox.uncheckedStringProperty' ) )
      },
      bondCharacterCheckbox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_bondCharacterCheckbox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.common.bondCharacterCheckbox.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_bondCharacterCheckbox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.common.bondCharacterCheckbox.accessibleHelpTextStringProperty' ) ),
        checkedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_bondCharacterCheckbox_checked', _.get( MoleculePolarityStrings, 'a11y.common.bondCharacterCheckbox.checkedStringProperty' ) ),
        uncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_bondCharacterCheckbox_unchecked', _.get( MoleculePolarityStrings, 'a11y.common.bondCharacterCheckbox.uncheckedStringProperty' ) )
      },
      molecularDipoleCheckbox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_molecularDipoleCheckbox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.common.molecularDipoleCheckbox.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_molecularDipoleCheckbox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.common.molecularDipoleCheckbox.accessibleHelpTextStringProperty' ) ),
        checkedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_molecularDipoleCheckbox_checked', _.get( MoleculePolarityStrings, 'a11y.common.molecularDipoleCheckbox.checkedStringProperty' ) ),
        uncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_molecularDipoleCheckbox_unchecked', _.get( MoleculePolarityStrings, 'a11y.common.molecularDipoleCheckbox.uncheckedStringProperty' ) )
      },
      atomLabelsCheckbox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomLabelsCheckbox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.common.atomLabelsCheckbox.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomLabelsCheckbox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.common.atomLabelsCheckbox.accessibleHelpTextStringProperty' ) ),
        checkedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomLabelsCheckbox_checked', _.get( MoleculePolarityStrings, 'a11y.common.atomLabelsCheckbox.checkedStringProperty' ) ),
        uncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomLabelsCheckbox_unchecked', _.get( MoleculePolarityStrings, 'a11y.common.atomLabelsCheckbox.uncheckedStringProperty' ) )
      },
      atomElectronegativitiesCheckbox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomElectronegativitiesCheckbox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.common.atomElectronegativitiesCheckbox.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomElectronegativitiesCheckbox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.common.atomElectronegativitiesCheckbox.accessibleHelpTextStringProperty' ) ),
        checkedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomElectronegativitiesCheckbox_checked', _.get( MoleculePolarityStrings, 'a11y.common.atomElectronegativitiesCheckbox.checkedStringProperty' ) ),
        uncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_atomElectronegativitiesCheckbox_unchecked', _.get( MoleculePolarityStrings, 'a11y.common.atomElectronegativitiesCheckbox.uncheckedStringProperty' ) )
      },
      surfaceRadioButtonGroup: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_surfaceRadioButtonGroup_accessibleName', _.get( MoleculePolarityStrings, 'a11y.common.surfaceRadioButtonGroup.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_surfaceRadioButtonGroup_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.common.surfaceRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
        electrostaticPotentialHelpText: new FluentPattern<{ colorMap: 'blueWhiteRed' | 'rainbow' | TReadOnlyProperty<'blueWhiteRed' | 'rainbow'> }>( fluentSupport.bundleProperty, 'a11y_common_surfaceRadioButtonGroup_electrostaticPotentialHelpText', _.get( MoleculePolarityStrings, 'a11y.common.surfaceRadioButtonGroup.electrostaticPotentialHelpTextStringProperty' ), [{"name":"colorMap","variants":["blueWhiteRed","rainbow"]}] ),
        electronDensityHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_surfaceRadioButtonGroup_electronDensityHelpText', _.get( MoleculePolarityStrings, 'a11y.common.surfaceRadioButtonGroup.electronDensityHelpTextStringProperty' ) ),
        noneSelectedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_surfaceRadioButtonGroup_noneSelected', _.get( MoleculePolarityStrings, 'a11y.common.surfaceRadioButtonGroup.noneSelectedStringProperty' ) ),
        electrostaticSelectedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_surfaceRadioButtonGroup_electrostaticSelected', _.get( MoleculePolarityStrings, 'a11y.common.surfaceRadioButtonGroup.electrostaticSelectedStringProperty' ) ),
        electronDensitySelectedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_surfaceRadioButtonGroup_electronDensitySelected', _.get( MoleculePolarityStrings, 'a11y.common.surfaceRadioButtonGroup.electronDensitySelectedStringProperty' ) )
      },
      electricFieldToggle: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_electricFieldToggle_accessibleName', _.get( MoleculePolarityStrings, 'a11y.common.electricFieldToggle.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_electricFieldToggle_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.common.electricFieldToggle.accessibleHelpTextStringProperty' ) ),
        onStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_electricFieldToggle_on', _.get( MoleculePolarityStrings, 'a11y.common.electricFieldToggle.onStringProperty' ) ),
        offStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_electricFieldToggle_off', _.get( MoleculePolarityStrings, 'a11y.common.electricFieldToggle.offStringProperty' ) )
      },
      atom: {
        accessibleName: new FluentPattern<{ name: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_atom_accessibleName', _.get( MoleculePolarityStrings, 'a11y.common.atom.accessibleNameStringProperty' ), [{"name":"name"}] )
      },
      keyboardHelpContent: {
        moveMoleculeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_moveMolecule', _.get( MoleculePolarityStrings, 'a11y.common.keyboardHelpContent.moveMoleculeStringProperty' ) ),
        rotateMoleculeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_rotateMolecule', _.get( MoleculePolarityStrings, 'a11y.common.keyboardHelpContent.rotateMoleculeStringProperty' ) ),
        rotateInSmallerStepsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_rotateInSmallerSteps', _.get( MoleculePolarityStrings, 'a11y.common.keyboardHelpContent.rotateInSmallerStepsStringProperty' ) ),
        moveAtomsOrMoleculeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_moveAtomsOrMolecule', _.get( MoleculePolarityStrings, 'a11y.common.keyboardHelpContent.moveAtomsOrMoleculeStringProperty' ) ),
        moveAtomAAndCStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_moveAtomAAndC', _.get( MoleculePolarityStrings, 'a11y.common.keyboardHelpContent.moveAtomAAndCStringProperty' ) ),
        rotateOrMoveInSmallerStepsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_rotateOrMoveInSmallerSteps', _.get( MoleculePolarityStrings, 'a11y.common.keyboardHelpContent.rotateOrMoveInSmallerStepsStringProperty' ) ),
        chooseRealMoleculeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_chooseRealMolecule', _.get( MoleculePolarityStrings, 'a11y.common.keyboardHelpContent.chooseRealMoleculeStringProperty' ) ),
        moleculeStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_molecule', _.get( MoleculePolarityStrings, 'a11y.common.keyboardHelpContent.moleculeStringProperty' ) ),
        moleculesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_molecules', _.get( MoleculePolarityStrings, 'a11y.common.keyboardHelpContent.moleculesStringProperty' ) ),
        rotateMoleculeWASDStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_rotateMoleculeWASD', _.get( MoleculePolarityStrings, 'a11y.common.keyboardHelpContent.rotateMoleculeWASDStringProperty' ) ),
        rotateInSmallerStepsWASDStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_keyboardHelpContent_rotateInSmallerStepsWASD', _.get( MoleculePolarityStrings, 'a11y.common.keyboardHelpContent.rotateInSmallerStepsWASDStringProperty' ) )
      },
      bondDipoleDirection: new FluentPattern<{ bond: FluentVariable, position: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_bondDipoleDirection', _.get( MoleculePolarityStrings, 'a11y.common.bondDipoleDirectionStringProperty' ), [{"name":"bond"},{"name":"position"}] ),
      molecularDipoleResponses: {
        molecularDipoleContext: new FluentPattern<{ progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_molecularDipoleResponses_molecularDipoleContext', _.get( MoleculePolarityStrings, 'a11y.common.molecularDipoleResponses.molecularDipoleContextStringProperty' ), [{"name":"progress"}] ),
        molecularDipoleDirection: new FluentPattern<{ position: FluentVariable, progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_molecularDipoleResponses_molecularDipoleDirection', _.get( MoleculePolarityStrings, 'a11y.common.molecularDipoleResponses.molecularDipoleDirectionStringProperty' ), [{"name":"position"},{"name":"progress"}] ),
        molecularDipoleDirectionOnly: new FluentPattern<{ position: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_molecularDipoleResponses_molecularDipoleDirectionOnly', _.get( MoleculePolarityStrings, 'a11y.common.molecularDipoleResponses.molecularDipoleDirectionOnlyStringProperty' ), [{"name":"position"}] )
      },
      _comment_0: new FluentComment( {"comment":"Electronegativity description","associatedKey":"electronegativity"} ),
      _comment_1: new FluentComment( {"comment":"EN6 - Electronegativity levels (Screen 1/2)","associatedKey":"electronegativity"} ),
      electronegativity: {
        headingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_electronegativity_heading', _.get( MoleculePolarityStrings, 'a11y.common.electronegativity.headingStringProperty' ) ),
        currentValueStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_electronegativity_currentValue', _.get( MoleculePolarityStrings, 'a11y.common.electronegativity.currentValueStringProperty' ) ),
        description: new FluentPattern<{ atom: FluentVariable, en: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_electronegativity_description', _.get( MoleculePolarityStrings, 'a11y.common.electronegativity.descriptionStringProperty' ), [{"name":"atom"},{"name":"en"}] ),
        elementElectronegativity: new FluentPattern<{ element: FluentVariable, en: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_common_electronegativity_elementElectronegativity', _.get( MoleculePolarityStrings, 'a11y.common.electronegativity.elementElectronegativityStringProperty' ), [{"name":"element"},{"name":"en"}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_common_electronegativity_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.common.electronegativity.accessibleHelpTextStringProperty' ) )
      }
    },
    _comment_0: new FluentComment( {"comment":"===================","associatedKey":"bondCharacter"} ),
    _comment_1: new FluentComment( {"comment":"REGIONS / PARAMETERS","associatedKey":"bondCharacter"} ),
    _comment_2: new FluentComment( {"comment":"===================","associatedKey":"bondCharacter"} ),
    _comment_3: new FluentComment( {"comment":"BondChar6 - Bond Character (Screen 1)","associatedKey":"bondCharacter"} ),
    bondCharacter: new FluentPattern<{ bondCharacter: 'nonpolarCovalent' | 'nearlyNonpolarCovalent' | 'slightlyPolarCovalent' | 'polarCovalent' | 'slightlyIonic' | 'mostlyIonic' | TReadOnlyProperty<'nonpolarCovalent' | 'nearlyNonpolarCovalent' | 'slightlyPolarCovalent' | 'polarCovalent' | 'slightlyIonic' | 'mostlyIonic'> }>( fluentSupport.bundleProperty, 'a11y_bondCharacter', _.get( MoleculePolarityStrings, 'a11y.bondCharacterStringProperty' ), [{"name":"bondCharacter","variants":["nonpolarCovalent","nearlyNonpolarCovalent","slightlyPolarCovalent","polarCovalent","slightlyIonic","mostlyIonic"]}] ),
    _comment_4: new FluentComment( {"comment":"BondCharProgress2 - Bond Character Progress (Screen 1)","associatedKey":"bondCharacterProgress"} ),
    _comment_5: new FluentComment( {"comment":"Implementation: ΔEN > 0 = more ionic; ΔEN < 0 more covalent","associatedKey":"bondCharacterProgress"} ),
    bondCharacterProgress: new FluentPattern<{ progress: 'moreIonic' | 'moreCovalent' | TReadOnlyProperty<'moreIonic' | 'moreCovalent'> }>( fluentSupport.bundleProperty, 'a11y_bondCharacterProgress', _.get( MoleculePolarityStrings, 'a11y.bondCharacterProgressStringProperty' ), [{"name":"progress","variants":["moreIonic","moreCovalent"]}] ),
    _comment_6: new FluentComment( {"comment":"DipoleProgress3 - Dipole Progress (Screen 1)","associatedKey":"dipoleProgress"} ),
    dipoleProgress: new FluentPattern<{ progress: number | 'zero' | 'smaller' | 'larger' | TReadOnlyProperty<number | 'zero' | 'smaller' | 'larger'> }>( fluentSupport.bundleProperty, 'a11y_dipoleProgress', _.get( MoleculePolarityStrings, 'a11y.dipoleProgressStringProperty' ), [{"name":"progress","variants":[{"type":"number","value":"zero"},"smaller","larger"]}] ),
    _comment_7: new FluentComment( {"comment":"ElectronDensity6 - Electron Density (Screen 1)","associatedKey":"electronDensity"} ),
    electronDensity: new FluentPattern<{ density: 'evenlyShared' | 'nearlyEvenlyShared' | 'slightlyUnevenlyShared' | 'unevenlyShared' | 'veryUnevenlyShared' | 'mostUnevenlyShared' | TReadOnlyProperty<'evenlyShared' | 'nearlyEvenlyShared' | 'slightlyUnevenlyShared' | 'unevenlyShared' | 'veryUnevenlyShared' | 'mostUnevenlyShared'> }>( fluentSupport.bundleProperty, 'a11y_electronDensity', _.get( MoleculePolarityStrings, 'a11y.electronDensityStringProperty' ), [{"name":"density","variants":["evenlyShared","nearlyEvenlyShared","slightlyUnevenlyShared","unevenlyShared","veryUnevenlyShared","mostUnevenlyShared"]}] ),
    _comment_8: new FluentComment( {"comment":"ElectronDensityShift6 - Electron Density Shift (Screen 1)","associatedKey":"electronDensityShift"} ),
    electronDensityShift: new FluentPattern<{ shift: 'shiftedSlightly' | 'shifted' | 'shiftedMuchMore' | 'shiftedAlmostCompletely' | TReadOnlyProperty<'shiftedSlightly' | 'shifted' | 'shiftedMuchMore' | 'shiftedAlmostCompletely'> }>( fluentSupport.bundleProperty, 'a11y_electronDensityShift', _.get( MoleculePolarityStrings, 'a11y.electronDensityShiftStringProperty' ), [{"name":"shift","variants":["shiftedSlightly","shifted","shiftedMuchMore","shiftedAlmostCompletely"]}] ),
    _comment_9: new FluentComment( {"comment":"ElectronDensityProgress2 - Electron Density Progress (Screen 1)","associatedKey":"electronDensityProgress"} ),
    electronDensityProgress: new FluentPattern<{ progress: 'more' | 'less' | TReadOnlyProperty<'more' | 'less'> }>( fluentSupport.bundleProperty, 'a11y_electronDensityProgress', _.get( MoleculePolarityStrings, 'a11y.electronDensityProgressStringProperty' ), [{"name":"progress","variants":["more","less"]}] ),
    _comment_10: new FluentComment( {"comment":"ElectroPotential6 - Electrostatic Potential (Screen 1)","associatedKey":"electrostaticPotentialUppercase"} ),
    electrostaticPotentialUppercase: new FluentPattern<{ potential: 'no' | 'verySmall' | 'small' | 'medium' | 'fairlyLarge' | 'large' | TReadOnlyProperty<'no' | 'verySmall' | 'small' | 'medium' | 'fairlyLarge' | 'large'> }>( fluentSupport.bundleProperty, 'a11y_electrostaticPotentialUppercase', _.get( MoleculePolarityStrings, 'a11y.electrostaticPotentialUppercaseStringProperty' ), [{"name":"potential","variants":["no","verySmall","small","medium","fairlyLarge","large"]}] ),
    _comment_11: new FluentComment( {"comment":"ElectroPotentialProgress5 - Electrostatic Potential Progress (Screen 1)","associatedKey":"electrostaticPotentialProgress"} ),
    _comment_12: new FluentComment( {"comment":"2-range spectrum: positive-neutral-negative","associatedKey":"electrostaticPotentialProgress"} ),
    electrostaticPotentialProgress: new FluentPattern<{ progress: 'morePositive' | 'lessPositive' | 'neutral' | 'lessNegative' | 'moreNegative' | TReadOnlyProperty<'morePositive' | 'lessPositive' | 'neutral' | 'lessNegative' | 'moreNegative'> }>( fluentSupport.bundleProperty, 'a11y_electrostaticPotentialProgress', _.get( MoleculePolarityStrings, 'a11y.electrostaticPotentialProgressStringProperty' ), [{"name":"progress","variants":["morePositive","lessPositive","neutral","lessNegative","moreNegative"]}] ),
    _comment_13: new FluentComment( {"comment":"ElectroPotentialRegions5","associatedKey":"electrostaticRegions"} ),
    electrostaticRegions: new FluentPattern<{ regions: 'verySlightly' | 'slightly' | 'moderately' | 'highly' | 'veryHighly' | TReadOnlyProperty<'verySlightly' | 'slightly' | 'moderately' | 'highly' | 'veryHighly'> }>( fluentSupport.bundleProperty, 'a11y_electrostaticRegions', _.get( MoleculePolarityStrings, 'a11y.electrostaticRegionsStringProperty' ), [{"name":"regions","variants":["verySlightly","slightly","moderately","highly","veryHighly"]}] ),
    _comment_14: new FluentComment( {"comment":"Electronegativity description","associatedKey":"electronegativity"} ),
    _comment_15: new FluentComment( {"comment":"EN6 - Electronegativity levels (Screen 1/2)","associatedKey":"electronegativity"} ),
    electronegativity: new FluentPattern<{ level: 'veryLow' | 'low' | 'mediumLow' | 'mediumHigh' | 'high' | 'veryHigh' | TReadOnlyProperty<'veryLow' | 'low' | 'mediumLow' | 'mediumHigh' | 'high' | 'veryHigh'> }>( fluentSupport.bundleProperty, 'a11y_electronegativity', _.get( MoleculePolarityStrings, 'a11y.electronegativityStringProperty' ), [{"name":"level","variants":["veryLow","low","mediumLow","mediumHigh","high","veryHigh"]}] ),
    _comment_16: new FluentComment( {"comment":"Field2 - Electric Field state (Screen 1/2)","associatedKey":"field"} ),
    field: new FluentPattern<{ state: 'on' | 'off' | TReadOnlyProperty<'on' | 'off'> }>( fluentSupport.bundleProperty, 'a11y_field', _.get( MoleculePolarityStrings, 'a11y.fieldStringProperty' ), [{"name":"state","variants":["on","off"]}] ),
    _comment_17: new FluentComment( {"comment":"MolecularDipole11 - Molecular Dipole magnitude (Screen 2)","associatedKey":"molecularDipole"} ),
    molecularDipole: new FluentPattern<{ magnitude: 'no' | 'verySmall' | 'small' | 'medium' | 'fairlyLarge' | 'large' | 'veryLarge' | 'extremelyLarge' | TReadOnlyProperty<'no' | 'verySmall' | 'small' | 'medium' | 'fairlyLarge' | 'large' | 'veryLarge' | 'extremelyLarge'> }>( fluentSupport.bundleProperty, 'a11y_molecularDipole', _.get( MoleculePolarityStrings, 'a11y.molecularDipoleStringProperty' ), [{"name":"magnitude","variants":["no","verySmall","small","medium","fairlyLarge","large","veryLarge","extremelyLarge"]}] ),
    atAngle: new FluentPattern<{ angle: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_atAngle', _.get( MoleculePolarityStrings, 'a11y.atAngleStringProperty' ), [{"name":"angle"}] ),
    toAngle: new FluentPattern<{ angle: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_toAngle', _.get( MoleculePolarityStrings, 'a11y.toAngleStringProperty' ), [{"name":"angle"}] ),
    betweenAngles: new FluentPattern<{ angle1: FluentVariable, angle2: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_betweenAngles', _.get( MoleculePolarityStrings, 'a11y.betweenAnglesStringProperty' ), [{"name":"angle1"},{"name":"angle2"}] ),
    degrees: new FluentPattern<{ angle: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_degrees', _.get( MoleculePolarityStrings, 'a11y.degreesStringProperty' ), [{"name":"angle"}] ),
    oClock: new FluentPattern<{ hour: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_oClock', _.get( MoleculePolarityStrings, 'a11y.oClockStringProperty' ), [{"name":"hour"}] ),
    _comment_18: new FluentComment( {"comment":"OrientationMol3 - Molecule orientation (Screen 1)","associatedKey":"orientationMolecule"} ),
    orientationMolecule: new FluentPattern<{ orientation: 'horizontal' | 'diagonal' | 'vertical' | TReadOnlyProperty<'horizontal' | 'diagonal' | 'vertical'> }>( fluentSupport.bundleProperty, 'a11y_orientationMolecule', _.get( MoleculePolarityStrings, 'a11y.orientationMoleculeStringProperty' ), [{"name":"orientation","variants":["horizontal","diagonal","vertical"]}] ),
    _comment_19: new FluentComment( {"comment":"PartialCharge2 - Partial Charge sign (Screen 1/2)","associatedKey":"partialChargeSign"} ),
    partialChargeSign: new FluentPattern<{ sign: 'positive' | 'negative' | TReadOnlyProperty<'positive' | 'negative'> }>( fluentSupport.bundleProperty, 'a11y_partialChargeSign', _.get( MoleculePolarityStrings, 'a11y.partialChargeSignStringProperty' ), [{"name":"sign","variants":["positive","negative"]}] ),
    _comment_20: new FluentComment( {"comment":"Polarity6 - Bond Polarity (Screen 1/2)","associatedKey":"polarity"} ),
    polarity: new FluentPattern<{ polarity: 'nonpolar' | 'veryWeaklyPolar' | 'weaklyPolar' | 'polar' | 'stronglyPolar' | 'veryStronglyPolar' | TReadOnlyProperty<'nonpolar' | 'veryWeaklyPolar' | 'weaklyPolar' | 'polar' | 'stronglyPolar' | 'veryStronglyPolar'> }>( fluentSupport.bundleProperty, 'a11y_polarity', _.get( MoleculePolarityStrings, 'a11y.polarityStringProperty' ), [{"name":"polarity","variants":["nonpolar","veryWeaklyPolar","weaklyPolar","polar","stronglyPolar","veryStronglyPolar"]}] ),
    _comment_21: new FluentComment( {"comment":"PartialCharge11 - Partial Charge magnitude (Screen 1)","associatedKey":"partialChargeMagnitude"} ),
    partialChargeMagnitude: new FluentPattern<{ magnitude: number | 'zero' | 'verySmall' | 'small' | 'medium' | 'fairlyLarge' | 'large' | 'veryLarge' | 'extremelyLarge' | TReadOnlyProperty<number | 'zero' | 'verySmall' | 'small' | 'medium' | 'fairlyLarge' | 'large' | 'veryLarge' | 'extremelyLarge'> }>( fluentSupport.bundleProperty, 'a11y_partialChargeMagnitude', _.get( MoleculePolarityStrings, 'a11y.partialChargeMagnitudeStringProperty' ), [{"name":"magnitude","variants":[{"type":"number","value":"zero"},"verySmall","small","medium","fairlyLarge","large","veryLarge","extremelyLarge"]}] ),
    _comment_22: new FluentComment( {"comment":"bondDipole6 - Bond Dipole magnitude (Screen 1)","associatedKey":"bondDipole"} ),
    bondDipole: new FluentPattern<{ magnitude: 'no' | 'verySmall' | 'small' | 'medium' | 'fairlyLarge' | 'large' | TReadOnlyProperty<'no' | 'verySmall' | 'small' | 'medium' | 'fairlyLarge' | 'large'> }>( fluentSupport.bundleProperty, 'a11y_bondDipole', _.get( MoleculePolarityStrings, 'a11y.bondDipoleStringProperty' ), [{"name":"magnitude","variants":["no","verySmall","small","medium","fairlyLarge","large"]}] ),
    molecularPolarity: new FluentPattern<{ polarity: 'nonpolar' | 'weaklyPolar' | 'polar' | 'moderatelyPolar' | 'stronglyPolar' | 'veryStronglyPolar' | TReadOnlyProperty<'nonpolar' | 'weaklyPolar' | 'polar' | 'moderatelyPolar' | 'stronglyPolar' | 'veryStronglyPolar'> }>( fluentSupport.bundleProperty, 'a11y_molecularPolarity', _.get( MoleculePolarityStrings, 'a11y.molecularPolarityStringProperty' ), [{"name":"polarity","variants":["nonpolar","weaklyPolar","polar","moderatelyPolar","stronglyPolar","veryStronglyPolar"]}] ),
    _comment_23: new FluentComment( {"comment":"Rotation2 - Rotation direction (Screen 1/2)","associatedKey":"rotation"} ),
    rotation: new FluentPattern<{ direction: 'clockwise' | 'counterclockwise' | TReadOnlyProperty<'clockwise' | 'counterclockwise'> }>( fluentSupport.bundleProperty, 'a11y_rotation', _.get( MoleculePolarityStrings, 'a11y.rotationStringProperty' ), [{"name":"direction","variants":["clockwise","counterclockwise"]}] ),
    _comment_24: new FluentComment( {"comment":"Shape7 - Molecule shape (Screen 2)","associatedKey":"shape"} ),
    shape: new FluentPattern<{ shape: 'linear' | 'nearlyLinear' | 'slightlyBent' | 'bent' | 'veryBent' | 'extremelyBentSlightOverlap' | 'atomsOverlap' | TReadOnlyProperty<'linear' | 'nearlyLinear' | 'slightlyBent' | 'bent' | 'veryBent' | 'extremelyBentSlightOverlap' | 'atomsOverlap'> }>( fluentSupport.bundleProperty, 'a11y_shape', _.get( MoleculePolarityStrings, 'a11y.shapeStringProperty' ), [{"name":"shape","variants":["linear","nearlyLinear","slightlyBent","bent","veryBent","extremelyBentSlightOverlap","atomsOverlap"]}] ),
    shapeGeometry: new FluentPattern<{ geometry: 'linear' | 'bent' | 'trigonalPlanar' | 'trigonalPyramidal' | 'tetrahedral' | TReadOnlyProperty<'linear' | 'bent' | 'trigonalPlanar' | 'trigonalPyramidal' | 'tetrahedral'> }>( fluentSupport.bundleProperty, 'a11y_shapeGeometry', _.get( MoleculePolarityStrings, 'a11y.shapeGeometryStringProperty' ), [{"name":"geometry","variants":["linear","bent","trigonalPlanar","trigonalPyramidal","tetrahedral"]}] ),
    _comment_25: new FluentComment( {"comment":"===================","associatedKey":"twoAtomsScreen"} ),
    _comment_26: new FluentComment( {"comment":"TWO ATOMS SCREEN","associatedKey":"twoAtomsScreen"} ),
    _comment_27: new FluentComment( {"comment":"===================","associatedKey":"twoAtomsScreen"} ),
    twoAtomsScreen: {
      _comment_0: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      _comment_1: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      _comment_2: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_screenSummary_playArea', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_screenSummary_controlArea', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetails: new FluentPattern<{ field: FluentVariable, polarity: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_screenSummary_currentDetails', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.screenSummary.currentDetailsStringProperty' ), [{"name":"field"},{"name":"polarity"}] ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_screenSummary_interactionHint', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.screenSummary.interactionHintStringProperty' ) )
      },
      _comment_3: new FluentComment( {"comment":"Play Area - Molecule AB heading","associatedKey":"moleculeAB"} ),
      moleculeAB: {
        headingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_heading', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.headingStringProperty' ) ),
        currentState: new FluentPattern<{ polarity: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_currentState', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.currentStateStringProperty' ), [{"name":"polarity"}] ),
        bondDipoleDescription: new FluentPattern<{ bondDipoleMagnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_bondDipoleDescription', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.bondDipoleDescriptionStringProperty' ), [{"name":"bondDipoleMagnitude"}] ),
        bondDipoleDirection: new FluentPattern<{ atom: FluentVariable, bondDipoleMagnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_bondDipoleDirection', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.bondDipoleDirectionStringProperty' ), [{"name":"atom"},{"name":"bondDipoleMagnitude"}] ),
        partialChargesDescription: new FluentPattern<{ partialChargeMagnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_partialChargesDescription', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.partialChargesDescriptionStringProperty' ), [{"name":"partialChargeMagnitude"}] ),
        partialChargesDetail: new FluentPattern<{ chargeA: FluentVariable, chargeB: FluentVariable, partialChargeMagnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_partialChargesDetail', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.partialChargesDetailStringProperty' ), [{"name":"chargeA"},{"name":"chargeB"},{"name":"partialChargeMagnitude"}] ),
        bondCharacterDescription: new FluentPattern<{ bondCharacter: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_bondCharacterDescription', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.bondCharacterDescriptionStringProperty' ), [{"name":"bondCharacter"}] ),
        electrostaticPotentialDescription: new FluentPattern<{ potential: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_electrostaticPotentialDescription', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.electrostaticPotentialDescriptionStringProperty' ), [{"name":"potential"}] ),
        electrostaticPotentialRegions: new FluentPattern<{ chargeA: FluentVariable, chargeB: FluentVariable, potential: FluentVariable, regionA: FluentVariable, regionB: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_electrostaticPotentialRegions', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.electrostaticPotentialRegionsStringProperty' ), [{"name":"chargeA"},{"name":"chargeB"},{"name":"potential"},{"name":"regionA"},{"name":"regionB"}] ),
        electronDensityDescription: {
          firstTwoRegions: new FluentPattern<{ density: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_electronDensityDescription_firstTwoRegions', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.electronDensityDescription.firstTwoRegionsStringProperty' ), [{"name":"density"}] ),
          lastFourRegions: new FluentPattern<{ atom: FluentVariable, density: FluentVariable, electronDensityShift: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_electronDensityDescription_lastFourRegions', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.electronDensityDescription.lastFourRegionsStringProperty' ), [{"name":"atom"},{"name":"density"},{"name":"electronDensityShift"}] )
        },
        electricFieldAlignedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_electricFieldAligned', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.electricFieldAlignedStringProperty' ) ),
        orientationDescription: new FluentPattern<{ atomAPosition: FluentVariable, atomBPosition: FluentVariable, orientation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_orientationDescription', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.orientationDescriptionStringProperty' ), [{"name":"atomAPosition"},{"name":"atomBPosition"},{"name":"orientation"}] )
      },
      _comment_4: new FluentComment( {"comment":"Rotate Molecule AB Slider","associatedKey":"rotateMoleculeSlider"} ),
      _comment_5: new FluentComment( {"comment":"Rotate Molecule ABC Slider","associatedKey":"rotateMoleculeSlider"} ),
      rotateMoleculeSlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.accessibleHelpTextStringProperty' ) ),
        electricFieldContextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_electricFieldContext', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.electricFieldContextStringProperty' ) )
      }
    },
    _comment_28: new FluentComment( {"comment":"===================","associatedKey":"threeAtomsScreen"} ),
    _comment_29: new FluentComment( {"comment":"THREE ATOMS SCREEN","associatedKey":"threeAtomsScreen"} ),
    _comment_30: new FluentComment( {"comment":"===================","associatedKey":"threeAtomsScreen"} ),
    threeAtomsScreen: {
      _comment_0: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      _comment_1: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      _comment_2: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_screenSummary_playArea', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_screenSummary_controlArea', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetails: new FluentPattern<{ field: FluentVariable, polarity: FluentVariable, shape: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_screenSummary_currentDetails', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.screenSummary.currentDetailsStringProperty' ), [{"name":"field"},{"name":"polarity"},{"name":"shape"}] ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_screenSummary_interactionHint', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.screenSummary.interactionHintStringProperty' ) )
      },
      _comment_3: new FluentComment( {"comment":"Play Area - Molecule ABC heading","associatedKey":"moleculeABC"} ),
      moleculeABC: {
        headingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_heading', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.headingStringProperty' ) ),
        currentState: new FluentPattern<{ polarity: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_currentState', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.currentStateStringProperty' ), [{"name":"polarity"}] ),
        orientationDescription: new FluentPattern<{ atomAPosition: FluentVariable, atomCPosition: FluentVariable, shape: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_orientationDescription', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.orientationDescriptionStringProperty' ), [{"name":"atomAPosition"},{"name":"atomCPosition"},{"name":"shape"}] ),
        electricFieldAlignedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_electricFieldAligned', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.electricFieldAlignedStringProperty' ) ),
        electronegativityValues: new FluentPattern<{ enA: FluentVariable, enB: FluentVariable, enC: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_electronegativityValues', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.electronegativityValuesStringProperty' ), [{"name":"enA"},{"name":"enB"},{"name":"enC"}] ),
        molecularDipoleDescription: new FluentPattern<{ magnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_molecularDipoleDescription', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.molecularDipoleDescriptionStringProperty' ), [{"name":"magnitude"}] ),
        molecularDipoleDirection: new FluentPattern<{ direction: FluentVariable, magnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_molecularDipoleDirection', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.molecularDipoleDirectionStringProperty' ), [{"name":"direction"},{"name":"magnitude"}] ),
        molecularDipoleTwiceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_molecularDipoleTwice', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.molecularDipoleTwiceStringProperty' ) ),
        bondDipoleAB: new FluentPattern<{ magnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_bondDipoleAB', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.bondDipoleABStringProperty' ), [{"name":"magnitude"}] ),
        bondDipoleABDescription: new FluentPattern<{ atom: FluentVariable, direction: FluentVariable, magnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_bondDipoleABDescription', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.bondDipoleABDescriptionStringProperty' ), [{"name":"atom"},{"name":"direction"},{"name":"magnitude"}] ),
        bondDipoleBC: new FluentPattern<{ magnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_bondDipoleBC', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.bondDipoleBCStringProperty' ), [{"name":"magnitude"}] ),
        bondDipoleBCDescription: new FluentPattern<{ atom: FluentVariable, direction: FluentVariable, magnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_bondDipoleBCDescription', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.bondDipoleBCDescriptionStringProperty' ), [{"name":"atom"},{"name":"direction"},{"name":"magnitude"}] ),
        overlapping: new FluentPattern<{ atom: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_overlapping', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.overlappingStringProperty' ), [{"name":"atom"}] ),
        onTopOf: new FluentPattern<{ atom: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_onTopOf', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.onTopOfStringProperty' ), [{"name":"atom"}] ),
        partialChargesDescription: new FluentPattern<{ atom: FluentVariable, magnitude: FluentVariable, sign: 'positive' | 'negative' | number | 'zero' | TReadOnlyProperty<'positive' | 'negative' | number | 'zero'> }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_partialChargesDescription', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.partialChargesDescriptionStringProperty' ), [{"name":"atom"},{"name":"magnitude"},{"name":"sign","variants":["positive","negative",{"type":"number","value":"zero"}]}] )
      },
      _comment_4: new FluentComment( {"comment":"Move Atom A Slider","associatedKey":"moveAtomASlider"} ),
      moveAtomASlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomASlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomASlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomASlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomASlider.accessibleHelpTextStringProperty' ) )
      },
      _comment_5: new FluentComment( {"comment":"Move Atom C Slider","associatedKey":"moveAtomCSlider"} ),
      moveAtomCSlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomCSlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomCSlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomCSlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomCSlider.accessibleHelpTextStringProperty' ) )
      },
      _comment_6: new FluentComment( {"comment":"Rotate Molecule AB Slider","associatedKey":"rotateMoleculeSlider"} ),
      _comment_7: new FluentComment( {"comment":"Rotate Molecule ABC Slider","associatedKey":"rotateMoleculeSlider"} ),
      rotateMoleculeSlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.accessibleHelpTextStringProperty' ) )
      }
    },
    _comment_31: new FluentComment( {"comment":"===================","associatedKey":"realMoleculesScreen"} ),
    _comment_32: new FluentComment( {"comment":"REAL MOLECULES SCREEN","associatedKey":"realMoleculesScreen"} ),
    _comment_33: new FluentComment( {"comment":"===================","associatedKey":"realMoleculesScreen"} ),
    realMoleculesScreen: {
      _comment_0: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      _comment_1: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      _comment_2: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_screenSummary_playArea', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_screenSummary_controlArea', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetails: new FluentPattern<{ moleculeName: FluentVariable, shapeGeometry: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_screenSummary_currentDetails', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.screenSummary.currentDetailsStringProperty' ), [{"name":"moleculeName"},{"name":"shapeGeometry"}] ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_screenSummary_interactionHint', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.screenSummary.interactionHintStringProperty' ) )
      },
      realMolecule: new FluentPattern<{ moleculeName: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_realMolecule', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.realMoleculeStringProperty' ), [{"name":"moleculeName"}] ),
      draggableMolecule: {
        accessibleName: new FluentPattern<{ moleculeName: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_draggableMolecule_accessibleName', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.draggableMolecule.accessibleNameStringProperty' ), [{"name":"moleculeName"}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_draggableMolecule_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.draggableMolecule.accessibleHelpTextStringProperty' ) ),
        objectResponses: new FluentPattern<{ direction: 'up' | 'down' | 'left' | 'right' | TReadOnlyProperty<'up' | 'down' | 'left' | 'right'> }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_draggableMolecule_objectResponses', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.draggableMolecule.objectResponsesStringProperty' ), [{"name":"direction","variants":["up","down","left","right"]}] )
      },
      electronegativitiesTable: new FluentPattern<{ boron: FluentVariable, carbon: FluentVariable, chlorine: FluentVariable, fluorine: FluentVariable, hydrogen: FluentVariable, nitrogen: FluentVariable, oxygen: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_electronegativitiesTable', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.electronegativitiesTableStringProperty' ), [{"name":"boron"},{"name":"carbon"},{"name":"chlorine"},{"name":"fluorine"},{"name":"hydrogen"},{"name":"nitrogen"},{"name":"oxygen"}] ),
      moleculeComboBox: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculeComboBox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculeComboBox.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculeComboBox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculeComboBox.accessibleHelpTextStringProperty' ) )
      },
      modelRadioButtonGroup: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_modelRadioButtonGroup_accessibleName', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.modelRadioButtonGroup.accessibleNameStringProperty' ) ),
        basicHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_modelRadioButtonGroup_basicHelpText', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.modelRadioButtonGroup.basicHelpTextStringProperty' ) ),
        advancedHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_modelRadioButtonGroup_advancedHelpText', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.modelRadioButtonGroup.advancedHelpTextStringProperty' ) )
      },
      molecules: {
        description: new FluentPattern<{ molecule: 'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform' | TReadOnlyProperty<'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform'> }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_molecules_description', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.molecules.descriptionStringProperty' ), [{"name":"molecule","variants":["hydrogen","nitrogen","oxygen","fluorine","hydrogenFluoride","water","carbonDioxide","hydrogenCyanide","ozone","ammonia","borane","boronTrifluoride","formaldehyde","methane","fluoromethane","difluoromethane","trifluoromethane","tetrafluoromethane","chloroform"]}] ),
        _comment_0: new FluentComment( {"comment":"bondDipole6 - Bond Dipole magnitude (Screen 1)","associatedKey":"bondDipole"} ),
        bondDipole: new FluentPattern<{ molecule: 'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform' | TReadOnlyProperty<'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform'> }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_molecules_bondDipole', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.molecules.bondDipoleStringProperty' ), [{"name":"molecule","variants":["hydrogen","nitrogen","oxygen","fluorine","hydrogenFluoride","water","carbonDioxide","hydrogenCyanide","ozone","ammonia","borane","boronTrifluoride","formaldehyde","methane","fluoromethane","difluoromethane","trifluoromethane","tetrafluoromethane","chloroform"]}] ),
        _comment_1: new FluentComment( {"comment":"MolecularDipole11 - Molecular Dipole magnitude (Screen 2)","associatedKey":"molecularDipole"} ),
        molecularDipole: new FluentPattern<{ molecule: 'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform' | TReadOnlyProperty<'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform'> }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_molecules_molecularDipole', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.molecules.molecularDipoleStringProperty' ), [{"name":"molecule","variants":["hydrogen","nitrogen","oxygen","fluorine","hydrogenFluoride","water","carbonDioxide","hydrogenCyanide","ozone","ammonia","borane","boronTrifluoride","formaldehyde","methane","fluoromethane","difluoromethane","trifluoromethane","tetrafluoromethane","chloroform"]}] ),
        electrostaticPotential: new FluentPattern<{ molecule: 'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform' | TReadOnlyProperty<'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform'> }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_molecules_electrostaticPotential', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.molecules.electrostaticPotentialStringProperty' ), [{"name":"molecule","variants":["hydrogen","nitrogen","oxygen","fluorine","hydrogenFluoride","water","carbonDioxide","hydrogenCyanide","ozone","ammonia","borane","boronTrifluoride","formaldehyde","methane","fluoromethane","difluoromethane","trifluoromethane","tetrafluoromethane","chloroform"]}] ),
        _comment_2: new FluentComment( {"comment":"ElectronDensity6 - Electron Density (Screen 1)","associatedKey":"electronDensity"} ),
        electronDensity: new FluentPattern<{ molecule: 'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform' | TReadOnlyProperty<'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform'> }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_molecules_electronDensity', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.molecules.electronDensityStringProperty' ), [{"name":"molecule","variants":["hydrogen","nitrogen","oxygen","fluorine","hydrogenFluoride","water","carbonDioxide","hydrogenCyanide","ozone","ammonia","borane","boronTrifluoride","formaldehyde","methane","fluoromethane","difluoromethane","trifluoromethane","tetrafluoromethane","chloroform"]}] )
      },
      moleculesAdvanced: {
        description: new FluentPattern<{ molecule: 'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform' | TReadOnlyProperty<'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform'> }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_description', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.descriptionStringProperty' ), [{"name":"molecule","variants":["hydrogen","nitrogen","oxygen","fluorine","hydrogenFluoride","water","carbonDioxide","hydrogenCyanide","ozone","ammonia","borane","boronTrifluoride","formaldehyde","methane","fluoromethane","difluoromethane","trifluoromethane","tetrafluoromethane","chloroform"]}] ),
        _comment_0: new FluentComment( {"comment":"bondDipole6 - Bond Dipole magnitude (Screen 1)","associatedKey":"bondDipole"} ),
        bondDipole: new FluentPattern<{ molecule: 'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform' | TReadOnlyProperty<'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform'> }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_bondDipole', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.bondDipoleStringProperty' ), [{"name":"molecule","variants":["hydrogen","nitrogen","oxygen","fluorine","hydrogenFluoride","water","carbonDioxide","hydrogenCyanide","ozone","ammonia","borane","boronTrifluoride","formaldehyde","methane","fluoromethane","difluoromethane","trifluoromethane","tetrafluoromethane","chloroform"]}] ),
        _comment_1: new FluentComment( {"comment":"MolecularDipole11 - Molecular Dipole magnitude (Screen 2)","associatedKey":"molecularDipole"} ),
        molecularDipole: new FluentPattern<{ molecule: 'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform' | TReadOnlyProperty<'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform'> }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_molecularDipole', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.molecularDipoleStringProperty' ), [{"name":"molecule","variants":["hydrogen","nitrogen","oxygen","fluorine","hydrogenFluoride","water","carbonDioxide","hydrogenCyanide","ozone","ammonia","borane","boronTrifluoride","formaldehyde","methane","fluoromethane","difluoromethane","trifluoromethane","tetrafluoromethane","chloroform"]}] ),
        electrostaticPotential: new FluentPattern<{ molecule: 'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform' | TReadOnlyProperty<'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform'> }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_electrostaticPotential', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.electrostaticPotentialStringProperty' ), [{"name":"molecule","variants":["hydrogen","nitrogen","oxygen","fluorine","hydrogenFluoride","water","carbonDioxide","hydrogenCyanide","ozone","ammonia","borane","boronTrifluoride","formaldehyde","methane","fluoromethane","difluoromethane","trifluoromethane","tetrafluoromethane","chloroform"]}] ),
        partialCharges: {
          hydrogenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_hydrogen', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.hydrogenStringProperty' ) ),
          nitrogenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_nitrogen', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.nitrogenStringProperty' ) ),
          oxygenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_oxygen', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.oxygenStringProperty' ) ),
          fluorineStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_fluorine', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.fluorineStringProperty' ) ),
          hydrogenFluoride: new FluentPattern<{ fluorineCharge: FluentVariable, hydrogenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_hydrogenFluoride', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.hydrogenFluorideStringProperty' ), [{"name":"fluorineCharge"},{"name":"hydrogenCharge"}] ),
          water: new FluentPattern<{ hydrogenCharge: FluentVariable, oxygenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_water', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.waterStringProperty' ), [{"name":"hydrogenCharge"},{"name":"oxygenCharge"}] ),
          carbonDioxide: new FluentPattern<{ carbonCharge: FluentVariable, oxygenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_carbonDioxide', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.carbonDioxideStringProperty' ), [{"name":"carbonCharge"},{"name":"oxygenCharge"}] ),
          hydrogenCyanide: new FluentPattern<{ carbonCharge: FluentVariable, hydrogenCharge: FluentVariable, nitrogenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_hydrogenCyanide', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.hydrogenCyanideStringProperty' ), [{"name":"carbonCharge"},{"name":"hydrogenCharge"},{"name":"nitrogenCharge"}] ),
          ozone: new FluentPattern<{ centralOxygenCharge: FluentVariable, terminalOxygenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_ozone', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.ozoneStringProperty' ), [{"name":"centralOxygenCharge"},{"name":"terminalOxygenCharge"}] ),
          ammonia: new FluentPattern<{ hydrogenCharge: FluentVariable, nitrogenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_ammonia', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.ammoniaStringProperty' ), [{"name":"hydrogenCharge"},{"name":"nitrogenCharge"}] ),
          borane: new FluentPattern<{ boronCharge: FluentVariable, hydrogenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_borane', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.boraneStringProperty' ), [{"name":"boronCharge"},{"name":"hydrogenCharge"}] ),
          boronTrifluoride: new FluentPattern<{ boronCharge: FluentVariable, fluorineCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_boronTrifluoride', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.boronTrifluorideStringProperty' ), [{"name":"boronCharge"},{"name":"fluorineCharge"}] ),
          formaldehyde: new FluentPattern<{ carbonCharge: FluentVariable, hydrogenCharge: FluentVariable, oxygenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_formaldehyde', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.formaldehydeStringProperty' ), [{"name":"carbonCharge"},{"name":"hydrogenCharge"},{"name":"oxygenCharge"}] ),
          methane: new FluentPattern<{ carbonCharge: FluentVariable, hydrogenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_methane', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.methaneStringProperty' ), [{"name":"carbonCharge"},{"name":"hydrogenCharge"}] ),
          fluoromethane: new FluentPattern<{ carbonCharge: FluentVariable, fluorineCharge: FluentVariable, hydrogenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_fluoromethane', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.fluoromethaneStringProperty' ), [{"name":"carbonCharge"},{"name":"fluorineCharge"},{"name":"hydrogenCharge"}] ),
          difluoromethane: new FluentPattern<{ carbonCharge: FluentVariable, fluorineCharge: FluentVariable, hydrogenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_difluoromethane', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.difluoromethaneStringProperty' ), [{"name":"carbonCharge"},{"name":"fluorineCharge"},{"name":"hydrogenCharge"}] ),
          trifluoromethane: new FluentPattern<{ carbonCharge: FluentVariable, fluorineCharge: FluentVariable, hydrogenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_trifluoromethane', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.trifluoromethaneStringProperty' ), [{"name":"carbonCharge"},{"name":"fluorineCharge"},{"name":"hydrogenCharge"}] ),
          tetrafluoromethane: new FluentPattern<{ carbonCharge: FluentVariable, fluorineCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_tetrafluoromethane', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.tetrafluoromethaneStringProperty' ), [{"name":"carbonCharge"},{"name":"fluorineCharge"}] ),
          chloroform: new FluentPattern<{ carbonCharge: FluentVariable, chlorineCharge: FluentVariable, hydrogenCharge: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_partialCharges_chloroform', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.partialCharges.chloroformStringProperty' ), [{"name":"carbonCharge"},{"name":"chlorineCharge"},{"name":"hydrogenCharge"}] )
        },
        _comment_2: new FluentComment( {"comment":"ElectronDensity6 - Electron Density (Screen 1)","associatedKey":"electronDensity"} ),
        electronDensity: new FluentPattern<{ molecule: 'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform' | TReadOnlyProperty<'hydrogen' | 'nitrogen' | 'oxygen' | 'fluorine' | 'hydrogenFluoride' | 'water' | 'carbonDioxide' | 'hydrogenCyanide' | 'ozone' | 'ammonia' | 'borane' | 'boronTrifluoride' | 'formaldehyde' | 'methane' | 'fluoromethane' | 'difluoromethane' | 'trifluoromethane' | 'tetrafluoromethane' | 'chloroform'> }>( fluentSupport.bundleProperty, 'a11y_realMoleculesScreen_moleculesAdvanced_electronDensity', _.get( MoleculePolarityStrings, 'a11y.realMoleculesScreen.moleculesAdvanced.electronDensityStringProperty' ), [{"name":"molecule","variants":["hydrogen","nitrogen","oxygen","fluorine","hydrogenFluoride","water","carbonDioxide","hydrogenCyanide","ozone","ammonia","borane","boronTrifluoride","formaldehyde","methane","fluoromethane","difluoromethane","trifluoromethane","tetrafluoromethane","chloroform"]}] )
      }
    }
  }
};

export default MoleculePolarityFluent;

moleculePolarity.register('MoleculePolarityFluent', MoleculePolarityFluent);
