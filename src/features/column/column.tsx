import styled from "styled-components";
import { CardList } from "src/features/card/card-list";
import { NewCard } from "src/features/card/new-card";
import { colors } from "src/utils/styles";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { DropDisabledStatus } from "../board/board.g";

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
  isDropDisabled: DropDisabledStatus;
}

/**
 * Column component responsible for each column within the board
 */
export const Column = ({
  columnId,
  title,
  index,
  isDropDisabled,
}: ColumnProps) => {
  return (
    <Draggable
      draggableId={`column-${columnId.toString()}`}
      index={index}
      isDragDisabled={isDropDisabled.columns}
    >
      {(columnProvided) => (
        <div
          ref={columnProvided.innerRef}
          {...columnProvided.draggableProps}
          {...columnProvided.dragHandleProps}
        >
          <Droppable
            droppableId={columnId.toString()}
            isDropDisabled={isDropDisabled.cards}
          >
            {(provided, snapshot) => (
              <Container ref={provided.innerRef} {...provided.droppableProps}>
                <Header>
                  <Title>{title}</Title>
                  <span>...</span>
                </Header>
                <CardList columnId={columnId} isDropDisabled={isDropDisabled} />
                <NewCard columnId={columnId} />
              </Container>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
