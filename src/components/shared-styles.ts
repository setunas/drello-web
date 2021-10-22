import styled from "styled-components";

export const drelloColors = {
  black: (opacity: number) => `rgba(0,0,0,${opacity})`,
  white: (opacity: number) => `rgba(255,255,255,${opacity})`,
};

// Header styling
export const HeaderContainer = styled.header`
  padding: 2em 5em;
`;
export const HeaderBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 2em 4em;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 1em;
  box-shadow: 0.1em 0.1em 0.1em 0.1em rgba(0, 0, 0, 0.5);
`;

export const HeaderBrand = styled.h3`
  font-family: "Arapey", serif;
  font-size: 1.7em;
  color: #707070;
`;

export const LeftNavItems = styled.div`
  display: grid;
  align-content: center;
`;
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
