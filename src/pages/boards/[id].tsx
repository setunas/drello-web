import styled from "styled-components";
import Image from "next/image";
import { BoardNavbar } from "../../components/boards/board-navbar";
import { BoardColumn } from "../../components/boards/board-column";
import { drelloBoardsList } from "../../utils/mockdata/drello-boards";
import { Column } from "../../types/inner/board.g";

const BoardMain = styled.main`
  display: grid;
  max-height: 100vh;
  z-index: 0;
`;

const BoardImage = styled(Image)`
  max-height: 100vh;
  z-index: -99;
`;

const BoardContainer = styled.section`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1em;
  justify-content: start;
  padding: 1em;
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
            <BoardColumn key={id} id={id} title={title || ""} cards={cards} />
          ))}
          <BoardColumn id={123124} title="Edit the title here..." />
        </BoardContainer>
      </BoardMain>
    </>
  );
};

export default Board;
