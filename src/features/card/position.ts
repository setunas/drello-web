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
  endIndex,
  destCards,
}: {
  endIndex: number;
  destCards: Card[];
}) => {
  const prevPosition = destCards[endIndex - 1]?.position || 0;
  const nextPosition = destCards[endIndex + 1]?.position || 0;

  const renumberedDestCards = renumberPositionsIfNeeded({
    nextPosition,
    prevPosition,
  });
  const position = calcPositionOnMove({ nextPosition, prevPosition });

  return { position, renumberedDestCards };
};

export const calcPositionOnCreate = (cardList: Card[]) => {
  let position: number;

  if (cardList.length > 0) {
    position = cardList[0].position / 2;
  } else {
    position = INITIAL_POSITION_GAP;
  }

  return position;
};
