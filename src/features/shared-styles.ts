import styled from "styled-components";

export const Main = styled.main`
  display: grid;
  gap: 1em;
  text-align: center;
  color: #707070;
  padding: 0 5em;
`;

export const Footer = styled.footer`
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const LandingMain = styled(Main)`
  align-content: center;
`;

export const Headline = styled.article`
  display: grid;
  align-content: space-evenly;
  gap: 1em;
`;

export const HeadlineMain = styled.h2`
  font-family: "Arapey", serif;
  font-size: 2em;
`;

export const HeadlineSub = styled.h3`
  font-size: 1.3rem;
  font-weight: 100;
`;

export const AnchorLink = styled.a`
  text-decoration: none;
  color: inherit;
`;
