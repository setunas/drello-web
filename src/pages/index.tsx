import Head from "next/head";
import {
  Footer,
  Headline,
  LandingMain,
  HeadlineMain,
  HeadlineSub,
} from "src/features/shared-styles";
import { Header } from "src/features/header/header";
import { url } from "src/utils/url/others";
import { colors } from "src/utils/styles";
import styled from "styled-components";

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
          <HeadlineSub>Welcome to the future of Trello...maybe</HeadlineSub>
          <HeadlineMain>Drello</HeadlineMain>
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
