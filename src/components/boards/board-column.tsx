import styled from "styled-components";
import { Card } from "../../types/inner/board.g";
import { ColumnCard } from "../columns/column-card";
import { NewColumnCard } from "../columns/new-column-card";
import { drelloColors } from "../../constants/colors";

// Styled Components
const ColumnMain = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  height: fit-content;
  justify-content: stretch;
  align-items: start;
  gap: 1em;
  padding: 1em;
  min-width: 15vw;
  border-radius: 0.2em;
  background-color: ${drelloColors.greyish(0.9)};
  box-shadow: 0.2rem 0.2rem 0.2rem ${drelloColors.black(0.3)};
  @media only screen and (max-width: 720px) {
    min-width: 20vw;
  }
`;

const ColumnHeader = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
`;

const ColumnTitle = styled.h4`
  color: ${drelloColors.white()};
`;

// Component Interfact Defination
interface BoardColumnProps {
  title: string;
  cards?: Card[];
  newColumn?: boolean;
}

// Board Column component responsible for each column with the board
export const BoardColumn = ({ title, cards }: BoardColumnProps) => {
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
        <NewColumnCard />
      </ColumnMain>
    </>
  );
};
