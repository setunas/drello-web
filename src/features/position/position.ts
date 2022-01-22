/**
 * This file is for codes related `positon`.
 */
import { Column } from "../column/column.g";
import { Card } from "../card/card.g";

const INITIAL_POSITION_GAP = 16384;
const MIN_POSITION_GAP = 0.001;

type Positionable = Card | Column;

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
    console.log(nextP, prevP);
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
    return { renumberdList };
  }

  const position = calcPositionOnMove({
    nextPosition: nextPosition || 0,
    prevPosition: prevPosition || 0,
  });
  return { position };
};

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
