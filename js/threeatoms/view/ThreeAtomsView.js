// Copyright 2014-2015, University of Colorado Boulder

/**
 * View for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ElectronegativityControl = require( 'MOLECULE_POLARITY/common/view/ElectronegativityControl' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PlateNode = require( 'MOLECULE_POLARITY/common/view/PlateNode' );
  var PropertySet = require( 'AXON/PropertySet' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ThreeAtomsControlPanel = require( 'MOLECULE_POLARITY/threeatoms/view/ThreeAtomsControlPanel' );
  var TriatomicMoleculeNode = require( 'MOLECULE_POLARITY/threeatoms/view/TriatomicMoleculeNode' );

  /**
   * @param {ThreeAtomsModel} model
   * @constructor
   */
  function ThreeAtomsView( model ) {

    var thisView = this;
    ScreenView.call( thisView, MPConstants.SCREEN_VIEW_OPTIONS );

    // view-specific properties
    var viewProperties = new PropertySet( {
      bondDipolesVisible: false,
      molecularDipoleVisible: true,
      partialChargesVisible: false
    } );

    // nodes
    var moleculeNode = new TriatomicMoleculeNode( model.molecule );
    var negativePlateNode = PlateNode.createNegative( model.eField );
    var positivePlateNode = PlateNode.createPositive( model.eField );
    var enControlA = new ElectronegativityControl( model.molecule.atomA, model.molecule );
    var enControlB = new ElectronegativityControl( model.molecule.atomB, model.molecule );
    var enControlC = new ElectronegativityControl( model.molecule.atomC, model.molecule );
    var controlPanel = new ThreeAtomsControlPanel( viewProperties, model.eField.enabledProperty );
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      scale: 1.32
    } );


    // Parent for all nodes added to this screen
    var rootNode = new Node( {
      children: [
        // nodes are rendered in this order
        negativePlateNode,
        positivePlateNode,
        enControlA,
        enControlB,
        enControlC,
        controlPanel,
        moleculeNode,
        resetAllButton
      ]
    } );
    thisView.addChild( rootNode );

    // layout, based on molecule location ---------------------------------

    var moleculeX = model.molecule.location.x;
    var moleculeY = model.molecule.location.y;
    var plateXOffset = 300; // x offset from molecule

    // to left of molecule, vertically centered
    negativePlateNode.right = moleculeX - plateXOffset;
    negativePlateNode.y = moleculeY - ( negativePlateNode.plateHeight / 2 );

    // to right of molecule, vertically centered
    positivePlateNode.left = moleculeX + plateXOffset;
    positivePlateNode.y = moleculeY - ( positivePlateNode.plateHeight / 2 );

    // centered below molecule
    enControlB.centerX = moleculeX;
    enControlA.right = enControlB.left - 10;
    enControlC.left = enControlB.right + 10;
    enControlA.bottom = enControlB.bottom = enControlC.bottom = this.layoutBounds.bottom - 25;

    // to right of positive plate, top aligned
    controlPanel.top = positivePlateNode.y;
    controlPanel.left = positivePlateNode.right + 25;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;

    // synchronization with view properties ------------------------------

    viewProperties.bondDipolesVisibleProperty.link( function( visible ) {
      moleculeNode.setBondDipolesVisible( visible );
    } );

    viewProperties.molecularDipoleVisibleProperty.link( function( visible ) {
      moleculeNode.setMolecularDipoleVisible( visible );
    } );

    viewProperties.partialChargesVisibleProperty.link( function( visible ) {
      moleculeNode.setPartialChargesVisible( visible );
    } );
  }

  moleculePolarity.register( 'ThreeAtomsView', ThreeAtomsView );

  return inherit( ScreenView, ThreeAtomsView );
} );