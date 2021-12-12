import { useSelector } from "react-redux";
import { Card } from "src/components/cards/card";
import { selectCards } from "src/redux/card.slice";

interface CardListProps {
  columnId: number;
}

export const CardList = ({ columnId }: CardListProps) => {
  const cards = useSelector(selectCards);
  return (
    <>
      {cards?.map(
        (card) =>
          columnId === card.columnId && (
            <Card key={card.id} title={card.title} />
          )
      )}
    </>
  );
};
