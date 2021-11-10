import styled from "styled-components";
import Image from "next/image";
import { BoardNavbar } from "../../components/boards/board-navbar";
import { BoardColumn } from "../../components/boards/board-column";
import { drelloBoardsList } from "../../utils/mockdata/drello-boards";
import { Column } from "src/redux/domain/column.g";
import { NewBoardColumn } from "../../components/boards/new-board-column";
import { BoardSubnav } from "src/components/boards/board-subnav";
import { useSelector } from "react-redux";
import { selectColumns } from "src/redux/domain/column";

const BoardMain = styled.main`
  display: grid;
  grid-auto-rows: min-content;
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
  grid-auto-columns: max-content;
  gap: 1rem;
  padding: 1em;
  justify-content: start;
  justify-items: start;
  align-items: flex-start;
  overflow-x: auto;
`;

const Board = () => {
  const columns = useSelector(selectColumns);

  return (
    <>
      <BoardImage
        src={drelloBoardsList[2].boardImage?.src || "/images/template-1.JPG"}
        alt={drelloBoardsList[2].boardImage?.alt}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <BoardMain>
        <BoardNavbar />
        <BoardSubnav name="Drello" />
        <BoardContainer>
          {columns?.map(({ id, title, cards }: Column) => (
            <BoardColumn key={id} title={title || ""} cards={cards} />
          ))}
          <NewBoardColumn />
        </BoardContainer>
      </BoardMain>
    </>
  );
};

export default Board;
