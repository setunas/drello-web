import React from "react";
import { BdCard, BdTitle } from "./board-card.style";

const BoardCard = ({ title }) => {
  return (
    <BdCard>
      <BdTitle>{title}</BdTitle>
    </BdCard>
  );
};

export default BoardCard;
