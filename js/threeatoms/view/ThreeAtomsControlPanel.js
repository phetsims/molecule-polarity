// Copyright 2002-2014, University of Colorado Boulder

/**
 * Control panel for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BondDipoleNode = require( 'MOLECULE_POLARITY/common/view/BondDipoleNode' );
  var CheckBox = require( 'SUN/CheckBox' );
  var EFieldSwitch = require( 'MOLECULE_POLARITY/common/view/EFieldSwitch' );
  var HSeparator = require( 'SUN/HSeparator' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var MolecularDipoleNode = require( 'MOLECULE_POLARITY/common/view/MolecularDipoleNode' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var bondDipolesString = require( 'string!MOLECULE_POLARITY/bondDipoles' );
  var electricFieldString = require( 'string!MOLECULE_POLARITY/electricField' );
  var molecularDipoleString = require( 'string!MOLECULE_POLARITY/molecularDipole' );
  var partialChargesString = require( 'string!MOLECULE_POLARITY/partialCharges' );
  var viewString = require( 'string!MOLECULE_POLARITY/view' );

  /**
   * @param {*} viewProperties
   * @param {Property.<boolean>} eFieldEnabledProperty
   * @constructor
   */
  function ThreeAtomsControlPanel( viewProperties, eFieldEnabledProperty ) {

    var controlTextOptions = { font: MPConstants.CONTROL_FONT };

    // 'View' title
    var viewTitleNode = new Text( viewString, { font: MPConstants.TITLE_FONT } );

    // 'View' check boxes
    var bondDipolesLabel = new LayoutBox( {
      children: [ new Text( bondDipolesString, controlTextOptions ), BondDipoleNode.createIcon() ],
      orientation: 'horizontal',
      spacing: 10
    } );
    var bondDipolesCheckBox = new CheckBox( bondDipolesLabel, viewProperties.bondDipolesVisibleProperty );
    var molecularDipoleLabel = new LayoutBox( {
      children: [ new Text( molecularDipoleString, controlTextOptions ), MolecularDipoleNode.createIcon() ],
      orientation: 'horizontal',
      spacing: 10
    } );
    var molecularDipoleCheckBox = new CheckBox( molecularDipoleLabel, viewProperties.molecularDipoleVisibleProperty );
    var partialChargesCheckBox = new CheckBox( new Text( partialChargesString, controlTextOptions ), viewProperties.partialChargesVisibleProperty );

    // 'E-Field' title
    var eFieldTitleNode = new Text( electricFieldString, { font: MPConstants.TITLE_FONT } );

    // 'E-Field' control
    var eFieldControl = new EFieldSwitch( eFieldEnabledProperty );

    // nodes in the control panel, in the order they will appear vertically
    var children = [
      viewTitleNode,
      bondDipolesCheckBox,
      molecularDipoleCheckBox,
      partialChargesCheckBox,
      //--------------------
      eFieldTitleNode,
      eFieldControl
    ];

    // compute the horizontal separator width, insert separators above (before) titles
    var separatorWidth = 0;
    for ( var i = 0; i < children.length; i++ ) {
      separatorWidth = Math.max( separatorWidth, children[ i ].width );
    }
    children.splice( children.indexOf( eFieldTitleNode ), 0, new HSeparator( separatorWidth ) );

    // vertical panel
    Panel.call( this, new LayoutBox( {
      children: children,
      orientation: 'vertical',
      align: 'left',
      spacing: 15
    } ), {
      // panel options
      fill: 'rgb(238,238,238)',
      xMargin: 20,
      yMargin: 15
    } );
  }

  return inherit( Panel, ThreeAtomsControlPanel );
} );
