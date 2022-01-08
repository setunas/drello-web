/**
 * This file is for codes related `positon` of `Card`.
 */
import { Card } from "./card.g";

const INITIAL_POSITION_GAP = 16384;
const MIN_POSITION_GAP = 0.001;

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
  destCardList,
}: {
  destIndex: number;
  destCardList: Card[];
}) => {
  const prevPosition = destCardList[destIndex - 1]?.position || 0;
  const nextPosition = destCardList[destIndex + 1]?.position || 0;

  const renumberedDestCards = renumberPositionsIfNeeded({
    nextPosition,
    prevPosition,
  });
  const position = calcPositionOnMove({ nextPosition, prevPosition });

  return { position, renumberedDestCards };
};

export const calcPositionOnCreate = (cardList: Card[]) => {
  let position: number;
  const length = cardList.length;

  if (length > 0) {
    position = cardList[length - 1].position + INITIAL_POSITION_GAP;
  } else {
    position = INITIAL_POSITION_GAP;
  }

  return position;
};
