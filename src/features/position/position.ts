import { Column } from "../column/column.g";
import { Card } from "../card/card.g";

type Positionable = Card | Column;
const INITIAL_POSITION_GAP = 16384;
const MIN_POSITION_GAP = 0.001;

/**
 * `renumberPositionsIfNeeded()` re-numbers the positions of the positionable
 * elements in a certain list. This is necessary because a position could reach
 * some thresholds which can't be calculated anymore.
 * `renumberPositionsIfNeeded()` solves that problem by re-numbering all the
 * positions in the provided list before they reach the threshold.
 */
const renumberPositionsIfNeeded = <T extends Positionable>({
  nextPosition,
  prevPosition,
  list,
}: {
  nextPosition: number | null;
  prevPosition: number | null;
  list: T[];
}) => {
  if (nextPosition === null && prevPosition === null) {
    // When the target is the first element in the list
    return null;
  }

  const nextP = nextPosition || 0;
  const prevP = prevPosition || 0;

  if (
    prevP >= Number.MAX_SAFE_INTEGER - INITIAL_POSITION_GAP ||
    nextP >= Number.MAX_SAFE_INTEGER - INITIAL_POSITION_GAP ||
    Math.abs(nextP - prevP) < MIN_POSITION_GAP
  ) {
    // When need to be re-numberd
    let position = INITIAL_POSITION_GAP;

    const updatedList = list.map((positionable) => {
      const obj = { ...positionable };
      obj.position = position;
      position += INITIAL_POSITION_GAP;
      return obj;
    });

    return updatedList;
  }

  return null;
};

/**
 * `calcPositionOnMove()` calculates the position of the target positionable
 * element when it is moved.
 */
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

/**
 * `updatePositions()` invoke all processes to calculate positions
 * when a positionable element is moved.
 */
export const updatePositions = <T extends Positionable>({
  destIndex,
  list,
}: {
  destIndex: number;
  list: T[];
}) => {
  const prevPosition = list[destIndex - 1]?.position || null;
  const nextPosition = list[destIndex + 1]?.position || null;

  const renumberdList = renumberPositionsIfNeeded({
    nextPosition,
    prevPosition,
    list,
  });
  if (renumberdList !== null) {
    return { renumberdList, position: renumberdList[destIndex].position };
  }

  const position = calcPositionOnMove({
    nextPosition: nextPosition || 0,
    prevPosition: prevPosition || 0,
  });
  return { position };
};

/**
 * `calcPositionOnCreate()` calculate the position of the new positionable element
 * when it is created.
 */
export const calcPositionOnCreate = <T extends Positionable>(list: T[]) => {
  let position: number;
  const length = list.length;

  if (length > 0) {
    position = list[length - 1].position + INITIAL_POSITION_GAP;
  } else {
    position = INITIAL_POSITION_GAP;
  }

  return position;
};
