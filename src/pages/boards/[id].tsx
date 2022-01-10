import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { Navbar } from "src/features/board/navbar";
import { Board } from "src/features/board/board";
import { imagePath } from "src/utils/url/drello-web";
import { getBoardThunk, selectBoardById } from "src/features/board/board.slice";
import { useAuth } from "src/features/auth/use-auth";
import { path } from "src/utils/url/drello-web";

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

const BoardPage = () => {
  const { idToken, currentUser } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const boardId =
    typeof Number(router?.query?.id) === "number" ? Number(router.query.id) : 0;
  const board = useSelector(selectBoardById(boardId));

  useEffect(() => {
    if (boardId !== 0 && idToken) {
      dispatch(getBoardThunk({ boardId, idToken }));
    }
  }, [boardId, idToken]);

  useEffect(() => {
    if (currentUser && currentUser?.boardId !== boardId) {
      window.location.href = path.landing();
    }
  }, [currentUser]);

  if (!board) return null;
  return (
    <>
      <BoardImage
        src={board.boardImage?.src || imagePath.template1}
        alt={board.boardImage?.alt}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <Main>
        <Navbar />
        <Board boardId={boardId} />
      </Main>
    </>
  );
};

export default BoardPage;
