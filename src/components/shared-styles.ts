import styled from "styled-components";

export const drelloColors = {
  black: (opacity: number = 1) => `rgba(0,0,0,${opacity})`,
  white: (opacity: number = 1) => `rgba(255,255,255,${opacity})`,
  greyish: (opacity: number = 1) => `rgba(141, 153, 174,${opacity})`,
};

// Main body
export const Main = styled.main`
  text-align: center;
  color: #707070;
  padding: 0 5em;
`;

// Footer
export const Footer = styled.footer`
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// Landing page

export const LandingMain = styled(Main)`
  display: grid;
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

// Links

export const AnchorLink = styled.a`
  text-decoration: none;
  color: inherit;
`;
