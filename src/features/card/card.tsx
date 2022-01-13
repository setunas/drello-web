import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Card as CardType } from "./card.g";
import { deleteCardThunk } from "./card.slice";
import { useDispatch } from "react-redux";
import { DeleteXButton } from "../button/delete-x-button";
import { colors } from "src/utils/styles";

const CardMain = styled.div`
  /* border: 1px solid #ddd; */
  box-shadow: 0 0 1rem #ddd;
  border-radius: 0.5rem;
  padding: 1.1em;
  width: 18rem;

  display: grid;
  grid-template-columns: calc(100% - 2em) 0.7em;
  justify-content: space-between;
  align-items: center;

  font-size: 1rem;
  line-height: 1.3em;
  background-color: ${colors.background}};
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
          <DeleteXButton onClick={handleDelete} />
        </CardMain>
      )}
    </Draggable>
  );
};
