import Head from "next/head";
import {
  Footer,
  Headline,
  LandingMain,
  HeadlineMain,
  HeadlineSub,
} from "../components/shared-styles";
import { Header } from "../components/header";

export default function Home() {
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
      <Footer>&copy; 2021 Setunas Team</Footer>
    </>
  );
}
