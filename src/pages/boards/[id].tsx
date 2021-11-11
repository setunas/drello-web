import styled from "styled-components";
import Image from "next/image";
import { Navbar } from "../../components/boards/navbar";
import { Column } from "../../components/columns/column";
import { drelloBoardsList } from "../../utils/mockdata/drello-boards";
import { Column as ColumnType } from "src/types/column.g";
import { NewColumn } from "../../components/columns/new-column";
import { BoardSubnav } from "src/components/boards/board-subnav";
import { useSelector } from "react-redux";
import { selectColumns } from "src/redux/domain/column";
import { imagePath } from "src/utils/image-paths";

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
        src={drelloBoardsList[0].boardImage?.src || imagePath.template1}
        alt={drelloBoardsList[0].boardImage?.alt}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <BoardMain>
        <Navbar />
        <BoardSubnav name="Drello" />
        <BoardContainer>
          {columns?.map(({ id, title }: ColumnType) => (
            <Column key={id} title={title || ""} columnId={id} />
          ))}
          <NewColumn />
        </BoardContainer>
      </BoardMain>
    </>
  );
};

export default Board;
