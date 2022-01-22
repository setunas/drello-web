/**
 * This file is for codes related `positon`.
 */
import { Column } from "../column/column.g";
import { Card } from "../card/card.g";

const INITIAL_POSITION_GAP = 16384;
const MIN_POSITION_GAP = 0.001;

type Positionable = Card | Column;

const renumberPositionsIfNeeded = ({
  nextPosition,
  prevPosition,
}: {
  nextPosition: number;
  prevPosition: number;
}) => {
  if (
    prevPosition >= Number.MAX_SAFE_INTEGER - INITIAL_POSITION_GAP ||
    nextPosition >= Number.MAX_SAFE_INTEGER - INITIAL_POSITION_GAP ||
    Math.abs(nextPosition - prevPosition) < MIN_POSITION_GAP
  ) {
    // [TODO]: ↓↓↓↓
    console.log("Need relocate all cards' position in the column");
  }
};

const calcPositionOnMove = ({
  nextPosition,
  prevPosition,
}: {
  nextPosition: number;
  prevPosition: number;
}) => {
  let position: number;

  if (nextPosition) {
    position = (prevPosition + nextPosition) / 2;
  } else {
    position = prevPosition + INITIAL_POSITION_GAP;
  }

  return position;
};

export const updatePositions = ({
  destIndex,
  list,
}: {
  destIndex: number;
  list: Positionable[];
}) => {
  const prevPosition = list[destIndex - 1]?.position || 0;
  const nextPosition = list[destIndex + 1]?.position || 0;

  const renumberedDestCards = renumberPositionsIfNeeded({
    nextPosition,
    prevPosition,
  });
  const position = calcPositionOnMove({ nextPosition, prevPosition });

  return { position, renumberedDestCards };
};

export const calcPositionOnCreate = (list: Positionable[]) => {
  let position: number;
  const length = list.length;

  if (length > 0) {
    position = list[length - 1].position + INITIAL_POSITION_GAP;
  } else {
    position = INITIAL_POSITION_GAP;
  }

  return position;
};
