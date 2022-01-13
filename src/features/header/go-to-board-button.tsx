import Link from "next/link";
import { path } from "src/utils/url/drello-web";
import { FC } from "react";
import styled, { CSSProperties } from "styled-components";
import { colors } from "src/utils/styles";
import { useRouter } from "next/router";
import { boardPagePath } from "src/pages/boards/[id]";

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
  style?: CSSProperties;
}

export const GoToBoardButton: FC<GoToBoardButtonProps> = ({
  boardId,
  style,
}) => {
  const router = useRouter();
  const isBoardPage = router.pathname === boardPagePath;

  if (isBoardPage) return null;
  return (
    <Link href={path.boards(boardId)}>
      <InnerLink style={style}>Go to Board</InnerLink>
    </Link>
  );
};
