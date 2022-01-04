import styled from "styled-components";
import { NewColumn } from "src/features/column/new-column";
import { ColumnList } from "src/features/column/column-list";
import {
  DragDropContext,
  DropResult,
  Droppable,
  DragStart,
  ResponderProvided,
} from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveCards } from "src/features/card/card.slice";
import { useState } from "react";
import { DropDisabledStatus } from "./board.g";

const Container = styled.section`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 1rem;
  padding: 1em;
  justify-content: start;
  justify-items: start;
  align-items: flex-start;
  overflow-x: auto;
`;

interface BoardProps {
  boardId: number;
}

export const Board = ({ boardId }: BoardProps) => {
  const dispatch = useDispatch();
  const [isDropDisabled, setIsDropDisabled] = useState<DropDisabledStatus>({
    cards: false,
    columns: false,
  });
  const columnDraggablIdRegex = /column-(\d+)/i;

  const onDragStart = (initial: DragStart, provided: ResponderProvided) => {
    const found = initial.draggableId.match(columnDraggablIdRegex);
    if (found?.length) {
      setIsDropDisabled((prev) => ({ ...prev, cards: true }));
    } else {
      setIsDropDisabled((prev) => ({ ...prev, columns: true }));
    }
  };

  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    setIsDropDisabled({ cards: false, columns: false });

    if (!destination) {
      // Dropped outside the list
      return;
    }

    const found = draggableId.match(columnDraggablIdRegex);
    if (found?.length) {
    } else {
      const startIndex = source.index;
      const endIndex = destination.index;
      const startColumnId = parseInt(source.droppableId);
      const endColumnId = parseInt(destination.droppableId);

      if (startIndex === endIndex && startColumnId === endColumnId) {
        // Dropped at the original position (= No change)
        return;
      }

      dispatch(
        moveCards({
          targetCardId: parseInt(draggableId),
          startIndex,
          endIndex,
          startColumnId,
          endColumnId,
        })
      );
    }
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable
        droppableId="column-droppable"
        direction="horizontal"
        isDropDisabled={isDropDisabled.columns}
      >
        {(provided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            <ColumnList boardId={boardId} isDropDisabled={isDropDisabled} />
            <NewColumn />
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};
