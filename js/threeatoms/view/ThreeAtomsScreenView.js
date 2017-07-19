// Copyright 2014-2017, University of Colorado Boulder

/**
 * View for the 'Three Atoms' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EFieldControl = require( 'MOLECULE_POLARITY/common/view/EFieldControl' );
  var ElectronegativityControl = require( 'MOLECULE_POLARITY/common/view/ElectronegativityControl' );
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var MPControlPanel = require( 'MOLECULE_POLARITY/common/view/MPControlPanel' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PlateNode = require( 'MOLECULE_POLARITY/common/view/PlateNode' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ThreeAtomsViewControls = require( 'MOLECULE_POLARITY/threeatoms/view/ThreeAtomsViewControls' );
  var ThreeAtomsViewProperties = require( 'MOLECULE_POLARITY/threeatoms/view/ThreeAtomsViewProperties' );
  var TriatomicMoleculeNode = require( 'MOLECULE_POLARITY/threeatoms/view/TriatomicMoleculeNode' );

  // constants
  var PLATE_X_OFFSET = 300; // x offset of E-field plates from molecule's center, determined empirically, see #66
  
  /**
   * @param {ThreeAtomsModel} model
   * @constructor
   */
  function ThreeAtomsScreenView( model ) {

    var self = this;

    ScreenView.call( this, MPConstants.SCREEN_VIEW_OPTIONS );

    // view-specific Properties
    var viewProperties = new ThreeAtomsViewProperties();

    // nodes
    var moleculeNode = new TriatomicMoleculeNode( model.molecule );
    var negativePlateNode = PlateNode.createNegative( model.eField );
    var positivePlateNode = PlateNode.createPositive( model.eField );
    var enControlA = new ElectronegativityControl( model.molecule.atomA, model.molecule );
    var enControlB = new ElectronegativityControl( model.molecule.atomB, model.molecule );
    var enControlC = new ElectronegativityControl( model.molecule.atomC, model.molecule );

    var controlPanel = new MPControlPanel( [
      new ThreeAtomsViewControls( viewProperties ),
      new EFieldControl( model.eField.enabledProperty )
    ] );

    var resetAllButton = new ResetAllButton( {
      listener: function() {
        self.interruptSubtreeInput();
        model.reset();
        viewProperties.reset();
        moleculeNode.reset();
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
    this.addChild( rootNode );

    // layout, based on molecule location ---------------------------------

    var moleculeX = model.molecule.location.x;
    var moleculeY = model.molecule.location.y;

    // to left of molecule, vertically centered
    negativePlateNode.right = moleculeX - PLATE_X_OFFSET;
    negativePlateNode.y = moleculeY - ( negativePlateNode.plateHeight / 2 );

    // to right of molecule, vertically centered
    positivePlateNode.left = moleculeX + PLATE_X_OFFSET;
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

    // synchronization with view Properties ------------------------------

    // unlink not needed
    viewProperties.bondDipolesVisibleProperty.link( function( visible ) {
      moleculeNode.setBondDipolesVisible( visible );
    } );

    // unlink not needed
    viewProperties.molecularDipoleVisibleProperty.link( function( visible ) {
      moleculeNode.setMolecularDipoleVisible( visible );
    } );

    // unlink not needed
    viewProperties.partialChargesVisibleProperty.link( function( visible ) {
      moleculeNode.setPartialChargesVisible( visible );
    } );
  }

  moleculePolarity.register( 'ThreeAtomsScreenView', ThreeAtomsScreenView );

  return inherit( ScreenView, ThreeAtomsScreenView );
} );