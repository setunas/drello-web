import React from "react";
import BoardCard from "../../components/custom-components/board-card";
import { FcBdSummary, FcBoard } from "./focus.style";

const Focus = ({ workspaceList }) => {
  return (
    <>
      <FcBoard>
        {workspaceList.map((workspaceItem, idx) => (
          <FcBdSummary key={idx}>
            <BoardCard title={workspaceItem.title} />
          </FcBdSummary>
        ))}
      </FcBoard>
    </>
  );
};

export default Focus;
