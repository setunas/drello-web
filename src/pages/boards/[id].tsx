import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { Navbar } from "src/components/boards/navbar";
import { drelloBoardsList } from "src/utils/mockdata/drello-boards";
import { NewColumn } from "src/components/columns/new-column";
import { ColumnList } from "src/components/columns/column-list";
import { Subnav } from "src/components/boards/subnav";
import { imagePath } from "src/utils/image-paths";
import { getBoardThunk } from "src/redux/domain/board";

const Main = styled.main`
  display: grid;
  grid-auto-rows: min-content;
  height: 100vh;
  z-index: 0;
`;

const BoardImage = styled(Image)`
  height: 100vh;
  z-index: -99;
`;

const Container = styled.section`
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
  const dispatch = useDispatch();
  const router = useRouter();
  const boardId = router?.query?.id ? Number(router.query.id) : null;

  useEffect(() => {
    if (boardId !== null) {
      dispatch(getBoardThunk(boardId));
    }
  }, [boardId]);

  return (
    <>
      <BoardImage
        src={drelloBoardsList[0].boardImage?.src || imagePath.template1}
        alt={drelloBoardsList[0].boardImage?.alt}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <Main>
        <Navbar />
        <Subnav name="Drello" />
        <Container>
          <ColumnList />
          <NewColumn />
        </Container>
      </Main>
    </>
  );
};

export default Board;
