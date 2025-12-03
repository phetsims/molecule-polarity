// Copyright 2025, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from molecule-polarity-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import {TReadOnlyProperty} from '../../axon/js/TReadOnlyProperty.js';
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
addToMapIfDefined( 'a11y_common_bondType', 'a11y.common.bondTypeStringProperty' );
addToMapIfDefined( 'a11y_common_bondDipole', 'a11y.common.bondDipoleStringProperty' );
addToMapIfDefined( 'a11y_common_dipoleProgress', 'a11y.common.dipoleProgressStringProperty' );
addToMapIfDefined( 'a11y_bondCharacterProgress', 'a11y.bondCharacterProgressStringProperty' );
addToMapIfDefined( 'a11y_dipoleOrientAB', 'a11y.dipoleOrientABStringProperty' );
addToMapIfDefined( 'a11y_dipoleOrientBC', 'a11y.dipoleOrientBCStringProperty' );
addToMapIfDefined( 'a11y_electronDensity', 'a11y.electronDensityStringProperty' );
addToMapIfDefined( 'a11y_electronDensityProgress', 'a11y.electronDensityProgressStringProperty' );
addToMapIfDefined( 'a11y_electrostaticPotential', 'a11y.electrostaticPotentialStringProperty' );
addToMapIfDefined( 'a11y_electrostaticPotentialProgress', 'a11y.electrostaticPotentialProgressStringProperty' );
addToMapIfDefined( 'a11y_electronegativity', 'a11y.electronegativityStringProperty' );
addToMapIfDefined( 'a11y_field', 'a11y.fieldStringProperty' );
addToMapIfDefined( 'a11y_molecularDipole', 'a11y.molecularDipoleStringProperty' );
addToMapIfDefined( 'a11y_orientationAtomA', 'a11y.orientationAtomAStringProperty' );
addToMapIfDefined( 'a11y_orientationAtomB', 'a11y.orientationAtomBStringProperty' );
addToMapIfDefined( 'a11y_orientationMolecule', 'a11y.orientationMoleculeStringProperty' );
addToMapIfDefined( 'a11y_partialChargeSign', 'a11y.partialChargeSignStringProperty' );
addToMapIfDefined( 'a11y_partialChargeMagnitude', 'a11y.partialChargeMagnitudeStringProperty' );
addToMapIfDefined( 'a11y_partialChargeProgress', 'a11y.partialChargeProgressStringProperty' );
addToMapIfDefined( 'a11y_polarity', 'a11y.polarityStringProperty' );
addToMapIfDefined( 'a11y_rotation', 'a11y.rotationStringProperty' );
addToMapIfDefined( 'a11y_shape', 'a11y.shapeStringProperty' );
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
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_electronDensityDescription', 'a11y.twoAtomsScreen.moleculeAB.electronDensityDescriptionStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_electricFieldAligned', 'a11y.twoAtomsScreen.moleculeAB.electricFieldAlignedStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_orientationDescription', 'a11y.twoAtomsScreen.moleculeAB.orientationDescriptionStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_moleculeAB_electronegativityValues', 'a11y.twoAtomsScreen.moleculeAB.electronegativityValuesStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_accessibleName', 'a11y.twoAtomsScreen.rotateMoleculeSlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_accessibleHelpText', 'a11y.twoAtomsScreen.rotateMoleculeSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg0', 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg0StringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg45', 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg45StringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg90', 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg90StringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg135', 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg135StringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg180', 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg180StringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg225', 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg225StringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg270', 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg270StringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg315', 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg315StringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg360', 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg360StringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_rotationDirection', 'a11y.twoAtomsScreen.rotateMoleculeSlider.rotationDirectionStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_rotateMoleculeSlider_electricFieldContext', 'a11y.twoAtomsScreen.rotateMoleculeSlider.electricFieldContextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_atomAElectronegativitySlider_accessibleName', 'a11y.twoAtomsScreen.atomAElectronegativitySlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_atomAElectronegativitySlider_accessibleHelpText', 'a11y.twoAtomsScreen.atomAElectronegativitySlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_atomAElectronegativitySlider_dipoleContext', 'a11y.twoAtomsScreen.atomAElectronegativitySlider.dipoleContextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_atomAElectronegativitySlider_dipoleDirectionChange', 'a11y.twoAtomsScreen.atomAElectronegativitySlider.dipoleDirectionChangeStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_atomAElectronegativitySlider_partialChargeContext', 'a11y.twoAtomsScreen.atomAElectronegativitySlider.partialChargeContextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_atomAElectronegativitySlider_partialChargeSignChange', 'a11y.twoAtomsScreen.atomAElectronegativitySlider.partialChargeSignChangeStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_atomAElectronegativitySlider_bondCharacterContext', 'a11y.twoAtomsScreen.atomAElectronegativitySlider.bondCharacterContextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_atomAElectronegativitySlider_electrostaticContext', 'a11y.twoAtomsScreen.atomAElectronegativitySlider.electrostaticContextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_atomAElectronegativitySlider_electronDensityContext', 'a11y.twoAtomsScreen.atomAElectronegativitySlider.electronDensityContextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_atomAElectronegativitySlider_electricFieldContext', 'a11y.twoAtomsScreen.atomAElectronegativitySlider.electricFieldContextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_atomBElectronegativitySlider_accessibleName', 'a11y.twoAtomsScreen.atomBElectronegativitySlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_atomBElectronegativitySlider_accessibleHelpText', 'a11y.twoAtomsScreen.atomBElectronegativitySlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_bondDipoleCheckbox_accessibleName', 'a11y.twoAtomsScreen.controlArea.bondDipoleCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_bondDipoleCheckbox_accessibleHelpText', 'a11y.twoAtomsScreen.controlArea.bondDipoleCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_bondDipoleCheckbox_checked', 'a11y.twoAtomsScreen.controlArea.bondDipoleCheckbox.checkedStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_bondDipoleCheckbox_unchecked', 'a11y.twoAtomsScreen.controlArea.bondDipoleCheckbox.uncheckedStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_partialChargesCheckbox_accessibleName', 'a11y.twoAtomsScreen.controlArea.partialChargesCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_partialChargesCheckbox_accessibleHelpText', 'a11y.twoAtomsScreen.controlArea.partialChargesCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_partialChargesCheckbox_checked', 'a11y.twoAtomsScreen.controlArea.partialChargesCheckbox.checkedStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_partialChargesCheckbox_unchecked', 'a11y.twoAtomsScreen.controlArea.partialChargesCheckbox.uncheckedStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_bondCharacterCheckbox_accessibleName', 'a11y.twoAtomsScreen.controlArea.bondCharacterCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_bondCharacterCheckbox_accessibleHelpText', 'a11y.twoAtomsScreen.controlArea.bondCharacterCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_bondCharacterCheckbox_checked', 'a11y.twoAtomsScreen.controlArea.bondCharacterCheckbox.checkedStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_bondCharacterCheckbox_unchecked', 'a11y.twoAtomsScreen.controlArea.bondCharacterCheckbox.uncheckedStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_surfaceRadioGroup_accessibleName', 'a11y.twoAtomsScreen.controlArea.surfaceRadioGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_surfaceRadioGroup_accessibleHelpText', 'a11y.twoAtomsScreen.controlArea.surfaceRadioGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_surfaceRadioGroup_noneSelected', 'a11y.twoAtomsScreen.controlArea.surfaceRadioGroup.noneSelectedStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_surfaceRadioGroup_electrostaticSelected', 'a11y.twoAtomsScreen.controlArea.surfaceRadioGroup.electrostaticSelectedStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_surfaceRadioGroup_electronDensitySelected', 'a11y.twoAtomsScreen.controlArea.surfaceRadioGroup.electronDensitySelectedStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_electricFieldToggle_accessibleName', 'a11y.twoAtomsScreen.controlArea.electricFieldToggle.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_electricFieldToggle_accessibleHelpText', 'a11y.twoAtomsScreen.controlArea.electricFieldToggle.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_electricFieldToggle_on', 'a11y.twoAtomsScreen.controlArea.electricFieldToggle.onStringProperty' );
addToMapIfDefined( 'a11y_twoAtomsScreen_controlArea_electricFieldToggle_off', 'a11y.twoAtomsScreen.controlArea.electricFieldToggle.offStringProperty' );
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
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_bondDipoleABDescription', 'a11y.threeAtomsScreen.moleculeABC.bondDipoleABDescriptionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_bondDipoleABDirection', 'a11y.threeAtomsScreen.moleculeABC.bondDipoleABDirectionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_bondDipoleBCDescription', 'a11y.threeAtomsScreen.moleculeABC.bondDipoleBCDescriptionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_bondDipoleBCDirection', 'a11y.threeAtomsScreen.moleculeABC.bondDipoleBCDirectionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moleculeABC_partialChargesDescription', 'a11y.threeAtomsScreen.moleculeABC.partialChargesDescriptionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomASlider_accessibleName', 'a11y.threeAtomsScreen.moveAtomASlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomASlider_accessibleHelpText', 'a11y.threeAtomsScreen.moveAtomASlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomASlider_valueText_oclock', 'a11y.threeAtomsScreen.moveAtomASlider.valueText.oclockStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomASlider_valueText_overlappingC', 'a11y.threeAtomsScreen.moveAtomASlider.valueText.overlappingCStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomASlider_valueText_onTopOfC', 'a11y.threeAtomsScreen.moveAtomASlider.valueText.onTopOfCStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomASlider_bondDipoleContext', 'a11y.threeAtomsScreen.moveAtomASlider.bondDipoleContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomASlider_molecularDipoleContext', 'a11y.threeAtomsScreen.moveAtomASlider.molecularDipoleContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomCSlider_accessibleName', 'a11y.threeAtomsScreen.moveAtomCSlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomCSlider_accessibleHelpText', 'a11y.threeAtomsScreen.moveAtomCSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomCSlider_valueText_oclock', 'a11y.threeAtomsScreen.moveAtomCSlider.valueText.oclockStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomCSlider_valueText_overlappingA', 'a11y.threeAtomsScreen.moveAtomCSlider.valueText.overlappingAStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_moveAtomCSlider_valueText_onTopOfA', 'a11y.threeAtomsScreen.moveAtomCSlider.valueText.onTopOfAStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_accessibleName', 'a11y.threeAtomsScreen.rotateMoleculeSlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_accessibleHelpText', 'a11y.threeAtomsScreen.rotateMoleculeSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg0', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg0StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg30', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg30StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg60', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg60StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg90', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg90StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg120', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg120StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg150', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg150StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg180', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg180StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg210', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg210StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg240', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg240StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg270', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg270StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg300', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg300StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg330', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg330StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg360', 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg360StringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_molecularDipoleContext', 'a11y.threeAtomsScreen.rotateMoleculeSlider.molecularDipoleContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_rotateMoleculeSlider_electricFieldContext', 'a11y.threeAtomsScreen.rotateMoleculeSlider.electricFieldContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomAElectronegativitySlider_accessibleName', 'a11y.threeAtomsScreen.atomAElectronegativitySlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomAElectronegativitySlider_accessibleHelpText', 'a11y.threeAtomsScreen.atomAElectronegativitySlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomAElectronegativitySlider_bondDipoleContext', 'a11y.threeAtomsScreen.atomAElectronegativitySlider.bondDipoleContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomAElectronegativitySlider_bondDipoleDirectionChange', 'a11y.threeAtomsScreen.atomAElectronegativitySlider.bondDipoleDirectionChangeStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomAElectronegativitySlider_molecularDipoleContext', 'a11y.threeAtomsScreen.atomAElectronegativitySlider.molecularDipoleContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomAElectronegativitySlider_molecularDipoleDirection', 'a11y.threeAtomsScreen.atomAElectronegativitySlider.molecularDipoleDirectionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomAElectronegativitySlider_partialChargeContext', 'a11y.threeAtomsScreen.atomAElectronegativitySlider.partialChargeContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomAElectronegativitySlider_partialChargeSignChange', 'a11y.threeAtomsScreen.atomAElectronegativitySlider.partialChargeSignChangeStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomAElectronegativitySlider_electricFieldContext', 'a11y.threeAtomsScreen.atomAElectronegativitySlider.electricFieldContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomBElectronegativitySlider_accessibleName', 'a11y.threeAtomsScreen.atomBElectronegativitySlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomBElectronegativitySlider_accessibleHelpText', 'a11y.threeAtomsScreen.atomBElectronegativitySlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomBElectronegativitySlider_bondDipoleContext', 'a11y.threeAtomsScreen.atomBElectronegativitySlider.bondDipoleContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomBElectronegativitySlider_bondDipoleABDirectionChange', 'a11y.threeAtomsScreen.atomBElectronegativitySlider.bondDipoleABDirectionChangeStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomBElectronegativitySlider_bondDipoleBCDirectionChange', 'a11y.threeAtomsScreen.atomBElectronegativitySlider.bondDipoleBCDirectionChangeStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomBElectronegativitySlider_molecularDipoleContext', 'a11y.threeAtomsScreen.atomBElectronegativitySlider.molecularDipoleContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomBElectronegativitySlider_molecularDipoleDirection', 'a11y.threeAtomsScreen.atomBElectronegativitySlider.molecularDipoleDirectionStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomBElectronegativitySlider_partialChargeContext', 'a11y.threeAtomsScreen.atomBElectronegativitySlider.partialChargeContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomBElectronegativitySlider_electricFieldContext', 'a11y.threeAtomsScreen.atomBElectronegativitySlider.electricFieldContextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomCElectronegativitySlider_accessibleName', 'a11y.threeAtomsScreen.atomCElectronegativitySlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomCElectronegativitySlider_accessibleHelpText', 'a11y.threeAtomsScreen.atomCElectronegativitySlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_atomCElectronegativitySlider_bondDipoleDirectionChange', 'a11y.threeAtomsScreen.atomCElectronegativitySlider.bondDipoleDirectionChangeStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_bondDipoleCheckbox_accessibleName', 'a11y.threeAtomsScreen.controlArea.bondDipoleCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_bondDipoleCheckbox_accessibleHelpText', 'a11y.threeAtomsScreen.controlArea.bondDipoleCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_bondDipoleCheckbox_checked', 'a11y.threeAtomsScreen.controlArea.bondDipoleCheckbox.checkedStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_bondDipoleCheckbox_unchecked', 'a11y.threeAtomsScreen.controlArea.bondDipoleCheckbox.uncheckedStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_molecularDipoleCheckbox_accessibleName', 'a11y.threeAtomsScreen.controlArea.molecularDipoleCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_molecularDipoleCheckbox_accessibleHelpText', 'a11y.threeAtomsScreen.controlArea.molecularDipoleCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_molecularDipoleCheckbox_checked', 'a11y.threeAtomsScreen.controlArea.molecularDipoleCheckbox.checkedStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_molecularDipoleCheckbox_unchecked', 'a11y.threeAtomsScreen.controlArea.molecularDipoleCheckbox.uncheckedStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_partialChargesCheckbox_accessibleName', 'a11y.threeAtomsScreen.controlArea.partialChargesCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_partialChargesCheckbox_accessibleHelpText', 'a11y.threeAtomsScreen.controlArea.partialChargesCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_partialChargesCheckbox_checked', 'a11y.threeAtomsScreen.controlArea.partialChargesCheckbox.checkedStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_partialChargesCheckbox_unchecked', 'a11y.threeAtomsScreen.controlArea.partialChargesCheckbox.uncheckedStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_electricFieldToggle_accessibleName', 'a11y.threeAtomsScreen.controlArea.electricFieldToggle.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_electricFieldToggle_accessibleHelpText', 'a11y.threeAtomsScreen.controlArea.electricFieldToggle.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_electricFieldToggle_on', 'a11y.threeAtomsScreen.controlArea.electricFieldToggle.onStringProperty' );
addToMapIfDefined( 'a11y_threeAtomsScreen_controlArea_electricFieldToggle_off', 'a11y.threeAtomsScreen.controlArea.electricFieldToggle.offStringProperty' );

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
  _comment_0: new FluentComment( {"comment":"MolecularDipole6 - Molecular Dipole magnitude (Screen 2)","associatedKey":"molecularDipole"} ),
  _comment_1: new FluentComment( {"comment":"Note: May need a larger region set - alternative 7-region","associatedKey":"molecularDipole"} ),
  molecularDipoleStringProperty: _.get( MoleculePolarityStrings, 'molecularDipoleStringProperty' ),
  _comment_2: new FluentComment( {"comment":"EN6 - Electronegativity levels (Screen 1/2)","associatedKey":"electronegativity"} ),
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
  _comment_3: new FluentComment( {"comment":"ElectroPotential6 - Electrostatic Potential (Screen 1)","associatedKey":"electrostaticPotential"} ),
  electrostaticPotentialStringProperty: _.get( MoleculePolarityStrings, 'electrostaticPotentialStringProperty' ),
  _comment_4: new FluentComment( {"comment":"ElectronDensity6 - Electron Density (Screen 1)","associatedKey":"electronDensity"} ),
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
      },
      bondType: new FluentPattern<{ strength: 'veryIonic' | 'mostlyIonic' | 'slightlyIonic' | 'slightlyCovalent' | 'mostlyCovalent' | 'veryCovalent' | TReadOnlyProperty<'veryIonic' | 'mostlyIonic' | 'slightlyIonic' | 'slightlyCovalent' | 'mostlyCovalent' | 'veryCovalent'> }>( fluentSupport.bundleProperty, 'a11y_common_bondType', _.get( MoleculePolarityStrings, 'a11y.common.bondTypeStringProperty' ), [{"name":"strength","variants":["veryIonic","mostlyIonic","slightlyIonic","slightlyCovalent","mostlyCovalent","veryCovalent"]}] ),
      bondDipole: new FluentPattern<{ dipole: 'no' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | TReadOnlyProperty<'no' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge'> }>( fluentSupport.bundleProperty, 'a11y_common_bondDipole', _.get( MoleculePolarityStrings, 'a11y.common.bondDipoleStringProperty' ), [{"name":"dipole","variants":["no","verySmall","small","medium","large","veryLarge"]}] ),
      dipoleProgress: new FluentPattern<{ progress: number | 'zero' | 'smaller' | 'larger' | TReadOnlyProperty<number | 'zero' | 'smaller' | 'larger'> }>( fluentSupport.bundleProperty, 'a11y_common_dipoleProgress', _.get( MoleculePolarityStrings, 'a11y.common.dipoleProgressStringProperty' ), [{"name":"progress","variants":[{"type":"number","value":"zero"},"smaller","larger"]}] )
    },
    _comment_0: new FluentComment( {"comment":"===================","associatedKey":"bondCharacterProgress"} ),
    _comment_1: new FluentComment( {"comment":"REGIONS / PARAMETERS","associatedKey":"bondCharacterProgress"} ),
    _comment_2: new FluentComment( {"comment":"===================","associatedKey":"bondCharacterProgress"} ),
    _comment_3: new FluentComment( {"comment":"BondCharProgress2 - Bond Character Progress (Screen 1)","associatedKey":"bondCharacterProgress"} ),
    _comment_4: new FluentComment( {"comment":"Implementation: ΔEN > 0 = more ionic; ΔEN < 0 more covalent","associatedKey":"bondCharacterProgress"} ),
    bondCharacterProgress: new FluentPattern<{ progress: 'moreIonic' | 'moreCovalent' | TReadOnlyProperty<'moreIonic' | 'moreCovalent'> }>( fluentSupport.bundleProperty, 'a11y_bondCharacterProgress', _.get( MoleculePolarityStrings, 'a11y.bondCharacterProgressStringProperty' ), [{"name":"progress","variants":["moreIonic","moreCovalent"]}] ),
    _comment_5: new FluentComment( {"comment":"DipoleOrientAB2 - Dipole Orientation AB (Screen 1/2)","associatedKey":"dipoleOrientAB"} ),
    dipoleOrientAB: new FluentPattern<{ direction: 'toB' | 'toA' | TReadOnlyProperty<'toB' | 'toA'> }>( fluentSupport.bundleProperty, 'a11y_dipoleOrientAB', _.get( MoleculePolarityStrings, 'a11y.dipoleOrientABStringProperty' ), [{"name":"direction","variants":["toB","toA"]}] ),
    _comment_6: new FluentComment( {"comment":"DipoleOrientBC2 - Dipole Orientation BC (Screen 2)","associatedKey":"dipoleOrientBC"} ),
    dipoleOrientBC: new FluentPattern<{ direction: 'toB' | 'toC' | TReadOnlyProperty<'toB' | 'toC'> }>( fluentSupport.bundleProperty, 'a11y_dipoleOrientBC', _.get( MoleculePolarityStrings, 'a11y.dipoleOrientBCStringProperty' ), [{"name":"direction","variants":["toB","toC"]}] ),
    _comment_7: new FluentComment( {"comment":"ElectronDensity6 - Electron Density (Screen 1)","associatedKey":"electronDensity"} ),
    electronDensity: new FluentPattern<{ density: 'evenly' | 'nearlyEvenly' | 'slightlyUnevenly' | 'unevenly' | 'veryUnevenly' | 'mostUnevenly' | TReadOnlyProperty<'evenly' | 'nearlyEvenly' | 'slightlyUnevenly' | 'unevenly' | 'veryUnevenly' | 'mostUnevenly'> }>( fluentSupport.bundleProperty, 'a11y_electronDensity', _.get( MoleculePolarityStrings, 'a11y.electronDensityStringProperty' ), [{"name":"density","variants":["evenly","nearlyEvenly","slightlyUnevenly","unevenly","veryUnevenly","mostUnevenly"]}] ),
    _comment_8: new FluentComment( {"comment":"ElectronDensityProgress2 - Electron Density Progress (Screen 1)","associatedKey":"electronDensityProgress"} ),
    electronDensityProgress: new FluentPattern<{ progress: 'more' | 'less' | TReadOnlyProperty<'more' | 'less'> }>( fluentSupport.bundleProperty, 'a11y_electronDensityProgress', _.get( MoleculePolarityStrings, 'a11y.electronDensityProgressStringProperty' ), [{"name":"progress","variants":["more","less"]}] ),
    _comment_9: new FluentComment( {"comment":"ElectroPotential6 - Electrostatic Potential (Screen 1)","associatedKey":"electrostaticPotential"} ),
    electrostaticPotential: new FluentPattern<{ potential: 'no' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | TReadOnlyProperty<'no' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge'> }>( fluentSupport.bundleProperty, 'a11y_electrostaticPotential', _.get( MoleculePolarityStrings, 'a11y.electrostaticPotentialStringProperty' ), [{"name":"potential","variants":["no","verySmall","small","medium","large","veryLarge"]}] ),
    _comment_10: new FluentComment( {"comment":"ElectroPotentialProgress5 - Electrostatic Potential Progress (Screen 1)","associatedKey":"electrostaticPotentialProgress"} ),
    _comment_11: new FluentComment( {"comment":"2-range spectrum: positive-neutral-negative","associatedKey":"electrostaticPotentialProgress"} ),
    electrostaticPotentialProgress: new FluentPattern<{ progress: 'morePositive' | 'lessPositive' | 'neutral' | 'lessNegative' | 'moreNegative' | TReadOnlyProperty<'morePositive' | 'lessPositive' | 'neutral' | 'lessNegative' | 'moreNegative'> }>( fluentSupport.bundleProperty, 'a11y_electrostaticPotentialProgress', _.get( MoleculePolarityStrings, 'a11y.electrostaticPotentialProgressStringProperty' ), [{"name":"progress","variants":["morePositive","lessPositive","neutral","lessNegative","moreNegative"]}] ),
    _comment_12: new FluentComment( {"comment":"EN6 - Electronegativity levels (Screen 1/2)","associatedKey":"electronegativity"} ),
    electronegativity: new FluentPattern<{ level: 'veryLow' | 'low' | 'mediumLow' | 'mediumHigh' | 'high' | 'veryHigh' | TReadOnlyProperty<'veryLow' | 'low' | 'mediumLow' | 'mediumHigh' | 'high' | 'veryHigh'> }>( fluentSupport.bundleProperty, 'a11y_electronegativity', _.get( MoleculePolarityStrings, 'a11y.electronegativityStringProperty' ), [{"name":"level","variants":["veryLow","low","mediumLow","mediumHigh","high","veryHigh"]}] ),
    _comment_13: new FluentComment( {"comment":"Field2 - Electric Field state (Screen 1/2)","associatedKey":"field"} ),
    field: new FluentPattern<{ state: 'on' | 'off' | TReadOnlyProperty<'on' | 'off'> }>( fluentSupport.bundleProperty, 'a11y_field', _.get( MoleculePolarityStrings, 'a11y.fieldStringProperty' ), [{"name":"state","variants":["on","off"]}] ),
    _comment_14: new FluentComment( {"comment":"MolecularDipole6 - Molecular Dipole magnitude (Screen 2)","associatedKey":"molecularDipole"} ),
    _comment_15: new FluentComment( {"comment":"Note: May need a larger region set - alternative 7-region","associatedKey":"molecularDipole"} ),
    molecularDipole: new FluentPattern<{ magnitude: 'no' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | 'extremelyLarge' | TReadOnlyProperty<'no' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | 'extremelyLarge'> }>( fluentSupport.bundleProperty, 'a11y_molecularDipole', _.get( MoleculePolarityStrings, 'a11y.molecularDipoleStringProperty' ), [{"name":"magnitude","variants":["no","verySmall","small","medium","large","veryLarge","extremelyLarge"]}] ),
    _comment_16: new FluentComment( {"comment":"OrientationAtomA - Orientation for Atom A (Screen 1)","associatedKey":"orientationAtomA"} ),
    orientationAtomA: new FluentPattern<{ position: 'at9' | 'between10And11' | 'at12' | 'between1And2' | 'at3' | 'between4And5' | 'at6' | 'between7And8' | TReadOnlyProperty<'at9' | 'between10And11' | 'at12' | 'between1And2' | 'at3' | 'between4And5' | 'at6' | 'between7And8'> }>( fluentSupport.bundleProperty, 'a11y_orientationAtomA', _.get( MoleculePolarityStrings, 'a11y.orientationAtomAStringProperty' ), [{"name":"position","variants":["at9","between10And11","at12","between1And2","at3","between4And5","at6","between7And8"]}] ),
    _comment_17: new FluentComment( {"comment":"OrientationAtomB - Orientation for Atom B (Screen 1)","associatedKey":"orientationAtomB"} ),
    orientationAtomB: new FluentPattern<{ position: 'at3' | 'between4And5' | 'at6' | 'between7And8' | 'at9' | 'between10And11' | 'at12' | 'between1And2' | TReadOnlyProperty<'at3' | 'between4And5' | 'at6' | 'between7And8' | 'at9' | 'between10And11' | 'at12' | 'between1And2'> }>( fluentSupport.bundleProperty, 'a11y_orientationAtomB', _.get( MoleculePolarityStrings, 'a11y.orientationAtomBStringProperty' ), [{"name":"position","variants":["at3","between4And5","at6","between7And8","at9","between10And11","at12","between1And2"]}] ),
    _comment_18: new FluentComment( {"comment":"OrientationMol3 - Molecule orientation (Screen 1)","associatedKey":"orientationMolecule"} ),
    orientationMolecule: new FluentPattern<{ orientation: 'horizontal' | 'diagonal' | 'vertical' | TReadOnlyProperty<'horizontal' | 'diagonal' | 'vertical'> }>( fluentSupport.bundleProperty, 'a11y_orientationMolecule', _.get( MoleculePolarityStrings, 'a11y.orientationMoleculeStringProperty' ), [{"name":"orientation","variants":["horizontal","diagonal","vertical"]}] ),
    _comment_19: new FluentComment( {"comment":"PartialCharge2 - Partial Charge sign (Screen 1/2)","associatedKey":"partialChargeSign"} ),
    partialChargeSign: new FluentPattern<{ sign: 'positive' | 'negative' | TReadOnlyProperty<'positive' | 'negative'> }>( fluentSupport.bundleProperty, 'a11y_partialChargeSign', _.get( MoleculePolarityStrings, 'a11y.partialChargeSignStringProperty' ), [{"name":"sign","variants":["positive","negative"]}] ),
    _comment_20: new FluentComment( {"comment":"PartialCharge6 - Partial Charge magnitude (Screen 1/2)","associatedKey":"partialChargeMagnitude"} ),
    partialChargeMagnitude: new FluentPattern<{ magnitude: 'no' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge' | TReadOnlyProperty<'no' | 'verySmall' | 'small' | 'medium' | 'large' | 'veryLarge'> }>( fluentSupport.bundleProperty, 'a11y_partialChargeMagnitude', _.get( MoleculePolarityStrings, 'a11y.partialChargeMagnitudeStringProperty' ), [{"name":"magnitude","variants":["no","verySmall","small","medium","large","veryLarge"]}] ),
    _comment_21: new FluentComment( {"comment":"PartialChargeProgress3 - Partial Charge Progress (Screen 1/2)","associatedKey":"partialChargeProgress"} ),
    partialChargeProgress: new FluentPattern<{ progress: 'morePositive' | 'moreNegative' | number | 'zero' | TReadOnlyProperty<'morePositive' | 'moreNegative' | number | 'zero'> }>( fluentSupport.bundleProperty, 'a11y_partialChargeProgress', _.get( MoleculePolarityStrings, 'a11y.partialChargeProgressStringProperty' ), [{"name":"progress","variants":["morePositive","moreNegative",{"type":"number","value":"zero"}]}] ),
    _comment_22: new FluentComment( {"comment":"Polarity6 - Bond Polarity (Screen 1/2)","associatedKey":"polarity"} ),
    polarity: new FluentPattern<{ polarity: 'nonpolar' | 'veryWeaklyPolar' | 'weaklyPolar' | 'polar' | 'stronglyPolar' | 'veryStronglyPolar' | TReadOnlyProperty<'nonpolar' | 'veryWeaklyPolar' | 'weaklyPolar' | 'polar' | 'stronglyPolar' | 'veryStronglyPolar'> }>( fluentSupport.bundleProperty, 'a11y_polarity', _.get( MoleculePolarityStrings, 'a11y.polarityStringProperty' ), [{"name":"polarity","variants":["nonpolar","veryWeaklyPolar","weaklyPolar","polar","stronglyPolar","veryStronglyPolar"]}] ),
    _comment_23: new FluentComment( {"comment":"Rotation2 - Rotation direction (Screen 1/2)","associatedKey":"rotation"} ),
    rotation: new FluentPattern<{ direction: 'clockwise' | 'counterclockwise' | TReadOnlyProperty<'clockwise' | 'counterclockwise'> }>( fluentSupport.bundleProperty, 'a11y_rotation', _.get( MoleculePolarityStrings, 'a11y.rotationStringProperty' ), [{"name":"direction","variants":["clockwise","counterclockwise"]}] ),
    _comment_24: new FluentComment( {"comment":"Shape7 - Molecule shape (Screen 2)","associatedKey":"shape"} ),
    shape: new FluentPattern<{ shape: 'linear' | 'nearlyLinear' | 'slightlyBent' | 'bent' | 'veryBent' | 'extremelyBentSlightOverlap' | 'atomsOverlap' | TReadOnlyProperty<'linear' | 'nearlyLinear' | 'slightlyBent' | 'bent' | 'veryBent' | 'extremelyBentSlightOverlap' | 'atomsOverlap'> }>( fluentSupport.bundleProperty, 'a11y_shape', _.get( MoleculePolarityStrings, 'a11y.shapeStringProperty' ), [{"name":"shape","variants":["linear","nearlyLinear","slightlyBent","bent","veryBent","extremelyBentSlightOverlap","atomsOverlap"]}] ),
    _comment_25: new FluentComment( {"comment":"===================","associatedKey":"twoAtomsScreen"} ),
    _comment_26: new FluentComment( {"comment":"TWO ATOMS SCREEN","associatedKey":"twoAtomsScreen"} ),
    _comment_27: new FluentComment( {"comment":"===================","associatedKey":"twoAtomsScreen"} ),
    twoAtomsScreen: {
      _comment_0: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      _comment_1: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_screenSummary_playArea', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.screenSummary.playAreaStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"Control Area","associatedKey":"controlArea"} ),
        _comment_1: new FluentComment( {"comment":"Control Area","associatedKey":"controlArea"} ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_screenSummary_controlArea', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetails: new FluentPattern<{ field: FluentVariable, polarity: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_screenSummary_currentDetails', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.screenSummary.currentDetailsStringProperty' ), [{"name":"field"},{"name":"polarity"}] ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_screenSummary_interactionHint', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.screenSummary.interactionHintStringProperty' ) )
      },
      _comment_2: new FluentComment( {"comment":"Play Area - Molecule AB heading","associatedKey":"moleculeAB"} ),
      moleculeAB: {
        headingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_heading', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.headingStringProperty' ) ),
        currentState: new FluentPattern<{ polarity: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_currentState', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.currentStateStringProperty' ), [{"name":"polarity"}] ),
        bondDipoleDescription: new FluentPattern<{ bondDipoleMagnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_bondDipoleDescription', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.bondDipoleDescriptionStringProperty' ), [{"name":"bondDipoleMagnitude"}] ),
        bondDipoleDirection: new FluentPattern<{ dipoleDirection: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_bondDipoleDirection', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.bondDipoleDirectionStringProperty' ), [{"name":"dipoleDirection"}] ),
        partialChargesDescription: new FluentPattern<{ partialChargeMagnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_partialChargesDescription', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.partialChargesDescriptionStringProperty' ), [{"name":"partialChargeMagnitude"}] ),
        partialChargesDetail: new FluentPattern<{ chargeA: FluentVariable, chargeB: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_partialChargesDetail', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.partialChargesDetailStringProperty' ), [{"name":"chargeA"},{"name":"chargeB"}] ),
        bondCharacterDescription: new FluentPattern<{ bondCharacter: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_bondCharacterDescription', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.bondCharacterDescriptionStringProperty' ), [{"name":"bondCharacter"}] ),
        electrostaticPotentialDescription: new FluentPattern<{ potential: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_electrostaticPotentialDescription', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.electrostaticPotentialDescriptionStringProperty' ), [{"name":"potential"}] ),
        electronDensityDescription: new FluentPattern<{ density: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_electronDensityDescription', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.electronDensityDescriptionStringProperty' ), [{"name":"density"}] ),
        electricFieldAlignedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_electricFieldAligned', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.electricFieldAlignedStringProperty' ) ),
        orientationDescription: new FluentPattern<{ atomAPosition: FluentVariable, atomBPosition: FluentVariable, orientation: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_orientationDescription', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.orientationDescriptionStringProperty' ), [{"name":"atomAPosition"},{"name":"atomBPosition"},{"name":"orientation"}] ),
        electronegativityValues: new FluentPattern<{ enA: FluentVariable, enB: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_moleculeAB_electronegativityValues', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.moleculeAB.electronegativityValuesStringProperty' ), [{"name":"enA"},{"name":"enB"}] )
      },
      _comment_3: new FluentComment( {"comment":"Rotate Molecule AB Slider","associatedKey":"rotateMoleculeSlider"} ),
      _comment_4: new FluentComment( {"comment":"Rotate Molecule ABC Slider","associatedKey":"rotateMoleculeSlider"} ),
      rotateMoleculeSlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.accessibleHelpTextStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"ARIA valuetext options","associatedKey":"valueText"} ),
        _comment_1: new FluentComment( {"comment":"ARIA valuetext - clock positions","associatedKey":"valueText"} ),
        valueText: {
          deg0StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg0', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg0StringProperty' ) ),
          deg45StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg45', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg45StringProperty' ) ),
          deg90StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg90', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg90StringProperty' ) ),
          deg135StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg135', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg135StringProperty' ) ),
          deg180StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg180', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg180StringProperty' ) ),
          deg225StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg225', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg225StringProperty' ) ),
          deg270StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg270', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg270StringProperty' ) ),
          deg315StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg315', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg315StringProperty' ) ),
          deg360StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_valueText_deg360', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.valueText.deg360StringProperty' ) )
        },
        rotationDirection: new FluentPattern<{ direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_rotationDirection', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.rotationDirectionStringProperty' ), [{"name":"direction"}] ),
        electricFieldContext: new FluentPattern<{ direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_rotateMoleculeSlider_electricFieldContext', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.rotateMoleculeSlider.electricFieldContextStringProperty' ), [{"name":"direction"}] )
      },
      _comment_5: new FluentComment( {"comment":"Atom A Electronegativity Slider","associatedKey":"atomAElectronegativitySlider"} ),
      _comment_6: new FluentComment( {"comment":"Atom A Electronegativity Slider","associatedKey":"atomAElectronegativitySlider"} ),
      atomAElectronegativitySlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_atomAElectronegativitySlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.atomAElectronegativitySlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_atomAElectronegativitySlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.atomAElectronegativitySlider.accessibleHelpTextStringProperty' ) ),
        dipoleContext: new FluentPattern<{ progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_atomAElectronegativitySlider_dipoleContext', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.atomAElectronegativitySlider.dipoleContextStringProperty' ), [{"name":"progress"}] ),
        dipoleDirectionChange: new FluentPattern<{ direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_atomAElectronegativitySlider_dipoleDirectionChange', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.atomAElectronegativitySlider.dipoleDirectionChangeStringProperty' ), [{"name":"direction"}] ),
        partialChargeContext: new FluentPattern<{ progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_atomAElectronegativitySlider_partialChargeContext', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.atomAElectronegativitySlider.partialChargeContextStringProperty' ), [{"name":"progress"}] ),
        partialChargeSignChange: new FluentPattern<{ sign: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_atomAElectronegativitySlider_partialChargeSignChange', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.atomAElectronegativitySlider.partialChargeSignChangeStringProperty' ), [{"name":"sign"}] ),
        bondCharacterContext: new FluentPattern<{ progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_atomAElectronegativitySlider_bondCharacterContext', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.atomAElectronegativitySlider.bondCharacterContextStringProperty' ), [{"name":"progress"}] ),
        electrostaticContext: new FluentPattern<{ progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_atomAElectronegativitySlider_electrostaticContext', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.atomAElectronegativitySlider.electrostaticContextStringProperty' ), [{"name":"progress"}] ),
        electronDensityContext: new FluentPattern<{ progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_atomAElectronegativitySlider_electronDensityContext', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.atomAElectronegativitySlider.electronDensityContextStringProperty' ), [{"name":"progress"}] ),
        electricFieldContextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_atomAElectronegativitySlider_electricFieldContext', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.atomAElectronegativitySlider.electricFieldContextStringProperty' ) )
      },
      _comment_7: new FluentComment( {"comment":"Atom B Electronegativity Slider","associatedKey":"atomBElectronegativitySlider"} ),
      _comment_8: new FluentComment( {"comment":"Atom B Electronegativity Slider","associatedKey":"atomBElectronegativitySlider"} ),
      atomBElectronegativitySlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_atomBElectronegativitySlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.atomBElectronegativitySlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_atomBElectronegativitySlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.atomBElectronegativitySlider.accessibleHelpTextStringProperty' ) )
      },
      _comment_9: new FluentComment( {"comment":"Control Area","associatedKey":"controlArea"} ),
      _comment_10: new FluentComment( {"comment":"Control Area","associatedKey":"controlArea"} ),
      controlArea: {
        bondDipoleCheckbox: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_bondDipoleCheckbox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.bondDipoleCheckbox.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_bondDipoleCheckbox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.bondDipoleCheckbox.accessibleHelpTextStringProperty' ) ),
          checkedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_bondDipoleCheckbox_checked', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.bondDipoleCheckbox.checkedStringProperty' ) ),
          uncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_bondDipoleCheckbox_unchecked', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.bondDipoleCheckbox.uncheckedStringProperty' ) )
        },
        partialChargesCheckbox: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_partialChargesCheckbox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.partialChargesCheckbox.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_partialChargesCheckbox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.partialChargesCheckbox.accessibleHelpTextStringProperty' ) ),
          checkedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_partialChargesCheckbox_checked', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.partialChargesCheckbox.checkedStringProperty' ) ),
          uncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_partialChargesCheckbox_unchecked', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.partialChargesCheckbox.uncheckedStringProperty' ) )
        },
        bondCharacterCheckbox: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_bondCharacterCheckbox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.bondCharacterCheckbox.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_bondCharacterCheckbox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.bondCharacterCheckbox.accessibleHelpTextStringProperty' ) ),
          checkedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_bondCharacterCheckbox_checked', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.bondCharacterCheckbox.checkedStringProperty' ) ),
          uncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_bondCharacterCheckbox_unchecked', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.bondCharacterCheckbox.uncheckedStringProperty' ) )
        },
        surfaceRadioGroup: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_surfaceRadioGroup_accessibleName', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.surfaceRadioGroup.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_surfaceRadioGroup_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.surfaceRadioGroup.accessibleHelpTextStringProperty' ) ),
          noneSelectedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_surfaceRadioGroup_noneSelected', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.surfaceRadioGroup.noneSelectedStringProperty' ) ),
          electrostaticSelectedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_surfaceRadioGroup_electrostaticSelected', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.surfaceRadioGroup.electrostaticSelectedStringProperty' ) ),
          electronDensitySelectedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_surfaceRadioGroup_electronDensitySelected', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.surfaceRadioGroup.electronDensitySelectedStringProperty' ) )
        },
        electricFieldToggle: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_electricFieldToggle_accessibleName', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.electricFieldToggle.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_electricFieldToggle_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.electricFieldToggle.accessibleHelpTextStringProperty' ) ),
          onStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_electricFieldToggle_on', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.electricFieldToggle.onStringProperty' ) ),
          offStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_twoAtomsScreen_controlArea_electricFieldToggle_off', _.get( MoleculePolarityStrings, 'a11y.twoAtomsScreen.controlArea.electricFieldToggle.offStringProperty' ) )
        }
      }
    },
    _comment_28: new FluentComment( {"comment":"===================","associatedKey":"threeAtomsScreen"} ),
    _comment_29: new FluentComment( {"comment":"THREE ATOMS SCREEN","associatedKey":"threeAtomsScreen"} ),
    _comment_30: new FluentComment( {"comment":"===================","associatedKey":"threeAtomsScreen"} ),
    threeAtomsScreen: {
      _comment_0: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      _comment_1: new FluentComment( {"comment":"Screen Summary","associatedKey":"screenSummary"} ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_screenSummary_playArea', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.screenSummary.playAreaStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"Control Area","associatedKey":"controlArea"} ),
        _comment_1: new FluentComment( {"comment":"Control Area","associatedKey":"controlArea"} ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_screenSummary_controlArea', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetails: new FluentPattern<{ field: FluentVariable, polarity: FluentVariable, shape: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_screenSummary_currentDetails', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.screenSummary.currentDetailsStringProperty' ), [{"name":"field"},{"name":"polarity"},{"name":"shape"}] ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_screenSummary_interactionHint', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.screenSummary.interactionHintStringProperty' ) )
      },
      _comment_2: new FluentComment( {"comment":"Play Area - Molecule ABC heading","associatedKey":"moleculeABC"} ),
      moleculeABC: {
        headingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_heading', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.headingStringProperty' ) ),
        currentState: new FluentPattern<{ polarity: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_currentState', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.currentStateStringProperty' ), [{"name":"polarity"}] ),
        orientationDescription: new FluentPattern<{ atomAPosition: FluentVariable, atomCPosition: FluentVariable, shape: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_orientationDescription', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.orientationDescriptionStringProperty' ), [{"name":"atomAPosition"},{"name":"atomCPosition"},{"name":"shape"}] ),
        electricFieldAlignedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_electricFieldAligned', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.electricFieldAlignedStringProperty' ) ),
        electronegativityValues: new FluentPattern<{ enA: FluentVariable, enB: FluentVariable, enC: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_electronegativityValues', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.electronegativityValuesStringProperty' ), [{"name":"enA"},{"name":"enB"},{"name":"enC"}] ),
        molecularDipoleDescription: new FluentPattern<{ magnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_molecularDipoleDescription', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.molecularDipoleDescriptionStringProperty' ), [{"name":"magnitude"}] ),
        molecularDipoleDirection: new FluentPattern<{ position: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_molecularDipoleDirection', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.molecularDipoleDirectionStringProperty' ), [{"name":"position"}] ),
        molecularDipoleTwiceStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_molecularDipoleTwice', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.molecularDipoleTwiceStringProperty' ) ),
        bondDipoleABDescription: new FluentPattern<{ magnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_bondDipoleABDescription', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.bondDipoleABDescriptionStringProperty' ), [{"name":"magnitude"}] ),
        bondDipoleABDirection: new FluentPattern<{ direction: FluentVariable, position: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_bondDipoleABDirection', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.bondDipoleABDirectionStringProperty' ), [{"name":"direction"},{"name":"position"}] ),
        bondDipoleBCDescription: new FluentPattern<{ magnitude: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_bondDipoleBCDescription', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.bondDipoleBCDescriptionStringProperty' ), [{"name":"magnitude"}] ),
        bondDipoleBCDirection: new FluentPattern<{ direction: FluentVariable, position: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_bondDipoleBCDirection', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.bondDipoleBCDirectionStringProperty' ), [{"name":"direction"},{"name":"position"}] ),
        partialChargesDescription: new FluentPattern<{ magnitudeA: FluentVariable, magnitudeB: FluentVariable, magnitudeC: FluentVariable, signA: FluentVariable, signB: FluentVariable, signC: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moleculeABC_partialChargesDescription', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moleculeABC.partialChargesDescriptionStringProperty' ), [{"name":"magnitudeA"},{"name":"magnitudeB"},{"name":"magnitudeC"},{"name":"signA"},{"name":"signB"},{"name":"signC"}] )
      },
      _comment_3: new FluentComment( {"comment":"Move Atom A Slider","associatedKey":"moveAtomASlider"} ),
      moveAtomASlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomASlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomASlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomASlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomASlider.accessibleHelpTextStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"ARIA valuetext options","associatedKey":"valueText"} ),
        _comment_1: new FluentComment( {"comment":"ARIA valuetext - clock positions","associatedKey":"valueText"} ),
        valueText: {
          oclock: new FluentPattern<{ hour: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomASlider_valueText_oclock', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomASlider.valueText.oclockStringProperty' ), [{"name":"hour"}] ),
          overlappingCStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomASlider_valueText_overlappingC', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomASlider.valueText.overlappingCStringProperty' ) ),
          onTopOfCStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomASlider_valueText_onTopOfC', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomASlider.valueText.onTopOfCStringProperty' ) )
        },
        bondDipoleContext: new FluentPattern<{ position: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomASlider_bondDipoleContext', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomASlider.bondDipoleContextStringProperty' ), [{"name":"position"}] ),
        molecularDipoleContext: new FluentPattern<{ magnitude: FluentVariable, position: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomASlider_molecularDipoleContext', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomASlider.molecularDipoleContextStringProperty' ), [{"name":"magnitude"},{"name":"position"}] )
      },
      _comment_4: new FluentComment( {"comment":"Move Atom C Slider","associatedKey":"moveAtomCSlider"} ),
      moveAtomCSlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomCSlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomCSlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomCSlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomCSlider.accessibleHelpTextStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"ARIA valuetext options","associatedKey":"valueText"} ),
        _comment_1: new FluentComment( {"comment":"ARIA valuetext - clock positions","associatedKey":"valueText"} ),
        valueText: {
          oclock: new FluentPattern<{ hour: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomCSlider_valueText_oclock', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomCSlider.valueText.oclockStringProperty' ), [{"name":"hour"}] ),
          overlappingAStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomCSlider_valueText_overlappingA', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomCSlider.valueText.overlappingAStringProperty' ) ),
          onTopOfAStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_moveAtomCSlider_valueText_onTopOfA', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.moveAtomCSlider.valueText.onTopOfAStringProperty' ) )
        }
      },
      _comment_5: new FluentComment( {"comment":"Rotate Molecule AB Slider","associatedKey":"rotateMoleculeSlider"} ),
      _comment_6: new FluentComment( {"comment":"Rotate Molecule ABC Slider","associatedKey":"rotateMoleculeSlider"} ),
      rotateMoleculeSlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.accessibleHelpTextStringProperty' ) ),
        _comment_0: new FluentComment( {"comment":"ARIA valuetext options","associatedKey":"valueText"} ),
        _comment_1: new FluentComment( {"comment":"ARIA valuetext - clock positions","associatedKey":"valueText"} ),
        valueText: {
          deg0StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg0', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg0StringProperty' ) ),
          deg30StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg30', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg30StringProperty' ) ),
          deg60StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg60', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg60StringProperty' ) ),
          deg90StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg90', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg90StringProperty' ) ),
          deg120StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg120', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg120StringProperty' ) ),
          deg150StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg150', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg150StringProperty' ) ),
          deg180StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg180', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg180StringProperty' ) ),
          deg210StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg210', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg210StringProperty' ) ),
          deg240StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg240', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg240StringProperty' ) ),
          deg270StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg270', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg270StringProperty' ) ),
          deg300StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg300', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg300StringProperty' ) ),
          deg330StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg330', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg330StringProperty' ) ),
          deg360StringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_valueText_deg360', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.valueText.deg360StringProperty' ) )
        },
        molecularDipoleContext: new FluentPattern<{ position: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_molecularDipoleContext', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.molecularDipoleContextStringProperty' ), [{"name":"position"}] ),
        electricFieldContext: new FluentPattern<{ direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_rotateMoleculeSlider_electricFieldContext', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.rotateMoleculeSlider.electricFieldContextStringProperty' ), [{"name":"direction"}] )
      },
      _comment_7: new FluentComment( {"comment":"Atom A Electronegativity Slider","associatedKey":"atomAElectronegativitySlider"} ),
      _comment_8: new FluentComment( {"comment":"Atom A Electronegativity Slider","associatedKey":"atomAElectronegativitySlider"} ),
      atomAElectronegativitySlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomAElectronegativitySlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomAElectronegativitySlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomAElectronegativitySlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomAElectronegativitySlider.accessibleHelpTextStringProperty' ) ),
        bondDipoleContext: new FluentPattern<{ progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomAElectronegativitySlider_bondDipoleContext', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomAElectronegativitySlider.bondDipoleContextStringProperty' ), [{"name":"progress"}] ),
        bondDipoleDirectionChange: new FluentPattern<{ direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomAElectronegativitySlider_bondDipoleDirectionChange', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomAElectronegativitySlider.bondDipoleDirectionChangeStringProperty' ), [{"name":"direction"}] ),
        molecularDipoleContext: new FluentPattern<{ progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomAElectronegativitySlider_molecularDipoleContext', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomAElectronegativitySlider.molecularDipoleContextStringProperty' ), [{"name":"progress"}] ),
        molecularDipoleDirection: new FluentPattern<{ position: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomAElectronegativitySlider_molecularDipoleDirection', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomAElectronegativitySlider.molecularDipoleDirectionStringProperty' ), [{"name":"position"}] ),
        partialChargeContext: new FluentPattern<{ progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomAElectronegativitySlider_partialChargeContext', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomAElectronegativitySlider.partialChargeContextStringProperty' ), [{"name":"progress"}] ),
        partialChargeSignChange: new FluentPattern<{ sign: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomAElectronegativitySlider_partialChargeSignChange', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomAElectronegativitySlider.partialChargeSignChangeStringProperty' ), [{"name":"sign"}] ),
        electricFieldContextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomAElectronegativitySlider_electricFieldContext', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomAElectronegativitySlider.electricFieldContextStringProperty' ) )
      },
      _comment_9: new FluentComment( {"comment":"Atom B Electronegativity Slider","associatedKey":"atomBElectronegativitySlider"} ),
      _comment_10: new FluentComment( {"comment":"Atom B Electronegativity Slider","associatedKey":"atomBElectronegativitySlider"} ),
      atomBElectronegativitySlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomBElectronegativitySlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomBElectronegativitySlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomBElectronegativitySlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomBElectronegativitySlider.accessibleHelpTextStringProperty' ) ),
        bondDipoleContext: new FluentPattern<{ progressAB: FluentVariable, progressBC: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomBElectronegativitySlider_bondDipoleContext', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomBElectronegativitySlider.bondDipoleContextStringProperty' ), [{"name":"progressAB"},{"name":"progressBC"}] ),
        bondDipoleABDirectionChange: new FluentPattern<{ direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomBElectronegativitySlider_bondDipoleABDirectionChange', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomBElectronegativitySlider.bondDipoleABDirectionChangeStringProperty' ), [{"name":"direction"}] ),
        bondDipoleBCDirectionChange: new FluentPattern<{ direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomBElectronegativitySlider_bondDipoleBCDirectionChange', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomBElectronegativitySlider.bondDipoleBCDirectionChangeStringProperty' ), [{"name":"direction"}] ),
        molecularDipoleContext: new FluentPattern<{ progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomBElectronegativitySlider_molecularDipoleContext', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomBElectronegativitySlider.molecularDipoleContextStringProperty' ), [{"name":"progress"}] ),
        molecularDipoleDirection: new FluentPattern<{ position: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomBElectronegativitySlider_molecularDipoleDirection', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomBElectronegativitySlider.molecularDipoleDirectionStringProperty' ), [{"name":"position"}] ),
        partialChargeContext: new FluentPattern<{ progress: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomBElectronegativitySlider_partialChargeContext', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomBElectronegativitySlider.partialChargeContextStringProperty' ), [{"name":"progress"}] ),
        electricFieldContextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomBElectronegativitySlider_electricFieldContext', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomBElectronegativitySlider.electricFieldContextStringProperty' ) )
      },
      _comment_11: new FluentComment( {"comment":"Atom C Electronegativity Slider","associatedKey":"atomCElectronegativitySlider"} ),
      atomCElectronegativitySlider: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomCElectronegativitySlider_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomCElectronegativitySlider.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomCElectronegativitySlider_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomCElectronegativitySlider.accessibleHelpTextStringProperty' ) ),
        bondDipoleDirectionChange: new FluentPattern<{ direction: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_atomCElectronegativitySlider_bondDipoleDirectionChange', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.atomCElectronegativitySlider.bondDipoleDirectionChangeStringProperty' ), [{"name":"direction"}] )
      },
      _comment_12: new FluentComment( {"comment":"Control Area","associatedKey":"controlArea"} ),
      _comment_13: new FluentComment( {"comment":"Control Area","associatedKey":"controlArea"} ),
      controlArea: {
        bondDipoleCheckbox: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_bondDipoleCheckbox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.bondDipoleCheckbox.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_bondDipoleCheckbox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.bondDipoleCheckbox.accessibleHelpTextStringProperty' ) ),
          checkedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_bondDipoleCheckbox_checked', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.bondDipoleCheckbox.checkedStringProperty' ) ),
          uncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_bondDipoleCheckbox_unchecked', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.bondDipoleCheckbox.uncheckedStringProperty' ) )
        },
        molecularDipoleCheckbox: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_molecularDipoleCheckbox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.molecularDipoleCheckbox.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_molecularDipoleCheckbox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.molecularDipoleCheckbox.accessibleHelpTextStringProperty' ) ),
          checkedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_molecularDipoleCheckbox_checked', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.molecularDipoleCheckbox.checkedStringProperty' ) ),
          uncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_molecularDipoleCheckbox_unchecked', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.molecularDipoleCheckbox.uncheckedStringProperty' ) )
        },
        partialChargesCheckbox: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_partialChargesCheckbox_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.partialChargesCheckbox.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_partialChargesCheckbox_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.partialChargesCheckbox.accessibleHelpTextStringProperty' ) ),
          checkedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_partialChargesCheckbox_checked', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.partialChargesCheckbox.checkedStringProperty' ) ),
          uncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_partialChargesCheckbox_unchecked', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.partialChargesCheckbox.uncheckedStringProperty' ) )
        },
        electricFieldToggle: {
          accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_electricFieldToggle_accessibleName', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.electricFieldToggle.accessibleNameStringProperty' ) ),
          accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_electricFieldToggle_accessibleHelpText', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.electricFieldToggle.accessibleHelpTextStringProperty' ) ),
          onStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_electricFieldToggle_on', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.electricFieldToggle.onStringProperty' ) ),
          offStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_threeAtomsScreen_controlArea_electricFieldToggle_off', _.get( MoleculePolarityStrings, 'a11y.threeAtomsScreen.controlArea.electricFieldToggle.offStringProperty' ) )
        }
      }
    }
  }
};

export default MoleculePolarityFluent;

moleculePolarity.register('MoleculePolarityFluent', MoleculePolarityFluent);
