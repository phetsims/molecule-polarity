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
  var Node = require( 'SCENERY/nodes/Node' );
  var PartialChargeNode = require( 'MOLECULE_POLARITY/common/view/PartialChargeNode' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var SurfaceType = require( 'MOLECULE_POLARITY/common/view/SurfaceType' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Drag handler for manipulating orientation of a diatomic molecule.
   * @param {DiatomicMolecule} molecule
   * @constructor
   */
  function DiatomicMoleculeDragHandler( molecule ) {

    var startAngle; // angle between the pointer and the molecule when the drag started

    var getAngle = function( event ) {
      var point = event.currentTarget.globalToLocalPoint( event.pointer.point );
      return new Vector2( point.x - molecule.location.x, point.y - molecule.location.y ).angle();
    };

    SimpleDragHandler.call( this, {

      allowTouchSnag: true,

      start: function( event ) {
        molecule.dragging = true;
        startAngle = getAngle( event );
      },

      drag: function( event ) {
        molecule.angleProperty.set( getAngle( event ) - startAngle );
      },

      end: function( event ) {
        molecule.dragging = false;
      }
    } );
  }

  inherit( SimpleDragHandler, DiatomicMoleculeDragHandler );

  /**
   * @param {DiatomicMolecule} molecule
   * @constructor
   */
  function DiatomicMoleculeNode( molecule ) {

    Node.call( this );

    // nodes
    var atomANode = new AtomNode( molecule.atomA );
    var atomBNode = new AtomNode( molecule.atomB );
    var bondNode = new BondNode( molecule.bond );
    this.partialChargeNodeA = PartialChargeNode.createOppositePartialChargeNode( molecule.atomA, molecule.bond ); // @private
    this.partialChargeNodeB = PartialChargeNode.createOppositePartialChargeNode( molecule.atomB, molecule.bond ); // @private
    //TODO flesh out these components
    this.bondDipoleNode = new Node(); //new BondDipoleNode( molecule.bond ); // @private
    this.electrostaticPotentialNode = new Node(); //new DiatomicElectrostaticPotentialNode( molecule, MPConstants.ELECTRONEGATIVITY_RANGE, MPColors.RWB_GRADIENT ); // @private
    this.electronDensityNode = new Node(); //new DiatomicElectronDensityNode( molecule, MPConstants.ELECTRONEGATIVITY_RANGE, MPColors.BW_GRADIENT ); // @private

    // rendering order
    this.addChild( new Node( { children: [ this.electrostaticPotentialNode, this.electronDensityNode ] } ) ); // surfaces
    this.addChild( new Node( { children: [ bondNode, atomANode, atomBNode ] } ) );  // structure, bond behind atoms
    this.addChild( new Node( { children: [ this.partialChargeNodeA, this.partialChargeNodeB, this.bondDipoleNode ] } ) ); // decorations

    // rotate molecule by dragging anywhere
    this.cursor = 'pointer'; //TODO custom cursor, ala RotateCursorHandler in Java version
    this.addInputListener( new DiatomicMoleculeDragHandler( molecule ) );
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

