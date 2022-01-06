import { useSelector } from "react-redux";
import { Card } from "src/features/card/card";
import { selectCardsByColumnId } from "src/features/card/card.slice";

interface CardListProps {
  columnId: number;
}

export const CardList = ({ columnId }: CardListProps) => {
  const cards = useSelector(selectCardsByColumnId(columnId));

  return (
    <>
      {cards?.map((card, index) => (
        <Card key={card.id} card={card} index={index} />
      ))}
    </>
  );
};
