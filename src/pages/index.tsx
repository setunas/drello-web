import Head from "next/head";
import { Header, headerHeight } from "src/features/header/header";
import { url } from "src/utils/url/others";
import { colors, zIndex } from "src/utils/styles";
import styled from "styled-components";
import { useAuth } from "src/features/auth/use-auth";
import { SigninButton } from "src/features/header/signin-button";
import { GoToBoardButton } from "src/features/header/go-to-board-button";
import { useMediaQuery } from "react-responsive";

const footerHeight = "3em";

const LandingMain = styled.main`
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

const InnerLink = styled.span`
  color: ${colors.textPlain}; /* To change the color of the visited link in Safari */
`;

const Footer = styled.footer`
  z-index: ${zIndex.footer};
  height: ${footerHeight};
  width: 100%;

  position: fixed;
  bottom: 0;

  display: grid;
  justify-content: center;
  align-items: center;

  text-align: center;
  background-color: ${colors.backgroundMain};
`;

const LoadingDots = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${colors.textBold};
  color: ${colors.textBold};
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;

  &::before,
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${colors.textBold};
    color: ${colors.textBold};
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  &::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${colors.textBold};
    color: ${colors.textBold};
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: ${colors.textPlain};
    }
    50%,
    100% {
      background-color: ${colors.backgroundSub};
    }
  }
`;

const HomePage = () => {
  const { currentUser } = useAuth();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 460px)" });

  return (
    <>
      <Head>
        <title>Drello</title>
        <meta name="description" content="Drello" />
      </Head>
      <Header disableShadow={true} />
      <LandingMain>
        <Headline>
          Simple Kanban
          <br />
          for your todos
        </Headline>
        <LoadingDots />
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
            />
          )}
        </div>
      </LandingMain>
      <Footer>
        <a href={url.setunasGithub} target="_blank" rel="noreferrer">
          <InnerLink>&copy; 2022 Setunas Team</InnerLink>
        </a>
      </Footer>
    </>
  );
};

export default HomePage;
