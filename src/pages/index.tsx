import Head from "next/head";
import {
  Footer,
  Headline,
  LandingMain,
  HeadlineMain,
  HeadlineSub,
} from "src/features/shared-styles";
import { Header } from "src/features/header";
import { url } from "src/utils/url/others";

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
        <a href={url.setunasGithub} target="_blank">
          &copy; 2022 Setunas Team
        </a>
      </Footer>
    </>
  );
};

export default HomePage;
