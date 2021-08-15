import { Board } from "../../types/inner/board.g";
import { BoardCard } from "../custom-components/board-card";
import { FocusListItem } from "./focus-list-item";
import { FcBdSummary, FcBoard } from "./focus.style";

interface FocusProps {
  drelloBoardsList: Board[];
}

export const Focus = ({ drelloBoardsList }: FocusProps) => {
  return (
    <>
      <FcBoard>
        {drelloBoardsList.map((workspaceItem, idx) => (
          <FcBdSummary key={idx}>
            <BoardCard title={workspaceItem.title} />
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
