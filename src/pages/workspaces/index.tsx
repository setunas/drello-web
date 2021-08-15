import { useState } from "react";
import { Header } from "../../components/header";
import { Focus } from "../../components/workspaces/focus";
import { Main, Footer } from "../../components/shared-styles";
import { FcBar, FcHr } from "../../components/workspaces/focus.style";
import { BoardsList } from "../../components/workspaces/boards-list";
import { MiniBdList } from "../../components/workspaces/boards-list.style";
import { drelloBoardsList } from "../../utils/mockdata/drello-boards";

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
                <li key={drelloBoardsItem.id}>{drelloBoardsItem.title}</li>
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
                <li key={focusBoardItem.id}>{focusBoardItem.title}</li>
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
