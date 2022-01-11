import Link from "next/link";
import { path } from "src/utils/url/drello-web";
import { FC } from "react";
import styled from "styled-components";

const InnerLink = styled.span`
  color: inherit; /* To change the color of the visited link in Safari*/
`;

interface GoToBoardButtonProps {
  boardId: number;
}

export const GoToBoardButton: FC<GoToBoardButtonProps> = ({ boardId }) => {
  return (
    <Link href={path.boards(boardId)}>
      <InnerLink>Go to Board</InnerLink>
    </Link>
  );
};
