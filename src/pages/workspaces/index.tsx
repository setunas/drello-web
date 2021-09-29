import { useState } from "react";
import Link from "next/dist/client/link";
import { Header } from "../../components/header";
import { Focus } from "../../components/workspaces/focus";
import { Main, Footer, AnchorLink } from "../../components/shared-styles";
import { BoardsList } from "../../components/workspaces/boards-list";
import { drelloBoardsList } from "../../utils/mockdata/drello-boards";
import styled from "styled-components";

const FcBar = styled.div`
  text-align: left;
`;

const FcHr = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
`;

const MiniBdList = styled.ol`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  list-style-type: "- ";
  text-transform: uppercase;
  justify-items: center;
`;

const Workspaces = () => {
  const [focusView, setFocusView] = useState(true);
  const focusBoardList = drelloBoardsList.filter((item) => item.focus === true);

  const toggleFocus = () => {
    setFocusView(!focusView);
  };

  return (
    <>
      <Header title="Drello" />
      <Main>
        {focusView ? (
          <>
            <FcBar onClick={toggleFocus}>
              Focus
              <FcHr />
            </FcBar>
            <Focus drelloBoardsList={focusBoardList} />
            <FcBar onClick={() => toggleFocus()}>
              All Boards
              <FcHr />
            </FcBar>
            <MiniBdList>
              {drelloBoardsList.map((drelloBoardsItem) => (
                <Link
                  key={drelloBoardsItem.id}
                  href={`/boards/${drelloBoardsItem.id}`}
                >
                  <AnchorLink>
                    <li>{drelloBoardsItem.title}</li>
                  </AnchorLink>
                </Link>
              ))}
            </MiniBdList>
          </>
        ) : (
          <>
            <FcBar onClick={() => toggleFocus()}>
              Focus
              <FcHr />
            </FcBar>
            <MiniBdList>
              {focusBoardList.map((focusBoardItem) => (
                <Link
                  key={focusBoardItem.id}
                  href={`/boards/${focusBoardItem.id}`}
                >
                  <AnchorLink>
                    <li>{focusBoardItem.title}</li>
                  </AnchorLink>
                </Link>
              ))}
            </MiniBdList>
            <FcBar onClick={() => toggleFocus()}>
              All Boards
              <FcHr />
            </FcBar>
            <BoardsList drelloBoardsList={drelloBoardsList} />
          </>
        )}
      </Main>
      <Footer>&copy; 2021 Setunas Team</Footer>
    </>
  );
};

export default Workspaces;
