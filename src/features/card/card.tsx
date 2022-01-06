import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Card as CardType } from "./card.g";

const CardMain = styled.div`
  display: grid;
  padding: 1em;
  font-size: 0.9rem;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.2rem;
  max-width: 15vw;
  @media screen and (max-width: 720px) {
    max-width: 30vw;
  }
`;

interface CardProps {
  index: number;
  card: CardType;
}

export const Card = ({ index, card }: CardProps) => {
  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided) => (
        <CardMain
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.title}
        </CardMain>
      )}
    </Draggable>
  );
};
