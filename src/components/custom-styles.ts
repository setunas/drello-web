import styled from "styled-components";

// Header styling
export const HeaderContainer = styled.header`
  grid-column: 1 / 13;
  padding: 3em;
`;
export const HeaderBar = styled.header`
  padding: 0 0 0 2em;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 1em;
  box-shadow: 0.1em 0.1em 0.1em 0.1em rgba(0, 0, 0, 0.5);
`;

export const HeaderBrand = styled.h3`
  font-family: "Arapey", serif;
  font-size: 1.7em;
  color: #707070;
`;

export const LeftNavItems = styled.div``;
// Main body
export const Main = styled.main`
  grid-column: 1 / 13;
  text-align: center;
  color: #707070;
  padding: 0 3em;
`;

// Footer
export const Footer = styled.footer`
  grid-column: 1 / 13;
  text-align: center;
`;

// Landing page

export const LandingSection = styled.section``;

export const Headline = styled.article`
  display: grid;
  align-content: space-evenly;
`;

export const HeadlineMain = styled.h2`
  font-family: "Arapey", serif;
  font-size: 2em;
`;

export const HeadlineSub = styled.h3`
  font-size: 1.3rem;
  font-weight: 100;
`;
