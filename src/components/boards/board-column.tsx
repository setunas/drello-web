import { useState } from "react";
import styled from "styled-components";
import { Card, Column } from "../../types/inner/board.g";
import { ColumnCard } from "../column-cards/column-card";

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
  width: 20vw;
  border-radius: 5px;
  @media only screen and (min-width: 900px) {
    width: 15vw;
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

const ColumnInput = styled.input`
  padding: 1em;
  border: none;
  border-radius: 0.3rem;
  background-color: rgba(220, 220, 220, 0.8);
  height: fit-content;
  width: 20vw;
  text-transform: capitalize;
  @media only screen and (min-width: 900px) {
    width: 15vw;
  }
`;

// Component Interfact Defination
interface BoardColumnProps {
  title: string;
  cards?: Card[];
  newColumn?: boolean;
}

// Board Column component responsible for each column with the board
export const BoardColumn = ({ title, cards, newColumn }: BoardColumnProps) => {
  const [columnTitle, setColumnTitle] = useState("");

  const addColumn = (e) => {
    /* TODO: Implement add Column function */
    e.preventDefault();
    console.log("Implement function to addColumn ideally with redux");
  };

  const addCard = (e) => {
    /* TODO: Implement addCard function with redux */
    console.log("Implement function to addCard ideally with redux");
  };

  return (
    <>
      {newColumn === true ? (
        <form onSubmit={addColumn}>
          <ColumnInput placeholder="Enter title here..." />
        </form>
      ) : (
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
      )}
    </>
  );
};
