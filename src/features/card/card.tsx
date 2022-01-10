import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Card as CardType } from "./card.g";
import { deleteCardThunk } from "./card.slice";
import { useDispatch } from "react-redux";

const CardMain = styled.div`
  display: grid;
  grid-template-columns: calc(100% - 20px) 10px;
  justify-content: space-between;
  padding: 1em;
  font-size: 0.9rem;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.2rem;
`;

const DeleteButton = styled.div`
  font-weight: bold;
  cursor: pointer;
`;

interface CardProps {
  index: number;
  card: CardType;
}

export const Card = ({ index, card }: CardProps) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCardThunk({ id: card.id, columnId: card.columnId }));
  };

  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided) => (
        <CardMain
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>{card.title}</div>
          <DeleteButton onClick={handleDelete}>x</DeleteButton>
        </CardMain>
      )}
    </Draggable>
  );
};
