import styled from "styled-components";
import { BdCard } from "../custom-components/board-card.style";

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
`;

export const FcBdCard = styled(BdCard)``;
