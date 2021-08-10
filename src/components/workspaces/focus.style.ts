import styled from "styled-components";

export const FcBar = styled.div`
  text-align: left;
`;

export const FcHr = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
`;

export const FcBoard = styled.section`
  padding: 1em;
`;

export const FcBdSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 1rem;
  justify-content: space-evenly;
  align-content: space-around;
  @media only screen and (max-width: 1200px) {
    grid-template-columns: 2fr repeat(2, 1fr);
  }
`;

export const FcBdList = styled.div`
  padding: 0 3rem;
  justify-content: center;
  align-content: space-between;
  h4 {
    text-transform: uppercase;
  }
  li {
    list-style-type: none;
    text-align: left;
  }
`;
