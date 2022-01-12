import Head from "next/head";
import { Header } from "src/features/header/header";
import { url } from "src/utils/url/others";
import { colors } from "src/utils/styles";
import styled from "styled-components";

export const Footer = styled.footer`
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${colors.black()};
`;

export const LandingMain = styled.main`
  text-align: center;
  color: ${colors.black()};
  padding: 0 5em;
  display: grid;
  align-content: center;
`;

export const Headline = styled.article`
  display: grid;
  align-content: space-evenly;
  gap: 1em;
`;

export const HeadlineSub = styled.h3`
  font-size: 1.3rem;
  font-weight: 100;
`;

const InnerLink = styled.span`
  color: ${colors.black()}; /* To change the color of the visited link in Safari */
`;

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Drello</title>
        <meta name="description" content="A Trello clone" />
      </Head>
      <Header title="Drello" />
      <LandingMain>
        <Headline>
          <HeadlineSub>Simple kanban</HeadlineSub>
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
