import styled from "styled-components";
import { useSelector } from "react-redux";

import { Card } from "src/types/inner/card.g";
import { ColumnCard } from "../columns/column-card";
import { NewColumnCard } from "../columns/new-column-card";
import { drelloColors } from "../../constants/colors";
import { selectCards } from "src/redux/domain/card";

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

// Component Interface Defination
interface BoardColumnProps {
  columnId: number;
  title: string;
}

// Board Column component responsible for each column within the board
export const BoardColumn = ({ columnId, title }: BoardColumnProps) => {
  const cards = useSelector(selectCards);
  return (
    <>
      <ColumnMain>
        <ColumnHeader>
          <ColumnTitle>{title}</ColumnTitle>
          <span>...</span>
        </ColumnHeader>
        {cards?.map(
          (card) =>
            columnId === card.columnId && (
              <ColumnCard key={card.id} title={card.title} />
            )
        )}
        <NewColumnCard columnId={columnId} />
      </ColumnMain>
    </>
  );
};
