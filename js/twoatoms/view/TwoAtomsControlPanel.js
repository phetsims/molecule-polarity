// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for the 'Two Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define(function(require){
  'use strict';

  // imports
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var CheckBox = require( 'SUN/CheckBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Panel = require( 'SUN/Panel' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var bondCharacterString = require( 'string!MOLECULE_POLARITY/bondCharacter' );
  var bondDipoleString = require( 'string!MOLECULE_POLARITY/bondDipole' );
  var electricFieldString = require( 'string!MOLECULE_POLARITY/electricField' );
  var electronDensityString = require( 'string!MOLECULE_POLARITY/electronDensity' );
  var electrostaticPotentialString = require( 'string!MOLECULE_POLARITY/electrostaticPotential' );
  var noneString = require( 'string!MOLECULE_POLARITY/none' );
  var offString = require( 'string!MOLECULE_POLARITY/off' );
  var onString = require( 'string!MOLECULE_POLARITY/on' );
  var partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  var surfaceString = require( 'string!MOLECULE_POLARITY/surface' );
  var viewString = require( 'string!MOLECULE_POLARITY/view' );

  /**
   * @param {*} viewProperties
   * @param {Property<Boolean>} eFieldEnabledProperty
   * @constructor
   */
  function TwoAtomsControlPanel( viewProperties, eFieldEnabledProperty ) {

    var controlTextOptions = { font: MPConstants.CONTROL_FONT };
    var radioButtonOptions = { radius: MPConstants.RADIO_BUTTON_RADIUS };

    // 'View' title
    var viewTitleNode = new Text( viewString, { font: MPConstants.TITLE_FONT } );

    // 'View' check boxes
    var bondDipoleCheckBox = new CheckBox( new Text( bondDipoleString, controlTextOptions ), viewProperties.bondDipoleVisibleProperty ); //TODO add icon
    var partialChargesCheckBox = new CheckBox( new Text( partialChargesString, controlTextOptions ), viewProperties.partialChargesVisibleProperty );
    var bondCharacterCheckBox = new CheckBox( new Text( bondCharacterString, controlTextOptions ), viewProperties.bondCharacterVisibleProperty );

    // 'Surface' title
    var surfaceTitleNode = new Text( surfaceString, { font: MPConstants.TITLE_FONT } );

    // 'Surface' radio buttons
    var noneButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.NONE, new Text( noneString, controlTextOptions ), radioButtonOptions );
    var electrostaticPotentialButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTROSTATIC_POTENTIAL, new Text( electrostaticPotentialString, controlTextOptions ), radioButtonOptions );
    var electronDensityButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTRON_DENSITY, new Text( electronDensityString, controlTextOptions ), radioButtonOptions );

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
    var nodes = [ viewTitleNode, bondDipoleCheckBox, partialChargesCheckBox, bondCharacterCheckBox,
      surfaceTitleNode, noneButton, electrostaticPotentialButton, electronDensityButton,
      eFieldTitleNode, buttonGroup ];
    var separatorWidth = 0;
    for ( var i = 0; i < nodes.length; i++ ) {
      separatorWidth = Math.max( separatorWidth, nodes[i].width );
    }

    //TODO better handling of separators and vertical spacing
    var content = new VBox( {
      children: [
        viewTitleNode,
        bondDipoleCheckBox,
        partialChargesCheckBox,
        bondCharacterCheckBox,
        new Line( 0, 0, 0, 1 ), // force a vertical space
        new Line( 0, 0, separatorWidth, 0, { stroke: 'rgb(100,100,100)' } ), // horizontal separator
        surfaceTitleNode,
        noneButton,
        electrostaticPotentialButton,
        electronDensityButton,
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

  return inherit( Panel, TwoAtomsControlPanel );
});
