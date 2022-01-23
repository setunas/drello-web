import { Header } from "src/features/header/header";
import { colors, headerHeight } from "src/utils/styles";
import styled from "styled-components";
import { useAuth } from "src/features/auth/use-auth";
import { SigninButton } from "src/features/common-button/signin-button";
import { GoToBoardButton } from "src/features/header/go-to-board-button";
import { useMediaQuery } from "react-responsive";
import { Footer, footerHeight } from "src/features/footer/footer";

const Main = styled.main`
  padding: 0 5em;
  height: calc(100vh - ${headerHeight} - ${footerHeight});

  display: grid;
  gap: 4em;
  align-items: center;
  align-content: center;

  text-align: center;
  background-image: linear-gradient(
    to bottom right,
    ${colors.primary} 15%,
    ${colors.backgroundMain} 0
  );
  color: ${colors.textPlain};

  @media screen and (max-height: 450px) {
    gap: 2em;
  }
`;

const Headline = styled.article`
  font-size: 4rem;
  font-weight: bold;
  color: ${colors.textBold};

  @media screen and (max-width: 720px) {
    font-size: 3rem;
  }

  @media screen and (max-height: 450px) {
    font-size: 3rem;
  }
`;

const HomePage = () => {
  const { currentUser } = useAuth();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 460px)" });

  return (
    <>
      <Header disableShadow={true} />
      <Main>
        <Headline>
          Simple Kanban
          <br />
          for your todos
        </Headline>
        <div>
          {currentUser ? (
            <GoToBoardButton
              boardId={currentUser.boardId}
              style={{ padding: "0.7em 2em" }}
            />
          ) : (
            <SigninButton
              text={isSmallScreen ? "Get Started" : "Login to Get Started"}
              style={{ padding: "0.7em 2em" }}
              loadingStyle={{ padding: "0 2em" }}
            />
          )}
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default HomePage;
