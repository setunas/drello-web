import React from "react";
import BoardCard from "../custom-components/board-card";
import { BdList, WsNav, WsSection } from "./boards-list.style";

const workspaceList = [
  { id: "wk1", name: "Setunas", type: "Engineering - IT", description: "" },
  { id: "wk2", name: "Family", type: "Engineering - IT", description: "" },
];

const BoardsList = ({ drelloBoardsList }) => {
  return (
    <WsSection>
      <WsNav>
        <h3>Workspaces</h3>
        <ul>
          {workspaceList.map((workspace) => (
            <li key={workspace.id}>{workspace.name}</li>
          ))}
        </ul>
      </WsNav>
      <BdList>
        {drelloBoardsList.map((boardItem) => (
          <BoardCard title={boardItem.title} key={boardItem.id} />
        ))}
      </BdList>
    </WsSection>
  );
};

export default BoardsList;
