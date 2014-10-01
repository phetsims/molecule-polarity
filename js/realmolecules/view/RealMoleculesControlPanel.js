// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  var CheckBox = require( 'SUN/CheckBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MolecularDipoleNode = require( 'MOLECULE_POLARITY/common/view/MolecularDipoleNode' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Panel = require( 'SUN/Panel' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var atomElectronegativitiesString = require( 'string!MOLECULE_POLARITY/atomElectronegativities' );
  var atomLabelsString = require( 'string!MOLECULE_POLARITY/atomLabels' );
  var bondDipolesString = require( 'string!MOLECULE_POLARITY/bondDipoles' );
  var electronDensityString = require( 'string!MOLECULE_POLARITY/electronDensity' );
  var electrostaticPotentialString = require( 'string!MOLECULE_POLARITY/electrostaticPotential' );
  var molecularDipoleString = require( 'string!MOLECULE_POLARITY/molecularDipole' );
  var noneString = require( 'string!MOLECULE_POLARITY/none' );
  var partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  var surfaceString = require( 'string!MOLECULE_POLARITY/surface' );
  var viewString = require( 'string!MOLECULE_POLARITY/view' );

  /**
   * @param {JSmolProperties} jsmolProperties
   * @constructor
   */
  function RealMoleculesControlPanel( jsmolProperties ) {

    var controlTextOptions = { font: MPConstants.CONTROL_FONT };
    var radioButtonOptions = { radius: MPConstants.RADIO_BUTTON_RADIUS };

    // 'View' title
    var viewTitleNode = new Text( viewString, { font: MPConstants.TITLE_FONT } );

    // 'View' check boxes
    var bondDipolesLabel = new HBox( { spacing: 10, children: [ new Text( bondDipolesString, controlTextOptions ), BondDipoleNode.createIcon() ] } );
    var bondDipolesCheckBox = new CheckBox( bondDipolesLabel, jsmolProperties.bondDipolesVisibleProperty );
    var molecularDipoleLabel = new HBox( { spacing: 10, children: [ new Text( molecularDipoleString, controlTextOptions ), MolecularDipoleNode.createIcon() ] } );
    var molecularDipoleCheckBox = new CheckBox( molecularDipoleLabel, jsmolProperties.molecularDipoleVisibleProperty );
    var partialChargesCheckBox = new CheckBox( new Text( partialChargesString, controlTextOptions ), jsmolProperties.partialChargesVisibleProperty );
    var atomLabelsCheckBox = new CheckBox( new Text( atomLabelsString, controlTextOptions ), jsmolProperties.atomLabelsVisibleProperty );
    var atomElectronegativitiesCheckBox = new CheckBox( new Text( atomElectronegativitiesString, controlTextOptions ), jsmolProperties.atomElectronegativitiesVisibleProperty );

    // 'Surface' title
    var surfaceTitleNode = new Text( surfaceString, { font: MPConstants.TITLE_FONT } );

    // 'Surface' radio buttons
    var noneButton = new AquaRadioButton( jsmolProperties.surfaceTypeProperty, SurfaceType.NONE, new Text( noneString, controlTextOptions ), radioButtonOptions );
    var electrostaticPotentialButton = new AquaRadioButton( jsmolProperties.surfaceTypeProperty, SurfaceType.ELECTROSTATIC_POTENTIAL, new Text( electrostaticPotentialString, controlTextOptions ), radioButtonOptions );
    var electronDensityButton = new AquaRadioButton( jsmolProperties.surfaceTypeProperty, SurfaceType.ELECTRON_DENSITY, new Text( electronDensityString, controlTextOptions ), radioButtonOptions );

    // nodes in the control panel, in the order they will appear vertically
    var children = [
      viewTitleNode,
      bondDipolesCheckBox,
      molecularDipoleCheckBox,
      partialChargesCheckBox,
      atomLabelsCheckBox,
      atomElectronegativitiesCheckBox,
      //--------------------
      surfaceTitleNode,
      noneButton,
      electrostaticPotentialButton,
      electronDensityButton
    ];

    // compute the horizontal separator width, insert separators above (before) titles
    var separatorWidth = 0;
    for ( var i = 0; i < children.length; i++ ) {
      separatorWidth = Math.max( separatorWidth, children[i].width );
    }
    children.splice( children.indexOf( surfaceTitleNode ), 0, new HSeparator( separatorWidth ) );

    // vertical panel
    Panel.call( this,
      new VBox( {
        children: children,
        align: 'left',
        spacing: 15
      } ), {
        // panel options
        fill: 'rgb(238,238,238)',
        xMargin: 20,
        yMargin: 15
      } );
  }

  return inherit( Panel, RealMoleculesControlPanel );
} );
