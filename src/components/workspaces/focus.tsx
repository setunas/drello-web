import Link from "next/dist/client/link";
import { Board } from "../../types/inner/board.g";
import { BoardCard } from "../custom-components/board-card";
import { FocusListItem } from "./focus-list-item";
import styled from "styled-components";
import { AnchorLink } from "../shared-styles";

const FcBoard = styled.section`
  padding: 1em;
`;

const FcBdSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 1rem;
  justify-content: space-evenly;
  align-content: space-around;
  @media only screen and (max-width: 1200px) {
    grid-template-columns: 2fr repeat(2, 1fr);
  }
`;

interface FocusProps {
  drelloBoardsList: Board[];
}

export const Focus = ({ drelloBoardsList }: FocusProps) => {
  return (
    <>
      <FcBoard>
        {drelloBoardsList.map((workspaceItem, idx) => (
          <FcBdSummary key={idx}>
            <Link href={`/boards/${workspaceItem.id}`}>
              <AnchorLink>
                <BoardCard title={workspaceItem.title} />
              </AnchorLink>
            </Link>
            {workspaceItem?.stats?.map(({ measure, content }, idx) => (
              <FocusListItem
                key={`wk-focus-item-${idx}`}
                measure={measure}
                content={content}
              />
            ))}
          </FcBdSummary>
        ))}
      </FcBoard>
    </>
  );
};
