import { List } from 'immutable';
import { asSimpleFraction } from './Util';

/** The base definition of an uncut brick. */
export interface BaseBrick {
  colour: string;
  width: number;
  height: number;
  expectedHeadJointWidth: number;
}

export interface CutBrick {
  width: number;
  definition: BaseBrick;
}

export function wholeBrick(brick: BaseBrick): CutBrick {
  return { width: brick.width, definition: brick };
}

/** Turn a base whole brick into a cut brick with a given logical width.
 * A logical width is a fraction of the base brick's width.
 */
export function cutBrick(brick: BaseBrick, logicalWidth: number): CutBrick {
  const fraction = asSimpleFraction(logicalWidth);

  if (!fraction) {
    throw new Error('Multiplier must be a simple fraction');
  }

  const [numerator, denominator] = fraction;

  const headJointsWidth = (denominator - 1) * brick.expectedHeadJointWidth;
  const eachPieceWidth = (brick.width - headJointsWidth) / denominator;

  return {
    definition: brick,
    width: eachPieceWidth * numerator + brick.expectedHeadJointWidth * (numerator - 1),
  };
}

/** Given an actual width and a brick definition, calculate what logical split of the brick that corresponds to. */
export function calculateCut(brick: BaseBrick, width: number): number | undefined {
  for (let numerator = 1; numerator < 10; numerator++) {
    for (let denominator = 1; denominator < 10; denominator++) {
      const cut = cutBrick(brick, numerator / denominator);
      if (Math.abs(cut.width - width) < 1e-6) {
        return numerator / denominator;
      }
    }
  }
}

export function totalLogicalWidth(bricks: List<CutBrick>): number {
  return bricks
    .map((brick) => calculateCut(brick.definition, brick.width)!)
    .reduce((a, b) => a + b, 0);
}
