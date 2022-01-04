import styled from "styled-components";
import { CardList } from "src/features/card/card-list";
import { NewCard } from "src/features/card/new-card";
import { colors } from "src/utils/styles";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  height: fit-content;
  justify-content: stretch;
  align-items: start;
  gap: 1em;
  padding: 1em;
  min-width: 15vw;
  border-radius: 0.2em;
  background-color: ${colors.greyish(0.9)};
  box-shadow: 0.2rem 0.2rem 0.2rem ${colors.black(0.3)};
  @media only screen and (max-width: 720px) {
    min-width: 20vw;
  }
`;

const Header = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
`;

const Title = styled.h4`
  color: ${colors.white()};
`;

interface ColumnProps {
  columnId: number;
  title: string;
  index: number;
}

/**
 * Column component responsible for each column within the board
 */
export const Column = ({ columnId, title, index }: ColumnProps) => {
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
                  <span>...</span>
                </Header>
                <CardList columnId={columnId} />
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
