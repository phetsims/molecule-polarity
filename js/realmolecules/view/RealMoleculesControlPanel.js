// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  var CheckBox = require( 'SUN/CheckBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var MolecularDipoleNode = require( 'MOLECULE_POLARITY/common/view/MolecularDipoleNode' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Panel = require( 'SUN/Panel' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VStrut = require( 'SUN/VStrut' );

  // strings
  var atomElectronegativitiesString = require( 'string!MOLECULE_POLARITY/atomElectronegativities' );
  var atomLabelsString = require( 'string!MOLECULE_POLARITY/atomLabels' );
  var bondDipolesString = require( 'string!MOLECULE_POLARITY/bondDipoles' );
  var electronDensityString = require( 'string!MOLECULE_POLARITY/electronDensity' );
  var electrostaticPotentialRWBString = require( 'string!MOLECULE_POLARITY/electrostaticPotentialRWB' );
  var electrostaticPotentialROYGBString = require( 'string!MOLECULE_POLARITY/electrostaticPotentialROYGB' );
  var molecularDipoleString = require( 'string!MOLECULE_POLARITY/molecularDipole' );
  var noneString = require( 'string!MOLECULE_POLARITY/none' );
  var partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  var surfaceString = require( 'string!MOLECULE_POLARITY/surface' );
  var viewString = require( 'string!MOLECULE_POLARITY/view' );

  /**
   * @param {*} viewProperties
   * @constructor
   */
  function RealMoleculesControlPanel( viewProperties ) {

    var controlTextOptions = { font: MPConstants.CONTROL_FONT };
    var radioButtonOptions = { radius: MPConstants.RADIO_BUTTON_RADIUS };

    // 'View' title
    var viewTitleNode = new Text( viewString, { font: MPConstants.TITLE_FONT } );

    // 'View' check boxes
    var bondDipolesLabel = new HBox( { spacing: 10, children: [ new Text( bondDipolesString, controlTextOptions ), BondDipoleNode.createIcon() ] } );
    var bondDipolesCheckBox = new CheckBox( bondDipolesLabel, viewProperties.bondDipolesVisibleProperty );
    var molecularDipoleLabel = new HBox( { spacing: 10, children: [ new Text( molecularDipoleString, controlTextOptions ), MolecularDipoleNode.createIcon() ] } );
    var molecularDipoleCheckBox = new CheckBox( molecularDipoleLabel, viewProperties.molecularDipoleVisibleProperty );
    var partialChargesCheckBox = new CheckBox( new Text( partialChargesString, controlTextOptions ), viewProperties.partialChargesVisibleProperty );
    var atomElectronegativitiesCheckBox = new CheckBox( new Text( atomElectronegativitiesString, controlTextOptions ), viewProperties.atomElectronegativitiesVisibleProperty );
    var atomLabelsCheckBox = new CheckBox( new Text( atomLabelsString, controlTextOptions ), viewProperties.atomLabelsVisibleProperty );

    // 'Surface' title
    var surfaceTitleNode = new Text( surfaceString, { font: MPConstants.TITLE_FONT } );

    // 'Surface' radio buttons
    var noneButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.NONE, new Text( noneString, controlTextOptions ), radioButtonOptions );
    var electrostaticPotentialRWBButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTROSTATIC_POTENTIAL_RWB, new Text( electrostaticPotentialRWBString, controlTextOptions ), radioButtonOptions );
    var electrostaticPotentialROYGBButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTROSTATIC_POTENTIAL_ROYGB, new Text( electrostaticPotentialROYGBString, controlTextOptions ), radioButtonOptions );
    var electronDensityButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTRON_DENSITY, new Text( electronDensityString, controlTextOptions ), radioButtonOptions );

    //TODO this is brittle, what if we add a node and forget to add it here?
    // compute the horizontal separator width
    var nodes = [ viewTitleNode, bondDipolesCheckBox, partialChargesCheckBox, atomElectronegativitiesCheckBox, atomLabelsCheckBox,
      surfaceTitleNode, noneButton, electrostaticPotentialRWBButton, electronDensityButton ];
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
        atomElectronegativitiesCheckBox,
        atomLabelsCheckBox,
        new VStrut( 1 ), // force a vertical space
        new Line( 0, 0, separatorWidth, 0, { stroke: 'rgb(100,100,100)' } ), // horizontal separator
        surfaceTitleNode,
        noneButton,
        electrostaticPotentialRWBButton,
        electrostaticPotentialROYGBButton,
        electronDensityButton
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

  return inherit( Panel, RealMoleculesControlPanel );
} );
