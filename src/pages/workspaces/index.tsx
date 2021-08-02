import Header from "../../components/header";
import Focus from "../../components/workspaces/focus";
import { Main, Footer } from "../../components/custom-styles";
import { FcBar, FcHr } from "../../components/workspaces/focus.style";

const workspaceList = [
  { id: 1, title: "Dimsum" },
  { id: 2, title: "Project Echo" },
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
        <Focus workspaceList={workspaceList} />
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
