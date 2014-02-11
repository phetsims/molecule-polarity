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
   * @param {*} viewProperties
   * @constructor
   */
  function RealMoleculesControlPanel( viewProperties ) {

    var controlTextOptions = { font: MPConstants.CONTROL_FONT };
    var radioButtonOptions = { radius: MPConstants.RADIO_BUTTON_RADIUS };

    // 'View' title
    var viewTitleNode = new Text( viewString, { font: MPConstants.TITLE_FONT } );

    // 'View' check boxes
    var bondDipolesCheckBox = new CheckBox( new Text( bondDipolesString, controlTextOptions ), viewProperties.bondDipolesVisibleProperty ); //TODO add icon
    var molecularDipoleCheckBox = new CheckBox( new Text( molecularDipoleString, controlTextOptions ), viewProperties.molecularDipoleVisibleProperty ); //TODO add icon
    var partialChargesCheckBox = new CheckBox( new Text( partialChargesString, controlTextOptions ), viewProperties.partialChargesVisibleProperty );
    var atomElectronegativitiesCheckBox = new CheckBox( new Text( atomElectronegativitiesString, controlTextOptions ), viewProperties.atomElectronegativitiesVisibleProperty );
    var atomLabelsCheckBox = new CheckBox( new Text( atomLabelsString, controlTextOptions ), viewProperties.atomLabelsVisibleProperty );

    // 'Surface' title
    var surfaceTitleNode = new Text( surfaceString, { font: MPConstants.TITLE_FONT } );

    // 'Surface' radio buttons
    var noneButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.NONE, new Text( noneString, controlTextOptions ), radioButtonOptions );
    var electrostaticPotentialButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTROSTATIC_POTENTIAL, new Text( electrostaticPotentialString, controlTextOptions ), radioButtonOptions );
    var electronDensityButton = new AquaRadioButton( viewProperties.surfaceTypeProperty, SurfaceType.ELECTRON_DENSITY, new Text( electronDensityString, controlTextOptions ), radioButtonOptions );

    //TODO this is brittle, what if we add a node and forget to add it here?
    // compute the horizontal separator width
    var nodes = [ viewTitleNode, bondDipolesCheckBox, partialChargesCheckBox, atomElectronegativitiesCheckBox, atomLabelsCheckBox,
      surfaceTitleNode, noneButton, electrostaticPotentialButton, electronDensityButton ];
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
        new Line( 0, 0, 0, 1 ), // force a vertical space
        new Line( 0, 0, separatorWidth, 0, { stroke: 'rgb(100,100,100)' } ), // horizontal separator
        surfaceTitleNode,
        noneButton,
        electrostaticPotentialButton,
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
