// Copyright 2025-2026, University of Colorado Boulder

/**
 * Label for a single atom in the 3D molecule view.
 *
 * @author Jonathan Olson <jonathan.olson@colorado.edu>
 */

import TextureQuad from '../../../../mobius/js/TextureQuad.js';
import NodeTexture from '../../../../mobius/js/NodeTexture.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import ThreeUtils from '../../../../mobius/js/ThreeUtils.js';
import { REAL_MOLECULES_CAMERA_POSITION } from '../model/RealMoleculesModel.js';
import RealMolecule, { RealAtom } from '../model/RealMolecule.js';
import { elementToForegroundColor } from '../model/RealMoleculeColors.js';
import { toFixed } from '../../../../dot/js/util/toFixed.js';
import moleculePolarity from '../../moleculePolarity.js';
import { ATOM_LABEL_RENDER_ORDER } from './RenderOrder.js';

const LABEL_SIZE = 0.4;

export default class AtomLabelView extends TextureQuad {
  private readonly molecule: RealMolecule;
  private readonly atom: RealAtom;
  private readonly labelNodeTexture: NodeTexture;

  public constructor( molecule: RealMolecule, atom: RealAtom, atomLabelsVisible: boolean, partialChargesVisible: boolean ) {
    const element = atom.element;
    const sameElementAtoms = molecule.atoms.filter( a => a.element === atom.element );
    const atomVisualIndex = sameElementAtoms.indexOf( atom );
    const showIndex = sameElementAtoms.length > 1;

    const labelFill = elementToForegroundColor( element );

    const labelFont = new PhetFont( { size: 130, weight: 'bold' } );
    const smallFont = new PhetFont( { size: 110, weight: 'bold' } );
    const labelNode = new VBox( {
      children: [
        ...( atomLabelsVisible ? [
          new Text( showIndex ? `${element.symbol}${atomVisualIndex + 1}` : `${element.symbol}`, {
            font: labelFont,
            fill: labelFill
          } )
        ] : [] ),
        ...( partialChargesVisible ? [
          // TODO: string for partial charge label, see https://github.com/phetsims/molecule-polarity/issues/32
          new Text( `δ=${toFixed( atom.getPartialCharge(), 2 )}`, { font: smallFont, fill: labelFill } )
        ] : [] )
      ],
      center: new Vector2( 256, 128 )
    } );

    const labelNodeTexture = new NodeTexture( labelNode, {
      width: 512,
      height: 256
    } );

    super( labelNodeTexture, 2 * LABEL_SIZE, LABEL_SIZE, { depthTest: true } );

    ( this as unknown as THREE.Object3D ).renderOrder = ATOM_LABEL_RENDER_ORDER;

    this.position.copy( ThreeUtils.vectorToThree( new Vector3( -2 * LABEL_SIZE * 0.5, -LABEL_SIZE * 0.5, 2 ) ) );

    this.molecule = molecule;
    this.atom = atom;
    this.labelNodeTexture = labelNodeTexture;
  }

  public update( parent: THREE.Object3D ): void {
    const atom = this.atom;

    const localPoint = ThreeUtils.threeToVector( parent.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION ) ) );
    const localUpPoint = ThreeUtils.threeToVector( parent.worldToLocal( ThreeUtils.vectorToThree( REAL_MOLECULES_CAMERA_POSITION.plus( Vector3.Y_UNIT ) ) ) );

    const dirToCamera = localPoint.normalized();
    const upDir = localUpPoint.minus( localPoint ).normalized();
    const rightDir = upDir.cross( dirToCamera ).normalized();

    const labelCenter = atom.position.plus( dirToCamera.timesScalar( atom.getDisplayRadius() + 0.03 ) );
    const labelLowerLeft = labelCenter.plus( rightDir.timesScalar( -LABEL_SIZE ).plus( upDir.timesScalar( -0.5 * LABEL_SIZE ) ) );

    const forward = dirToCamera; // Z+
    const up = upDir; // Y+
    const right = up.cross( forward ).normalized(); // X+

    const m = new THREE.Matrix4();
    m.makeBasis(
      ThreeUtils.vectorToThree( right ),
      ThreeUtils.vectorToThree( up ),
      ThreeUtils.vectorToThree( forward )
    );
    m.setPosition( ThreeUtils.vectorToThree( labelLowerLeft ) );

    this.matrixAutoUpdate = false;
    this.matrix.copy( m );
  }

  public override dispose(): void {
    super.dispose();

    this.labelNodeTexture.dispose();
  }
}

moleculePolarity.register( 'AtomLabelView', AtomLabelView );
