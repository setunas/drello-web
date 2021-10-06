import styled from "styled-components";
import Image from "next/image";
import { BoardNavbar } from "../../components/boards/board-navbar";
import { BoardColumn } from "../../components/boards/board-column";
import { drelloBoardsList } from "../../utils/mockdata/drello-boards";
import { Column } from "../../types/inner/board.g";
import { NewBoardColumn } from "../../components/boards/new-board-column";

const BoardMain = styled.main`
  display: grid;
  grid-auto-rows: min-content;
  gap: 1rem;
  height: 100vh;
  z-index: 0;
`;

const BoardImage = styled(Image)`
  height: 100vh;
  z-index: -99;
`;

const BoardContainer = styled.section`
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  justify-content: start;
  padding: 1em;
  overflow-x: auto;
`;

const Board = () => {
  return (
    <>
      <BoardImage
        src={drelloBoardsList[2].image?.src || "/images/template-1.JPG"}
        alt={drelloBoardsList[2].image?.alt}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <BoardMain>
        <BoardNavbar />
        <BoardContainer>
          {drelloBoardsList[2].columns?.map(({ id, title, cards }: Column) => (
            <BoardColumn key={id} title={title || ""} cards={cards} />
          ))}
          <NewBoardColumn />
        </BoardContainer>
      </BoardMain>
    </>
  );
};

export default Board;
