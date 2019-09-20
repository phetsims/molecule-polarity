// Copyright 2014-2019, University of Colorado Boulder

/**
 * Plate for E-field creation device.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const moleculePolarity = require( 'MOLECULE_POLARITY/moleculePolarity' );
  const MPColors = require( 'MOLECULE_POLARITY/common/MPColors' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PolarityIndicator = require( 'MOLECULE_POLARITY/common/view/PolarityIndicator' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Shape = require( 'KITE/Shape' );

  // constants
  const PLATE_OPTIONS = {
    fill: MPColors.PLATE,
    stroke: 'black'
  };

  /**
   * @param {EField} eField
   * @param {Object} [options]
   * @constructor
   */
  function PlateNode( eField, options ) {

    const self = this;

    options = _.extend( {
      polarity: 'negative', // 'positive' or 'negative'
      perspective: 'left', // 'left' or 'right'
      plateWidth: 50,
      plateHeight: 430,
      plateThickness: 5,
      platePerspectiveYOffset: 35 // y difference between foreground and background edges of the plate
    }, options );

    this.plateHeight = options.plateHeight; // @public used in view layout

    assert && assert ( options.polarity === 'negative' || options.polarity === 'positive' ,
      'invalid polarity: ' + options.polarity );
    assert && assert ( options.perspective === 'right' || options.perspective === 'left' ,
      'invalid perspective: ' + options.perspective );

    Node.call( this );

    // polarity indicator
    const polarityIndicatorNode = new PolarityIndicator( { polarity: options.polarity } );

    // face of a positive plate, drawn in perspective, starting at upper-left and going clockwise
    const faceNode = new Path( new Shape()
        .moveTo( 0, options.platePerspectiveYOffset )
        .lineTo( options.plateWidth, 0 )
        .lineTo( options.plateWidth, options.plateHeight )
        .lineTo( 0, options.platePerspectiveYOffset + ( options.plateHeight - 2 * options.platePerspectiveYOffset ) )
        .close(),
      PLATE_OPTIONS
    );

    // side edge of a positive plate
    const edgeNode = new Rectangle( options.plateWidth, 0, options.plateThickness, options.plateHeight, PLATE_OPTIONS );

    const plateNode = new Node( {
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

    // Put the polarity indicator at the top center of the plate's face.
    polarityIndicatorNode.centerX = plateNode.centerX;
    polarityIndicatorNode.bottom = plateNode.top + ( options.platePerspectiveYOffset / 2 );

    // show/hide when the field is enabled/disabled... (unlink not needed)
    eField.enabledProperty.link( function( enabled ) {
      self.visible = enabled;
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