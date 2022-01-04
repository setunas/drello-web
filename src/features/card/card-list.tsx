import { useSelector } from "react-redux";
import { Card } from "src/features/card/card";
import { selectCardsByColumnId } from "src/features/card/card.slice";
import { DropDisabledStatus } from "../board/board.g";

interface CardListProps {
  columnId: number;
  isDropDisabled: DropDisabledStatus;
}

export const CardList = ({ columnId, isDropDisabled }: CardListProps) => {
  const cards = useSelector(selectCardsByColumnId(columnId));

  return (
    <>
      {cards?.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          index={index}
          isDropDisabled={isDropDisabled}
        />
      ))}
    </>
  );
};
