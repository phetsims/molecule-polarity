// Copyright 2014-2015, University of Colorado Boulder

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
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PolarityIndicator = require( 'MOLECULE_POLARITY/common/view/PolarityIndicator' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {EField} eField
   * @param {Object} [options]
   * @constructor
   */
  function PlateNode( eField, options ) {

    options = _.extend( {
      polarity: 'negative', // 'positive' or 'negative'
      perspective: 'left', // 'left' or 'right'
      plateWidth: 50,
      plateHeight: 430,
      plateThickness: 5,
      platePerspectiveYOffset: 35, // y difference between foreground and background edges of the plate
      plateColor: 'rgb( 192, 192, 192 )',
      plateColorDisabled: 'rgb( 192, 192, 192 )'
    }, options );

    this.plateHeight = options.plateHeight; // used in view layout

    Node.call( this );

    // negative polarity indicator
    var indicatorNode = new PolarityIndicator( { polarity: options.polarity } );

    var plateOptions = { fill: options.plateColor, stroke: 'black' };

    var sideEdgeNode;
    var faceNode;
    if ( options.polarity === 'positive' ) {
      // side edge to show thickness
      sideEdgeNode = new Rectangle( options.plateWidth, 0, options.plateThickness, options.plateHeight, plateOptions );

      // the primary face of the plate
      faceNode = new Path( new Shape()
          .moveTo( 0, options.platePerspectiveYOffset )
          .lineTo( options.plateWidth, 0 )
          .lineTo( options.plateWidth, options.plateHeight )
          .lineTo( 0, options.platePerspectiveYOffset + ( options.plateHeight - 2 * options.platePerspectiveYOffset ) )
          .close(),
        plateOptions
      );
    }
    else {
      // side edge to show thickness
      sideEdgeNode = new Rectangle( 0, 0, options.plateThickness, options.plateHeight, plateOptions );

      // the primary face of the plate
      faceNode = new Path( new Shape()
          .moveTo( options.plateThickness, 0 )
          .lineTo( options.plateWidth + options.plateThickness, options.platePerspectiveYOffset )
          .lineTo( options.plateWidth + options.plateThickness, options.platePerspectiveYOffset + ( options.plateHeight - 2 * options.platePerspectiveYOffset ) )
          .lineTo( options.plateThickness, options.plateHeight )
          .close(),
        plateOptions
      );
    }

    // rendering order
    this.addChild( indicatorNode );
    this.addChild( sideEdgeNode );
    this.addChild( faceNode );

    // layout
    indicatorNode.centerX = faceNode.centerX;
    indicatorNode.bottom = faceNode.top + ( options.platePerspectiveYOffset / 2 ) + 4;

    // when the field is enabled/disabled...
    eField.enabledProperty.link( function( enabled ) {
      faceNode.fill = sideEdgeNode.file = ( enabled ? options.plateColor : options.plateColorDisabled );
      indicatorNode.visible = enabled;
    } );
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