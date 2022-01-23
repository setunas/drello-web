import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import { Board } from "src/features/board/board";
import { getBoardThunk, selectBoardById } from "src/features/board/board.slice";
import { useAuth } from "src/features/auth/use-auth";
import { path } from "src/utils/url/drello-web";
import { colors, zIndex } from "src/utils/styles";
import Header from "src/features/header/header";

const Main = styled.main`
  z-index: ${zIndex.mainOfBoardPage};

  height: 100vh;

  display: grid;
  grid-auto-rows: min-content;

  background-image: linear-gradient(
    to left bottom,
    ${colors.backgroundMain} 90%,
    ${colors.primary} 0
  );
`;

export const boardPagePath = "/boards/[id]";

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
      Router.push(path.home());
    }
  }, [currentUser]);

  if (!board) return null;
  return (
    <Main>
      <Header />
      <Board boardId={boardId} />
    </Main>
  );
};

export default BoardPage;
