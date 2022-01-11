import Link from "next/link";
import { path } from "src/utils/url/drello-web";
import { FC } from "react";

interface GoToBoardButtonProps {
  boardId: number;
}

export const GoToBoardButton: FC<GoToBoardButtonProps> = ({ boardId }) => {
  return <Link href={path.boards(boardId)}>Go to Board</Link>;
};
