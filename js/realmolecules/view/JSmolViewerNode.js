// Copyright 2014-2017, University of Colorado Boulder

//TODO This is currently a stub. Investigate JSmol integration in issue #6.
/**
 * JSmol viewer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // inherit
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Line = require( 'SCENERY/nodes/Line' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SubSupText = require( 'SCENERY_PHET/SubSupText' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {Property.<RealMolecule>} moleculeProperty
   * @param {PropertySet} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function JSmolViewerNode( moleculeProperty, viewProperties, options ) {

    options = _.extend( {
      backgroundColor: 'white',
      viewerSize: new Dimension2( 200, 200 )
    }, options );

    var self = this;
    this.moleculeProperty = moleculeProperty; // @private

    var rectNode = new Rectangle( 0, 0, options.viewerSize.width, options.viewerSize.height, {
      stroke: 'rgba(0,0,0,0.25)',
      fill: options.backgroundColor
    } );
    var titleNode = new Text( 'JSmol viewer goes here', { font: new PhetFont( { size: 22, weight: 'bold' } ) } );
    var font = new PhetFont( 18 );
    var moleculeText = new SubSupText( '?', {
      font: font,
      maxWidth: 200
    } );

    // @private
    this.bondDipolesText = new Text( 'bond dipoles', { font: font } );
    this.molecularDipoleText = new Text( 'molecular dipole', { font: font } );
    this.partialChargesText = new Text( 'partial charges', { font: font } );
    this.atomLabelsText = new Text( 'atom labels', { font: font } );
    this.surfaceTypeText = new Text( '?', { font: font } );

    titleNode.centerX = rectNode.centerX;
    titleNode.centerY = rectNode.centerY;

    moleculeProperty.link( function( molecule ) {
      moleculeText.text = molecule.symbol + ' (' + molecule.name + ')';
    } );

    var debugText = new LayoutBox( {
      orientation: 'vertical',
      align: 'left',
      spacing: 10,
      centerX: rectNode.centerX,
      centerY: rectNode.centerY,
      children: [
        titleNode,
        new Line( 0, 0, 0, 30 ),
        moleculeText,
        new Line( 0, 0, 0, 30 ),
        this.bondDipolesText,
        this.molecularDipoleText,
        this.partialChargesText,
        this.atomLabelsText,
        this.surfaceTypeText
      ]
    } );

    Node.call( this, { children: [ rectNode, debugText ] } );

    viewProperties.bondDipolesVisibleProperty.link( function( visible ) {
      self.setBondDipolesVisible( visible );
    } );

    viewProperties.molecularDipoleVisibleProperty.link( function( visible ) {
      self.setMolecularDipoleVisible( visible );
    } );

    viewProperties.partialChargesVisibleProperty.link( function( visible ) {
      self.setPartialChargesVisible( visible );
    } );

    viewProperties.atomLabelsVisibleProperty.link( function( visible ) {
      self.setAtomLabelsVisible( visible );
    } );

    viewProperties.surfaceTypeProperty.link( function( surfaceType ) {
      self.setSurfaceType( surfaceType );
    } );

    this.elementsProperty = new Property( [] );
    moleculeProperty.link( function( molecule ) {
      //TODO populate elementsProperty with [Elements] for the selected molecule
    } );
  }

  moleculePolarity.register( 'JSmolViewerNode', JSmolViewerNode );

  return inherit( Node, JSmolViewerNode, {

    // @return {Element[]}
    getElements: function() {
      return []; //TODO
    },

    setBondDipolesVisible: function( visible ) {
      //TODO
      this.bondDipolesText.fill = visible ? 'black' : 'gray';
    },

    setMolecularDipoleVisible: function( visible ) {
      //TODO
      this.molecularDipoleText.fill = visible ? 'black' : 'gray';
    },

    setPartialChargesVisible: function( visible ) {
      //TODO
      this.partialChargesText.fill = visible ? 'black' : 'gray';
    },

    setAtomLabelsVisible: function( visible ) {
      //TODO
      this.atomLabelsText.fill = visible ? 'black' : 'gray';
    },

    setSurfaceType: function( surfaceType ) {
      //TODO
      this.surfaceTypeText.text = ( 'surface: ' + surfaceType );
    }
  } );
} );
