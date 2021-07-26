import Head from "next/head";
import {
  Footer,
  Headline,
  Main,
  HeadlineMain,
} from "../components/custom-styles";
import Header from "../components/header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Drello</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Header title="Drello" />
        <Headline>Welcome to the future of Trello</Headline>
        <HeadlineMain>Drello</HeadlineMain>
      </Main>
      <Footer>
        <p>&copy; 2021 Setunas Team</p>
      </Footer>
    </>
  );
}
