// Copyright 2026, University of Colorado Boulder

/**
 * Contains code for view control checkbox items
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import MPConstants from '../../common/MPConstants.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import VerticalCheckboxGroup, { VerticalCheckboxGroupItem, VerticalCheckboxGroupOptions } from '../../../../sun/js/VerticalCheckboxGroup.js';
import HBox, { HBoxOptions } from '../../../../scenery/js/layout/nodes/HBox.js';
import BondDipoleNode from './BondDipoleNode.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import MolecularDipoleNode from './MolecularDipoleNode.js';
import moleculePolarity from '../../moleculePolarity.js';

export default class ViewControlsCheckboxGroup extends VerticalCheckboxGroup {
  public constructor( items: VerticalCheckboxGroupItem[], providedOptions?: VerticalCheckboxGroupOptions ) {
    super( items, optionize<VerticalCheckboxGroupOptions, EmptySelfOptions, VerticalCheckboxGroupOptions>()( {
      mouseAreaXDilation: MPConstants.CONTROL_PANEL_MOUSE_X_DILATION,
      touchAreaXDilation: MPConstants.CONTROL_PANEL_TOUCH_X_DILATION,
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      checkboxOptions: {
        isDisposable: false
      },
      phetioVisiblePropertyInstrumented: false
    }, providedOptions ) );
  }
}

moleculePolarity.register( 'ViewControlsCheckboxGroup', ViewControlsCheckboxGroup );

export const createBondDipoleCheckboxItem = ( bondDipoleVisibleProperty: PhetioProperty<boolean> ): VerticalCheckboxGroupItem => {
  return {
    property: bondDipoleVisibleProperty,
    createNode: () => {
      return new HBox( combineOptions<HBoxOptions>( {
        children: [
          new Text( MoleculePolarityStrings.bondDipoleStringProperty, MPConstants.CONTROL_TEXT_OPTIONS ),
          BondDipoleNode.createIcon()
        ],
        spacing: MPConstants.CONTROL_ICON_X_SPACING
      }, MPConstants.CONTROL_LABEL_OPTIONS ) );
    },
    tandemName: 'bondDipoleCheckbox',
    options: {
      accessibleName: MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.checkedStringProperty,
      accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.uncheckedStringProperty
    }
  };
};

export const createBondDipolesCheckboxItem = ( bondDipolesVisibleProperty: PhetioProperty<boolean> ): VerticalCheckboxGroupItem => {
  return {
    property: bondDipolesVisibleProperty,
    createNode: () => {
      return new HBox( combineOptions<HBoxOptions>( {
        children: [
          new Text( MoleculePolarityStrings.bondDipolesStringProperty, MPConstants.CONTROL_TEXT_OPTIONS ),
          BondDipoleNode.createIcon()
        ],
        spacing: MPConstants.CONTROL_ICON_X_SPACING
      }, MPConstants.CONTROL_LABEL_OPTIONS ) );
    },
    tandemName: 'bondDipolesCheckbox',
    options: {
      accessibleName: MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.accessibleNamePluralStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.accessibleHelpTextPluralStringProperty,
      accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.checkedPluralStringProperty,
      accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.uncheckedPluralStringProperty
    }
  };
};

export const createBondCharacterCheckboxItem = ( bondCharacterVisibleProperty: PhetioProperty<boolean> ): VerticalCheckboxGroupItem => {
  return {
    property: bondCharacterVisibleProperty,
    createNode: () => {
      return new Text( MoleculePolarityStrings.bondCharacterStringProperty, MPConstants.CONTROL_TEXT_LABEL_OPTIONS );
    },
    tandemName: 'bondCharacterCheckbox',
    options: {
      accessibleName: MoleculePolarityFluent.a11y.common.bondCharacterCheckbox.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.bondCharacterCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.bondCharacterCheckbox.checkedStringProperty.value,
      accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.bondCharacterCheckbox.uncheckedStringProperty.value
    }
  };
};

export const createMolecularDipoleCheckboxItem = ( molecularDipoleVisibleProperty: PhetioProperty<boolean> ): VerticalCheckboxGroupItem => {
  return {
    property: molecularDipoleVisibleProperty,
    createNode: () => {
      return new HBox( combineOptions<HBoxOptions>( {
        children: [
          new Text( MoleculePolarityStrings.molecularDipoleStringProperty, MPConstants.CONTROL_TEXT_OPTIONS ),
          MolecularDipoleNode.createIcon()
        ],
        spacing: MPConstants.CONTROL_ICON_X_SPACING
      }, MPConstants.CONTROL_LABEL_OPTIONS ) );
    },
    tandemName: 'molecularDipoleCheckbox',
    options: {
      accessibleName: MoleculePolarityFluent.a11y.common.molecularDipoleCheckbox.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.molecularDipoleCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.molecularDipoleCheckbox.checkedStringProperty,
      accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.molecularDipoleCheckbox.uncheckedStringProperty
    }
  };
};

export const createPartialChargesCheckboxItem = ( partialChargesVisibleProperty: PhetioProperty<boolean>, visibleProperty?: PhetioProperty<boolean> ): VerticalCheckboxGroupItem => {
  return {
    property: partialChargesVisibleProperty,
    createNode: () => {
      return new Text( MoleculePolarityStrings.partialChargesStringProperty, MPConstants.CONTROL_TEXT_LABEL_OPTIONS );
    },
    tandemName: 'partialChargesCheckbox',
    options: {
      accessibleName: MoleculePolarityFluent.a11y.common.partialChargesCheckbox.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.partialChargesCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.partialChargesCheckbox.checkedStringProperty,
      accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.partialChargesCheckbox.uncheckedStringProperty,
      visibleProperty: visibleProperty
    }
  };
};

export const createAtomElectronegativitiesCheckboxItem = ( atomElectronegativitiesVisibleProperty: PhetioProperty<boolean> ): VerticalCheckboxGroupItem => {
  return {
    property: atomElectronegativitiesVisibleProperty,
    createNode: () => {
      return new Text( MoleculePolarityStrings.atomElectronegativitiesStringProperty, MPConstants.CONTROL_TEXT_LABEL_OPTIONS );
    },
    tandemName: 'atomElectronegativitiesCheckbox',
    options: {
      accessibleName: MoleculePolarityFluent.a11y.common.atomElectronegativitiesCheckbox.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.atomElectronegativitiesCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.atomElectronegativitiesCheckbox.checkedStringProperty,
      accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.atomElectronegativitiesCheckbox.uncheckedStringProperty
    }
  };
};

export const createAtomLabelsCheckboxItem = ( atomLabelsVisibleProperty: PhetioProperty<boolean> ): VerticalCheckboxGroupItem => {
  return {
    property: atomLabelsVisibleProperty,
    createNode: () => {
      return new Text( MoleculePolarityStrings.atomLabelsStringProperty, MPConstants.CONTROL_TEXT_LABEL_OPTIONS );
    },
    tandemName: 'atomLabelsCheckbox',
    options: {
      accessibleName: MoleculePolarityFluent.a11y.common.atomLabelsCheckbox.accessibleNameStringProperty,
      accessibleHelpText: MoleculePolarityFluent.a11y.common.atomLabelsCheckbox.accessibleHelpTextStringProperty,
      accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.atomLabelsCheckbox.checkedStringProperty,
      accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.atomLabelsCheckbox.uncheckedStringProperty
    }
  };
};