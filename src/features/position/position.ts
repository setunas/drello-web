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
  nextPosition: number;
  prevPosition: number;
  list: T[];
}) => {
  if (
    prevPosition >= Number.MAX_SAFE_INTEGER - INITIAL_POSITION_GAP ||
    nextPosition >= Number.MAX_SAFE_INTEGER - INITIAL_POSITION_GAP ||
    Math.abs(nextPosition - prevPosition) < MIN_POSITION_GAP
  ) {
    let position = INITIAL_POSITION_GAP;
    const updatedList = [...list];
    updatedList.forEach((positionable) => {
      positionable.position = position;
      position += INITIAL_POSITION_GAP;
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
  const prevPosition = list[destIndex - 1]?.position || 0;
  const nextPosition = list[destIndex + 1]?.position || 0;

  const renumberdList = renumberPositionsIfNeeded({
    nextPosition,
    prevPosition,
    list,
  });
  if (renumberdList !== null) {
    return { renumberdList };
  }

  const position = calcPositionOnMove({ nextPosition, prevPosition });
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
