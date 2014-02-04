// Copyright 2002-2014, University of Colorado Boulder

/**
 * Visual representation of a diatomic molecule.
 * Children position themselves in world coordinates, so this node's offset should be (0,0).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var AtomNode = require( 'MOLECULE_POLARITY/common/view/AtomNode' );
  var BondNode = require( 'MOLECULE_POLARITY/common/view/BondNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MoleculeDragHandler = require( 'MOLECULE_POLARITY/common/input/MoleculeDragHandler' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );

  /**
   * @param {DiatomicMolecule} molecule
   * @constructor
   */
  function DiatomicMoleculeNode( molecule  ) {

    Node.call( this );

    // nodes
    var atomANode = new AtomNode( molecule.atomA );
    var atomBNode = new AtomNode( molecule.atomB );
    var bondNode = new BondNode( molecule.bond );
    //TODO flesh out these components
    this.electrostaticPotentialNode = new Node(); //new DiatomicElectrostaticPotentialNode( molecule, MPConstants.ELECTRONEGATIVITY_RANGE, MPColors.RWB_GRADIENT ); // @private
    this.electronDensityNode = new Node(); //new DiatomicElectronDensityNode( molecule, MPConstants.ELECTRONEGATIVITY_RANGE, MPColors.BW_GRADIENT ); // @private
    this.partialChargeNodeA = new Node(); //new OppositePartialChargeNode( molecule.atomA, molecule.bond ); // @private
    this.partialChargeNodeB = new Node(); //new OppositePartialChargeNode( molecule.atomB, molecule.bond ); // @private
    this.bondDipoleNode = new Node(); //new BondDipoleNode( molecule.bond ); // @private

    // rendering order
    this.addChild( new Node( { children: [ this.electrostaticPotentialNode, this.electronDensityNode ] }) ); // surfaces
    this.addChild( new Node( { children: [ bondNode, atomANode, atomBNode ] } ) );  // structure, bond behind atoms
    this.addChild( new Node( { children: [ this.partialChargeNodeA, this.partialChargeNodeB, this.bondDipoleNode ] } ) ); // decorations

    // rotate molecule by dragging anywhere
    this.cursor = 'pointer'; //TODO custom cursor, ala RotateCursorHandler in Java version
    this.addInputListener( new MoleculeDragHandler( molecule ) );
  }

  return inherit( Node, DiatomicMoleculeNode, {

    setBondDipoleVisible: function( visible ) {
      this.bondDipoleNode.visible = visible;
    },

    setPartialChargesVisible: function( visible ) {
      this.partialChargeNodeA.visible = visible;
      this.partialChargeNodeB.visible = visible;
    },

    setSurfaceType: function( surfaceType ) {
      this.electrostaticPotentialNode.visible = ( surfaceType === SurfaceType.ELECTROSTATIC_POTENTIAL );
      this.electronDensityNode.visible = ( surfaceType === SurfaceType.ELECTRON_DENSITY );
    }
  } );
} );

