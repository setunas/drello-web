import styled from "styled-components";
import { Card } from "../../types/inner/board.g";

const CardMain = styled.div`
  padding: 1em;
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

export const ColumnCard = ({ id, title }: Card) => {
  return <CardMain>{title}</CardMain>;
};
