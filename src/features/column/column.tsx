import React from "react";
import styled from "styled-components";
import { CardList } from "src/features/card/card-list";
import { NewCard } from "src/features/card/new-card";
import { colors } from "src/utils/styles";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { deleteColumnThunk } from "./column.slice";
import { DeleteXButton } from "../button/delete-x-button";

export const columnHeight = "100vh - 6rem";

const Container = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  width: 20rem;
  height: fit-content;
  max-height: calc(${columnHeight});

  display: grid;
  grid-template-rows: min-content auto;
  justify-content: stretch;
  align-items: start;
  gap: 1rem;
  background-color: ${colors.backgroundB};
  overflow-y: auto;
  word-wrap: break-word;
  color: ${colors.boldText};
`;

const Header = styled.div`
  padding: 0.3rem;

  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
`;

const Title = styled.h4`
  font-size: 1.2rem;
`;

interface ColumnProps {
  columnId: number;
  title: string;
  index: number;
}

/**
 * Column component responsible for each column within the board.
 */
export const Column = ({ columnId, title, index }: ColumnProps) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      `Delete a column "${title}"? All cards in the column also will be deleted.`
    );
    if (!isConfirmed) return;

    dispatch(deleteColumnThunk({ id: columnId }));
  };

  /**
   * To avoid being rerenderred when a column is being dragged. Because dragging
   * will cause a rerender of all of the children of the <Droppable />.
   */
  const MemoedCardList = React.memo(() => <CardList columnId={columnId} />);

  return (
    <Draggable draggableId={`column-${columnId.toString()}`} index={index}>
      {(columnProvided) => (
        <div
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
          {...columnProvided.dragHandleProps}
        >
          <Droppable droppableId={columnId.toString()} type="cards">
            {(provided) => (
              <Container ref={provided.innerRef} {...provided.droppableProps}>
                <Header>
                  <Title>{title}</Title>
                  <DeleteXButton onClick={handleDelete} />
                </Header>
                <MemoedCardList />
                {provided.placeholder}
                <NewCard columnId={columnId} />
              </Container>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
