import styled from "styled-components";

// Header styling
export const HeaderBar = styled.header`
  padding: 0.2em;
  margin: 3em;
  border-radius: 0.4rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0.2rem 0.2rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
`;

export const HeaderBrand = styled.h3`
  font-size: 2em;
  color: #707070;
  margin-left: 2rem;
`;

// Main body
export const Main = styled.main`
  min-height: 70vh;
  color: #707070;
`;

// Footer
export const Footer = styled.footer`
  text-align: center;
`;

// Landing page

export const LandingSection = styled.section`
  padding: 0.1rem;
  display: grid;
  grid-gap: 0.1rem;
`;

export const Headline = styled.h2`
  text-align: center;
`;

export const HeadlineMain = styled(Headline)`
  font-size: 2em;
`;
