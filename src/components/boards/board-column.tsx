import styled from "styled-components";
import { Card } from "../../types/inner/board.g";
import { ColumnCard } from "../columns/column-card";

// Styled Components
const ColumnMain = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  height: fit-content;
  gap: 1em;
  justify-content: stretch;
  align-items: start;
  background-color: rgba(220, 220, 220, 0.8);
  padding: 1em;
  min-width: 20vw;
  width: fit-content;
  border-radius: 5px;
  @media only screen and (min-width: 900px) {
    min-width: 15vw;
  }
`;

const ColumnHeader = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
`;

const ColumnTitle = styled.h4``;
const ColumnButton = styled.button`
  padding: 0.5em 1em;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

// Component Interfact Defination
interface BoardColumnProps {
  title: string;
  cards?: Card[];
  newColumn?: boolean;
}

// Board Column component responsible for each column with the board
export const BoardColumn = ({ title, cards }: BoardColumnProps) => {
  const addCard = () => {
    /* TODO: Implement addCard function with redux */
    console.log("Implement function to addCard ideally with redux");
  };

  return (
    <>
      <ColumnMain>
        <ColumnHeader>
          <ColumnTitle>{title}</ColumnTitle>
          <span>...</span>
        </ColumnHeader>
        {cards?.map(({ id, title }) => (
          <ColumnCard key={id} id={id} title={title} />
        ))}
        <ColumnButton onClick={addCard}>+ Add Card</ColumnButton>
      </ColumnMain>
    </>
  );
};
