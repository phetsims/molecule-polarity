// Copyright 2014-2023, University of Colorado Boulder

/**
 * View for the 'Real Molecules' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import { Node } from '../../../../scenery/js/imports.js';
import MPPreferences from '../../common/model/MPPreferences.js';
import MPConstants from '../../common/MPConstants.js';
import MPQueryParameters from '../../common/MPQueryParameters.js';
import SurfaceColorKey from '../../common/view/SurfaceColorKey.js';
import moleculePolarity from '../../moleculePolarity.js';
import RealMoleculesModel from '../model/RealMoleculesModel.js';
import ElectronegativityTableNode from './ElectronegativityTableNode.js';
import RealMoleculesControl from './RealMoleculesControl.js';
import RealMoleculesControlPanel from './RealMoleculesControlPanel.js';
import RealMoleculesViewProperties from './RealMoleculesViewProperties.js';
import RealMoleculeViewer from './RealMoleculeViewer.js';
import UnderDevelopmentPanel from './UnderDevelopmentPanel.js';

type SelfOptions = EmptySelfOptions;

type RealMoleculesScreenViewOptions = SelfOptions & PickRequired<ScreenViewOptions, 'tandem'>;

export default class RealMoleculesScreenView extends ScreenView {

  private readonly moleculeViewer: RealMoleculeViewer;

  public constructor( model: RealMoleculesModel, providedOptions: RealMoleculesScreenViewOptions ) {

    const options = optionize<RealMoleculesScreenViewOptions, SelfOptions, ScreenViewOptions>()( {

      // ScreenViewOptions
      layoutBounds: MPConstants.LAYOUT_BOUNDS
    }, providedOptions );

    super( options );

    // view-specific Properties
    const viewProperties = new RealMoleculesViewProperties( {
      tandem: options.tandem.createTandem( 'viewProperties' )
    } );

    this.moleculeViewer = new RealMoleculeViewer( model.moleculeProperty, viewProperties, {
      viewerSize: new Dimension2( 450, 450 ),
      tandem: options.tandem.createTandem( 'moleculeViewer' )
    } );

    const electronegativityTableNode = new ElectronegativityTableNode( this.moleculeViewer, {
      visibleProperty: viewProperties.atomElectronegativitiesVisibleProperty,
      tandem: options.tandem.createTandem( 'electronegativityTableNode' )
    } );

    const comboBoxListParent = new Node();
    const moleculesComboBox = new RealMoleculesControl( model.moleculeProperty, model.molecules, comboBoxListParent, {
      comboBoxOptions: {
        tandem: options.tandem.createTandem( 'moleculesComboBox' )
      }
    } );

    // Group color keys under a common parent, so that PhET-iO can hide the color key.
    const colorKeysTandem = options.tandem.createTandem( 'colorKeys' );

    const electrostaticPotentialRWBColorKey = SurfaceColorKey.createElectrostaticPotentialRWBColorKey( {
      tandem: colorKeysTandem.createTandem( 'electrostaticPotentialRWBColorKey' )
    } );

    const electrostaticPotentialROYGBColorKey = SurfaceColorKey.createElectrostaticPotentialROYGBColorKey( {
      tandem: colorKeysTandem.createTandem( 'electrostaticPotentialROYGBColorKey' )
    } );

    const electronDensityColorKey = SurfaceColorKey.createElectronDensityColorKey( {
      tandem: colorKeysTandem.createTandem( 'electronDensityColorKey' )
    } );

    const colorKeysNode = new Node( {
      children: [
        electrostaticPotentialRWBColorKey,
        electrostaticPotentialROYGBColorKey,
        electronDensityColorKey
      ]
    } );

    const controlPanel = new RealMoleculesControlPanel( viewProperties, {
      tandem: options.tandem.createTandem( 'controlPanel' )
    } );

    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.interruptSubtreeInput();
        model.reset();
        viewProperties.reset();
      },
      scale: 1.32,
      tandem: options.tandem.createTandem( 'resetAllButton' )
    } );

    // Parent for all nodes added to this screen
    const rootNode = new Node( {
      children: [
        this.moleculeViewer,
        electronegativityTableNode,
        moleculesComboBox,
        controlPanel,
        colorKeysNode,
        resetAllButton,
        comboBoxListParent // last, so that combo box list is on top
      ]
    } );
    this.addChild( rootNode );

    // layout ---------------------------------

    this.moleculeViewer.left = 100;

    // centered above viewer
    electronegativityTableNode.centerX = this.moleculeViewer.centerX;
    electronegativityTableNode.top = this.layoutBounds.top + 25;

    // centered below electronegativity table
    colorKeysNode.centerX = electronegativityTableNode.centerX;
    colorKeysNode.top = electronegativityTableNode.bottom + 15;

    // below color keys
    this.moleculeViewer.top = colorKeysNode.bottom + 15;

    // centered below viewer
    moleculesComboBox.centerX = this.moleculeViewer.centerX;
    moleculesComboBox.top = this.moleculeViewer.bottom + 15;

    // right of viewer
    controlPanel.left = this.moleculeViewer.right + 100;
    controlPanel.centerY = this.layoutBounds.centerY;

    // bottom-right corner of the screen
    resetAllButton.right = this.layoutBounds.right - 40;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;

    // synchronization with view Properties ------------------------------

    Multilink.multilink( [ viewProperties.surfaceTypeProperty, MPPreferences.surfaceColorProperty ],
      ( surfaceType, surfaceColor ) => {
        electrostaticPotentialRWBColorKey.visible = ( surfaceType === 'electrostaticPotential' && surfaceColor === 'RWB' );
        electrostaticPotentialROYGBColorKey.visible = ( surfaceType === 'electrostaticPotential' && surfaceColor === 'ROYGB' );
        electronDensityColorKey.visible = ( surfaceType === 'electronDensity' );
      } );

    //TODO see https://github.com/phetsims/molecule-polarity/issues/32
    // Until the Real Molecules screen is fully implemented, hide everything that was created above, and display
    // a message. We're continuing to create everything to reduce the possibility that regressions creep in.
    if ( !MPQueryParameters.realMolecules ) {
      rootNode.visible = false;
      this.addChild( new UnderDevelopmentPanel( this.layoutBounds ) );
    }
  }
}

moleculePolarity.register( 'RealMoleculesScreenView', RealMoleculesScreenView );