// Copyright 2002-2014, University of Colorado Boulder

/**
 * Negative plate for E-field creation device.
 * Origin at the upper-left corner of the plate, excluding the polarity indicator.
 * <p/>
 * Note that this is similar to PositivePlateNode, but just different enough that
 * some duplicate code is better than an awkward base class.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // imports
  var inherit = require( 'PHET_CORE/inherit' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var MPConstants = require( 'MOLECULE_POLARITY/common/MPConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PolarityIndicator = require( 'MOLECULE_POLARITY/common/view/PolarityIndicator' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {EField} eField
   * @constructor
   */
  function NegativePlateNode( eField ) {

    Node.call( this );

    // negative polarity indicator
    var indicatorNode = new PolarityIndicator( { positive: false } );

    var plateOptions = { fill: MPColors.POSITIVE_PLATE, stroke: 'black' };

    // side edge to show thickness
    var sideEdgeNode = new Rectangle( 0, 0, MPConstants.PLATE_THICKNESS, MPConstants.PLATE_HEIGHT, plateOptions );

    // the primary face of the plate
    var faceNode = new Path( new Shape()
      .moveTo( MPConstants.PLATE_THICKNESS, 0 )
      .lineTo( MPConstants.PLATE_WIDTH + MPConstants.PLATE_THICKNESS, MPConstants.PLATE_PERSPECTIVE_Y_OFFSET )
      .lineTo( MPConstants.PLATE_WIDTH + MPConstants.PLATE_THICKNESS, MPConstants.PLATE_PERSPECTIVE_Y_OFFSET + ( MPConstants.PLATE_HEIGHT - 2 * MPConstants.PLATE_PERSPECTIVE_Y_OFFSET ) )
      .lineTo( MPConstants.PLATE_THICKNESS, MPConstants.PLATE_HEIGHT )
      .close(),
      plateOptions
    );

    // rendering order
    this.addChild( indicatorNode );
    this.addChild( sideEdgeNode );
    this.addChild( faceNode );

    // layout
    indicatorNode.centerX = faceNode.centerX;
    indicatorNode.bottom = faceNode.top + ( MPConstants.PLATE_PERSPECTIVE_Y_OFFSET / 2 ) + 4;

    // when the field is enabled/disabled...
    eField.enabledProperty.link( function( enabled ) {
      faceNode.fill = sideEdgeNode.file = ( enabled ? MPColors.NEGATIVE_PLATE : MPColors.DISABLED_PLATE );
      indicatorNode.visible = enabled;
    } );
  }

  return inherit( Node, NegativePlateNode );
} );