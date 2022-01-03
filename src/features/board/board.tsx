import styled from "styled-components";
import { NewColumn } from "src/features/column/new-column";
import { ColumnList } from "src/features/column/column-list";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveCards } from "src/features/card/card.slice";

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

  const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
    if (!destination) {
      // dropped outside the list
      return;
    }

    dispatch(
      moveCards({
        targetCardId: parseInt(draggableId),
        startIndex: source.index,
        endIndex: destination.index,
        startColumnId: parseInt(source.droppableId),
        endColumnId: parseInt(destination.droppableId),
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <ColumnList boardId={boardId} />
        <NewColumn />
      </Container>
    </DragDropContext>
  );
};
