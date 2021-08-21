import styled from "styled-components";
import { Column } from "../../types/inner/board.g";
import { ColumnCard } from "../column-cards/column-card";

const ColumnMain = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  grid-gap: 1em;
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

const ColumnTitle = styled.h5`
  margin: 0%;
  padding: 0;
`;

const ColumnButton = styled.button`
  padding: 0.5em 1em;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

export const BoardColumn = ({ id, title, cards }: Column) => {
  return (
    <ColumnMain>
      <ColumnTitle>{title}</ColumnTitle>
      {cards?.map(({ id, title }) => (
        <ColumnCard key={id} id={id} title={title} />
      ))}
      <ColumnButton>+ Add Card</ColumnButton>
    </ColumnMain>
  );
};
