import styled from "styled-components";
import { Card } from "src/types/card.g";

const CardMain = styled.div`
  display: grid;
  padding: 1em;
  font-size: 0.9rem;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.2rem;
  max-width: 15vw;
  @media screen and (max-width: 720px) {
    max-width: 30vw;
  }
`;

export const ColumnCard = ({ title }: Card) => {
  return <CardMain>{title}</CardMain>;
};
