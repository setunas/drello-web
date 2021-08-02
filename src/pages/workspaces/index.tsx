import Header from "../../components/header";
import Focus from "../../components/workspaces/focus";
import { Main, Footer } from "../../components/custom-styles";
import { FcBar, FcHr } from "../../components/workspaces/focus.style";

const drelloBoardsList = [
  {
    id: 1,
    title: "Dimsum",
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
  return (
    <>
      <Header title="Drello" />
      <Main>
        <FcBar>
          Focus
          <FcHr />
        </FcBar>
        <Focus drelloBoardsList={drelloBoardsList} />
        <FcBar>
          All Boards
          <FcHr />
        </FcBar>
      </Main>
      <Footer>&copy; 2021 Setunas Team</Footer>
    </>
  );
};

export default Workspaces;
