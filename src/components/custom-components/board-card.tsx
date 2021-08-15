import { BdCard, BdTitle } from "./board-card.style";

interface BoardCardProps {
  title: string;
}

export const BoardCard = ({ title }: BoardCardProps) => {
  return (
    <BdCard>
      <BdTitle>{title}</BdTitle>
    </BdCard>
  );
};
