import styled from "styled-components";
import { FcBoard } from "./focus.style";

export const WsSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 8fr;
  padding: 3em 0;
`;
export const WsNav = styled.nav`
  h3 {
    font-size: 1.3em;
  }
  ul {
    list-style-type: none;
  }
`;

export const BdList = styled(FcBoard)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2em;
`;

export const MiniBdList = styled.ol`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  list-style-type: "- ";
  text-transform: uppercase;
  justify-items: center;
`;
