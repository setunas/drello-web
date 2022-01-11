import styled from "styled-components";
import { NewColumn } from "src/features/column/new-column";
import { ColumnList } from "src/features/column/column-list";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveCardThunk } from "src/features/card/card.slice";
import { moveColumnThunk } from "../column/column.slice";

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
    if (!destination) return; // Dropped outside the list.

    const sourceIndex = source.index;
    const destIndex = destination.index;

    const regex = /column-(\d+)/i;
    const found = draggableId.match(regex);
    if (found?.length) {
      // a column is being dragging

      if (sourceIndex === destIndex) return; // Dropped at the original position (= No change)

      dispatch(moveColumnThunk({ boardId, sourceIndex, destIndex }));
    } else {
      // a card is being dragging
      const sourceColumnId = parseInt(source.droppableId);
      const destColumnId = parseInt(destination.droppableId);

      // Dropped at the original position (= No change)
      if (sourceIndex === destIndex && sourceColumnId === destColumnId) return;

      dispatch(
        moveCardThunk({
          sourceIndex,
          destIndex,
          sourceColumnId,
          destColumnId,
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="column-droppable"
        direction="horizontal"
        type="column"
      >
        {(provided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            <ColumnList boardId={boardId} />
            {provided.placeholder}
            <NewColumn boardId={boardId} />
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};
