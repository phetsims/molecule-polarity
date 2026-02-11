// Copyright 2017-2026, University of Colorado Boulder

/**
 * RealMoleculesViewControls is the subpanel labeled 'View' in the 'Real Molecules' screen.
 *
 * Lives for the lifetime of the screen, so it won't need to handle disposal for memory leaks.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import MPConstants from '../../common/MPConstants.js';
import moleculePolarity from '../../moleculePolarity.js';
import MoleculePolarityStrings from '../../MoleculePolarityStrings.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import PhetioProperty from '../../../../axon/js/PhetioProperty.js';
import VerticalCheckboxGroup from '../../../../sun/js/VerticalCheckboxGroup.js';
import MoleculePolarityFluent from '../../MoleculePolarityFluent.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import MolecularDipoleNode from '../../common/view/MolecularDipoleNode.js';
import BondDipoleNode from '../../common/view/BondDipoleNode.js';

type SelfOptions = EmptySelfOptions;

type RealMoleculesViewControlsOptions = SelfOptions & PickRequired<VBoxOptions, 'tandem'>;

export default class RealMoleculesViewControls extends VBox {

  public constructor(
    isAdvancedProperty: PhetioProperty<boolean>,
    viewProperties: RealMoleculesViewProperties,
    provideOptions: RealMoleculesViewControlsOptions
  ) {

    const options = optionize<RealMoleculesViewControlsOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      align: 'left',
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING
    }, provideOptions );

    const titleText = new Text( MoleculePolarityStrings.viewStringProperty, MPConstants.CONTROL_PANEL_TITLE_OPTIONS );

    const checkboxGroup = new VerticalCheckboxGroup( [
      {
        property: viewProperties.bondDipolesVisibleProperty,
        createNode: () => {
          return new HBox( {
            children: [
              new Text( MoleculePolarityStrings.bondDipolesStringProperty, MPConstants.CONTROL_TEXT_OPTIONS ),
              BondDipoleNode.createIcon()
            ],
            spacing: MPConstants.CONTROL_ICON_X_SPACING
          } );
        },
        tandemName: 'bondDipolesCheckbox',
        options: {
          accessibleName: MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.accessibleNamePluralStringProperty,
          accessibleHelpText: MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.accessibleHelpTextPluralStringProperty,
          accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.checkedPluralStringProperty,
          accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.bondDipoleCheckbox.uncheckedPluralStringProperty
        }
      },
      {
        property: viewProperties.molecularDipoleVisibleProperty,
        createNode: () => {
          return new HBox( {
            children: [
              new Text( MoleculePolarityStrings.molecularDipoleStringProperty, MPConstants.CONTROL_TEXT_OPTIONS ),
              MolecularDipoleNode.createIcon()
            ],
            spacing: MPConstants.CONTROL_ICON_X_SPACING
          } );
        },
        tandemName: 'molecularDipoleCheckbox',
        options: {
          accessibleName: MoleculePolarityFluent.a11y.common.molecularDipoleCheckbox.accessibleNameStringProperty,
          accessibleHelpText: MoleculePolarityFluent.a11y.common.molecularDipoleCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.molecularDipoleCheckbox.checkedStringProperty,
          accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.molecularDipoleCheckbox.uncheckedStringProperty
        }
      },
      {
        property: viewProperties.partialChargesVisibleProperty,
        createNode: () => {
          return new Text( MoleculePolarityStrings.partialChargesStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );
        },
        tandemName: 'partialChargesCheckbox',
        options: {
          accessibleName: MoleculePolarityFluent.a11y.common.partialChargesCheckbox.accessibleNameStringProperty,
          accessibleHelpText: MoleculePolarityFluent.a11y.common.partialChargesCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.partialChargesCheckbox.checkedStringProperty,
          accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.partialChargesCheckbox.uncheckedStringProperty,
          visibleProperty: isAdvancedProperty
        }
      },
      {
        property: viewProperties.atomElectronegativitiesVisibleProperty,
        createNode: () => {
          return new Text( MoleculePolarityStrings.atomElectronegativitiesStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );
        },
        tandemName: 'atomElectronegativitiesCheckbox',
        options: {
          accessibleName: MoleculePolarityFluent.a11y.common.atomElectronegativitiesCheckbox.accessibleNameStringProperty,
          accessibleHelpText: MoleculePolarityFluent.a11y.common.atomElectronegativitiesCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.atomElectronegativitiesCheckbox.checkedStringProperty,
          accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.atomElectronegativitiesCheckbox.uncheckedStringProperty
        }
      },
      {
        property: viewProperties.atomLabelsVisibleProperty,
        createNode: () => {
          return new Text( MoleculePolarityStrings.atomLabelsStringProperty, MPConstants.CONTROL_TEXT_OPTIONS );
        },
        tandemName: 'atomLabelsCheckbox',
        options: {
          accessibleName: MoleculePolarityFluent.a11y.common.atomLabelsCheckbox.accessibleNameStringProperty,
          accessibleHelpText: MoleculePolarityFluent.a11y.common.atomLabelsCheckbox.accessibleHelpTextStringProperty,
          accessibleContextResponseChecked: MoleculePolarityFluent.a11y.common.atomLabelsCheckbox.checkedStringProperty,
          accessibleContextResponseUnchecked: MoleculePolarityFluent.a11y.common.atomLabelsCheckbox.uncheckedStringProperty
        }
      }
    ], {
      mouseAreaXDilation: MPConstants.CONTROL_PANEL_MOUSE_X_DILATION,
      touchAreaXDilation: MPConstants.CONTROL_PANEL_TOUCH_X_DILATION,
      spacing: MPConstants.CONTROL_PANEL_Y_SPACING,
      tandem: options.tandem.createTandem( 'checkboxGroup' ),
      checkboxOptions: {
        isDisposable: false
      }
    } );

    options.children = [
      titleText,
      checkboxGroup
    ];

    super( options );
  }
}

moleculePolarity.register( 'RealMoleculesViewControls', RealMoleculesViewControls );