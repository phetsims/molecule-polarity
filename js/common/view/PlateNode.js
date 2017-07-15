// Copyright 2014-2017, University of Colorado Boulder

/**
 * Plate for E-field creation device.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  var MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PolarityIndicator = require( 'MOLECULE_POLARITY/common/view/PolarityIndicator' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );

  // constants
  var PLATE_OPTIONS = {
    fill: MPColors.PLATE,
    stroke: 'black'
  };

  /**
   * @param {EField} eField
   * @param {Object} [options]
   * @constructor
   */
  function PlateNode( eField, options ) {

    var self = this;

    options = _.extend( {
      polarity: 'negative', // 'positive' or 'negative'
      perspective: 'left', // 'left' or 'right'
      plateWidth: 50,
      plateHeight: 430,
      plateThickness: 5,
      platePerspectiveYOffset: 35 // y difference between foreground and background edges of the plate
    }, options );

    this.plateHeight = options.plateHeight; // @public used in view layout

    Node.call( this );

    // polarity indicator
    var polarityIndicatorNode = new PolarityIndicator( { polarity: options.polarity } );

    // face of a positive plate, drawn in perspective, starting at upper-left and going clockwise
    var faceNode = new Path( new Shape()
        .moveTo( 0, options.platePerspectiveYOffset )
        .lineTo( options.plateWidth, 0 )
        .lineTo( options.plateWidth, options.plateHeight )
        .lineTo( 0, options.platePerspectiveYOffset + ( options.plateHeight - 2 * options.platePerspectiveYOffset ) )
        .close(),
      PLATE_OPTIONS
    );

    // side edge of a positive plate
    var edgeNode = new Rectangle( options.plateWidth, 0, options.plateThickness, options.plateHeight, PLATE_OPTIONS );

    var plateNode = new Node( {
      children: [
        edgeNode,
        faceNode
      ]
    } );

    // The plate is drawn in perspective for positive polarity.
    // If the polarity is negative, reflect about the y axis.
    if ( options.polarity === 'negative' ) {
      plateNode.setScaleMagnitude( -1, 1 );
    }

    // rendering order
    this.addChild( polarityIndicatorNode );
    this.addChild( plateNode );

    // put the polarity indicator at the top center of the plate's face
    polarityIndicatorNode.centerX = plateNode.centerX;
    polarityIndicatorNode.bottom = plateNode.top + ( options.platePerspectiveYOffset / 2 );

    // show/hide when the field is enabled/disabled... (unlink not needed)
    eField.enabledProperty.link( function( enabled ) {
      polarityIndicatorNode.visible = enabled;
    } );

    this.mutate( options );
  }

  moleculePolarity.register( 'PlateNode', PlateNode );

  return inherit( Node, PlateNode, {}, {

    /**
     * Creates a positive plate.
     * @static
     * @param {EField} eField
     */
    createPositive: function( eField ) {
      return new PlateNode( eField, { polarity: 'positive', perspective: 'right' } );
    },

    /**
     * Creates a negative plate.
     * @static
     * @param {EField} eField
     */
    createNegative: function( eField ) {
      return new PlateNode( eField, { polarity: 'negative', perspective: 'left' } );
    }
  } );
} );