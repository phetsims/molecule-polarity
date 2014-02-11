// Copyright 2002-2014, University of Colorado Boulder

//TODO investigate JSmol and figure out how to do this
/**
 * Scenery node that displays a Jmol viewer.
 * Jmol scripting language is documented at http://chemapps.stolaf.edu/jmol/docs
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define(function(require){

  // inherit
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont')
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {Property<RealMolecule>} moleculeProperty
   * @param {Color} backgroundColor
   * @param {Dimension2} viewerSize
   * @constructor
   */
  function JSmolViewerNode( moleculeProperty, backgroundColor, viewerSize ) {

    var thisNode = this;
    Node.call( thisNode );

    var rectNode = new Rectangle( 0, 0, viewerSize.width, viewerSize.height, { stroke: 'black', fill: backgroundColor } );
    var labelNode = new Text( 'JSmol viewer goes here', { font: new PhetFont( 22 ) } );

    thisNode.addChild( rectNode );
    thisNode.addChild( labelNode );

    labelNode.centerX = rectNode.centerX;
    labelNode.centerY = rectNode.centerY;
  }

  return inherit( Node, JSmolViewerNode );
});
