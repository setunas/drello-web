import Head from "next/head";
import { Header, headerHeight } from "src/features/header/header";
import { url } from "src/utils/url/others";
import { colors } from "src/utils/styles";
import styled from "styled-components";

const footerHeight = "2em";

const LandingMain = styled.main`
  padding: 0 5em;
  height: calc(100vh - ${headerHeight} - ${footerHeight});
  display: grid;
  align-content: center;
  background-image: linear-gradient(
    to bottom right,
    ${colors.primary} 30%,
    ${colors.white()} 0
  );
  text-align: center;
  color: ${colors.text};
`;

const Headline = styled.article`
  display: grid;
  align-content: space-evenly;
  gap: 1em;
`;

const HeadlineSub = styled.h3`
  font-size: 4rem;
  font-weight: bold;
  color: ${colors.boldText};

  @media screen and (max-width: 720px) {
    font-size: 3rem;
  }
`;

const InnerLink = styled.span`
  color: ${colors.boldText}; /* To change the color of the visited link in Safari */
`;

const Footer = styled.footer`
  height: ${footerHeight};
  width: 100%;
  position: fixed;
  bottom: 0;
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Drello</title>
        <meta name="description" content="A Trello clone" />
      </Head>
      <Header />
      <LandingMain>
        <Headline>
          <HeadlineSub>Simple Kanban</HeadlineSub>
          <HeadlineSub>for your todos</HeadlineSub>
        </Headline>
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
