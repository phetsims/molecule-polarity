// Copyright 2014-2019, University of Colorado Boulder

//TODO This is currently a stub, integrate with 3D viewer in https://github.com/phetsims/molecule-polarity/issues/15
/**
 * JSmol viewer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // inherit
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  const Line = require( 'SCENERY/nodes/Line' );
  const merge = require( 'PHET_CORE/merge' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const patternSymbolNameString = require( 'string!MOLECULE_POLARITY/pattern.symbolName' );

  /**
   * @param {Property.<RealMolecule>} moleculeProperty
   * @param {RealMoleculesViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function RealMoleculeViewer( moleculeProperty, viewProperties, options ) {

    options = merge( {
      backgroundColor: 'white',
      viewerSize: new Dimension2( 200, 200 )
    }, options );

    const self = this;
    this.moleculeProperty = moleculeProperty; // @private

    const rectNode = new Rectangle( 0, 0, options.viewerSize.width, options.viewerSize.height, {
      stroke: 'rgba(0,0,0,0.25)',
      fill: options.backgroundColor
    } );
    const titleNode = new Text( '3D molecule viewer goes here', { font: new PhetFont( { size: 22, weight: 'bold' } ) } );
    const font = new PhetFont( 18 );
    const moleculeText = new RichText( '?', {
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

    // unlink not needed
    moleculeProperty.link( function( molecule ) {
      moleculeText.text = StringUtils.fillIn( patternSymbolNameString, {
        symbol: molecule.symbol,
        name: molecule.name
      } );
    } );

    const debugText = new LayoutBox( {
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

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ rectNode, debugText ];

    Node.call( this, options );

    // synchronize with view Properties, unlinks not needed
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

    // {Property.<Element[]>} @public (read-only)
    this.elementsProperty = new Property( [] );

    // unlink not needed
    moleculeProperty.link( function( molecule ) {
      //TODO populate elementsProperty with [Elements] for the selected molecule, see https://github.com/phetsims/molecule-polarity/15
    } );
  }

  moleculePolarity.register( 'RealMoleculeViewer', RealMoleculeViewer );

  return inherit( Node, RealMoleculeViewer, {

    setBondDipolesVisible: function( visible ) {
      this.bondDipolesText.fill = visible ? 'black' : 'gray';
    },

    setMolecularDipoleVisible: function( visible ) {
      this.molecularDipoleText.fill = visible ? 'black' : 'gray';
    },

    setPartialChargesVisible: function( visible ) {
      this.partialChargesText.fill = visible ? 'black' : 'gray';
    },

    setAtomLabelsVisible: function( visible ) {
      this.atomLabelsText.fill = visible ? 'black' : 'gray';
    },

    setSurfaceType: function( surfaceType ) {
      this.surfaceTypeText.text = ( 'surface: ' + surfaceType );
    }
  } );
} );
