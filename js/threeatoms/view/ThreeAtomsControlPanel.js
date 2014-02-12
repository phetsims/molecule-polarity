// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define(function(require){
  'use strict';

  // imports
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var CheckBox = require( 'SUN/CheckBox' );
  var DipoleNode = require( 'MOLECULE_POLARITY/common/view/DipoleNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var bondDipolesString = require( 'string!MOLECULE_POLARITY/bondDipoles' );
  var electricFieldString = require( 'string!MOLECULE_POLARITY/electricField' );
  var molecularDipoleString = require( 'string!MOLECULE_POLARITY/molecularDipole' );
  var offString = require( 'string!MOLECULE_POLARITY/off' );
  var onString = require( 'string!MOLECULE_POLARITY/on' );
  var partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  var viewString = require( 'string!MOLECULE_POLARITY/view' );

  /**
   * @param {*} viewProperties
   * @param {Property<Boolean>} eFieldEnabledProperty
   * @constructor
   */
  function ThreeAtomsControlPanel( viewProperties, eFieldEnabledProperty ) {

    var controlTextOptions = { font: MPConstants.CONTROL_FONT };
    var radioButtonOptions = { radius: MPConstants.RADIO_BUTTON_RADIUS };

    // 'View' title
    var viewTitleNode = new Text( viewString, { font: MPConstants.TITLE_FONT } );

    // 'View' check boxes
    var bondDipolesLabel = new HBox( { spacing: 10, children: [ new Text( bondDipolesString, controlTextOptions ), DipoleNode.createIcon( MPColors.BOND_DIPOLE ) ] } );
    var bondDipolesCheckBox = new CheckBox( bondDipolesLabel, viewProperties.bondDipolesVisibleProperty );
    var molecularDipoleLabel = new HBox( { spacing: 10, children: [ new Text( molecularDipoleString, controlTextOptions ), DipoleNode.createIcon( MPColors.MOLECULAR_DIPOLE ) ] } );
    var molecularDipoleCheckBox = new CheckBox( molecularDipoleLabel, viewProperties.molecularDipoleVisibleProperty );
    var partialChargesCheckBox = new CheckBox( new Text( partialChargesString, controlTextOptions ), viewProperties.partialChargesVisibleProperty );

    // 'E-Field' title
    var eFieldTitleNode = new Text( electricFieldString, { font: MPConstants.TITLE_FONT } );

    // 'E-Field' radio buttons
    var onButton = new AquaRadioButton( eFieldEnabledProperty, true, new Text( onString, controlTextOptions ), radioButtonOptions );
    var offButton = new AquaRadioButton( eFieldEnabledProperty, false, new Text( offString, controlTextOptions ), radioButtonOptions );
    var buttonGroup = new HBox( {
      children: [ onButton, offButton ],
      align: 'left',
      spacing: 30
    } );

    //TODO this is brittle, what if we add a node and forget to add it here?
    // compute the horizontal separator width
    var nodes = [ viewTitleNode, bondDipolesCheckBox, partialChargesCheckBox, eFieldTitleNode, buttonGroup ];
    var separatorWidth = 0;
    for ( var i = 0; i < nodes.length; i++ ) {
      separatorWidth = Math.max( separatorWidth, nodes[i].width );
    }

    //TODO better handling of separators and vertical spacing
    var content = new VBox( {
      children: [
        viewTitleNode,
        bondDipolesCheckBox,
        molecularDipoleCheckBox,
        partialChargesCheckBox,
        new Line( 0, 0, 0, 1 ), // force a vertical space
        new Line( 0, 0, separatorWidth, 0, { stroke: 'rgb(100,100,100)' } ), // horizontal separator
        eFieldTitleNode,
        buttonGroup
      ],
      align: 'left',
      spacing: 12
    } );

    // vertical panel
    Panel.call( this, content, {
      fill: 'rgb(238,238,238)',
      xMargin: 20,
      yMargin: 15
    } );
  }

  return inherit( Panel, ThreeAtomsControlPanel );
});
