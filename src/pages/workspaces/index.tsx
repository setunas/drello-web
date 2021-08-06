import { useState, useEffect } from "react";
import Header from "../../components/header";
import Focus from "../../components/workspaces/focus";
import { Main, Footer } from "../../components/custom-styles";
import { FcBar, FcHr } from "../../components/workspaces/focus.style";
import BoardsList from "../../components/workspaces/boards-list";
import { MiniBdList } from "../../components/workspaces/boards-list.style";

const drelloBoardsList = [
  {
    id: 1,
    title: "Dimsum",
    focus: true,
    workspace: {
      id: "wk2",
      name: "Family",
      type: "Engineering - IT",
      description: "",
    },
    stats: {
      milestones: ["50% Completed", "23% In Progress", "27% Backlog"],
      team_members: ["eddydev", "syndrome_123"],
      card_summary: [
        "34 total issues",
        "18 closed",
        "12 dropped",
        "1 archived",
      ],
    },
  },
  {
    id: 2,
    title: "Project Echo",
    focus: true,
    workspace: {
      id: "wk2",
      name: "Family",
      type: "Engineering - IT",
      description: "",
    },
    stats: {
      milestones: ["50% Completed", "23% In Progress", "27% Backlog"],
      team_members: ["eddydev", "syndrome_123"],
      card_summary: [
        "34 total issues",
        "18 closed",
        "12 dropped",
        "1 archived",
      ],
    },
  },
  {
    id: 3,
    title: "Drello",
    focus: false,
    workspace: {
      id: "wk1",
      name: "Setunas",
      type: "Engineering - IT",
      description: "",
    },
    stats: {
      milestones: ["50% Completed", "23% In Progress", "27% Backlog"],
      team_members: ["eddydev", "syndrome_123"],
      card_summary: [
        "34 total issues",
        "18 closed",
        "12 dropped",
        "1 archived",
      ],
    },
  },
];

const Workspaces = () => {
  const [focusView, setFocusView] = useState(true);
  const focusBoardList = drelloBoardsList.filter((item) => item.focus === true);

  const toggleFocus = () => {
    const focusToggle = !focusView;
    setFocusView(focusToggle);
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
