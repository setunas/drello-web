import { BoardCard } from "../custom-components/board-card";
import { Board } from "../../types/inner/board.g";
import { Workspace } from "../../types/inner/workspace.g";
import {
  BdList,
  WsNavItem,
  WsNav,
  WsSection,
  WsNavHeader,
  WsNavList,
} from "./boards-list.style";

interface BoardsListProps {
  drelloBoardsList: Board[];
}

const workspaceList: Workspace[] = [
  { id: "wk1", name: "Setunas", type: "Engineering - IT", description: "" },
  { id: "wk2", name: "Family", type: "Engineering - IT", description: "" },
];

export const BoardsList = ({ drelloBoardsList }: BoardsListProps) => {
  return (
    <WsSection>
      <WsNav>
        <WsNavHeader>Workspaces</WsNavHeader>
        <WsNavList>
          {workspaceList.map((workspace) => (
            <WsNavItem key={workspace.id}>{workspace.name}</WsNavItem>
          ))}
          <WsNavItem>+ Add Workspace</WsNavItem>
        </WsNavList>
      </WsNav>
      <BdList>
        {drelloBoardsList.map((boardItem) => (
          <BoardCard title={boardItem.title} key={boardItem.id} />
        ))}
      </BdList>
    </WsSection>
  );
};
