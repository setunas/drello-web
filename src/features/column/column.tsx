import styled from "styled-components";
import { CardList } from "src/features/card/card-list";
import { NewCard } from "src/features/card/new-card";
import { drelloColors } from "src/utils/colors";

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
  background-color: ${drelloColors.greyish(0.9)};
  box-shadow: 0.2rem 0.2rem 0.2rem ${drelloColors.black(0.3)};
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
  color: ${drelloColors.white()};
`;

interface ColumnProps {
  columnId: number;
  title: string;
}

// Column component responsible for each column within the board
export const Column = ({ columnId, title }: ColumnProps) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <span>...</span>
      </Header>
      <CardList columnId={columnId} />
      <NewCard columnId={columnId} />
    </Container>
  );
};
