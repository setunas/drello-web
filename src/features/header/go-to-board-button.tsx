import Link from "next/link";
import { path } from "src/utils/url/drello-web";
import { FC } from "react";
import styled from "styled-components";
import { colors } from "src/utils/styles";

const InnerLink = styled.span`
  border-radius: 3em;
  border: 1px solid ${colors.primary};
  padding: 0.5em 2em;
  color: ${colors.primary}; /* To change the color of the visited link in Safari*/
  font-weight: bold;
  cursor: pointer;
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
