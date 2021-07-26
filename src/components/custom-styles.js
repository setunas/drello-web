import styled from "styled-components";

// Header styling
export const HeaderBar = styled.header`
  margin: 3em;
  border-radius: 0.4rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0.2rem 0.2rem 0.1rem 0.1rem rgba(0, 0, 0, 0.3);
`;

export const HeaderBrand = styled.h3`
  font-size: 3em;
  font-family: "Arapey", serif;
  color: #707070;
  margin: 1rem 1rem 1rem 1.5rem;
`;

// Main body
export const Main = styled.main`
  min-height: 90vh;
  color: #707070;
  font-family: "Fira Sans", sans-serif;
  padding: 0.5rem 1.5rem;
`;

// Footer
export const Footer = styled.footer`
  font-family: "Fira Sans", sans-serif;
  font-weight: 100;
  text-align: center;
`;

// Landing page

export const LandingSection = styled.section`
  padding: 0.1rem;
  display: grid;
  grid-gap: 0.1rem;
`;

export const Headline = styled.h2`
  margin: 10% 0 4% 0;
  text-align: center;
  font-size: 1.5em;
  font-weight: 400;
`;

export const HeadlineMain = styled(Headline)`
  margin-top: 0%;
  font-family: "Arapey", serif;
  font-size: 3em;
`;
