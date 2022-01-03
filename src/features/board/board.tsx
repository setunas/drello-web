import styled from "styled-components";
import { NewColumn } from "src/features/column/new-column";
import { ColumnList } from "src/features/column/column-list";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { reorderCards, selectCards } from "src/features/card/card.slice";

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

export const Board = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectCards());

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      // dropped outside the list
      return;
    }

    dispatch(
      reorderCards({
        cards: cards,
        startIndex: result.source.index,
        endIndex: result.destination.index,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <ColumnList />
        <NewColumn />
      </Container>
    </DragDropContext>
  );
};
