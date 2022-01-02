import styled from "styled-components";
import { NewColumn } from "src/features/column/new-column";
import { ColumnList } from "src/features/column/column-list";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  return (
    <>
      <Container>
        <ColumnList />
        <NewColumn />
      </Container>
    </>
  );
};
