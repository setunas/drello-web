import React from "react";
import BoardCard from "../custom-components/board-card";
import { FcBdSummary, FcBoard, FcBdList } from "./focus.style";

const Focus = ({ drelloBoardsList }) => {
  return (
    <>
      <FcBoard>
        {drelloBoardsList.map((workspaceItem, idx) => (
          <FcBdSummary key={idx}>
            <BoardCard title={workspaceItem.title} />
            <FcBdList>
              <h4>Milestones</h4>
              <ul>
                {workspaceItem.stats.milestones.map((milestone, idx) => (
                  <li key={idx}>{milestone}</li>
                ))}
              </ul>
            </FcBdList>
            <FcBdList>
              <h4>Team Members</h4>
              <ul>
                {workspaceItem.stats.team_members.map((member, idx) => (
                  <li key={idx}>{member}</li>
                ))}
              </ul>
            </FcBdList>
            <FcBdList>
              <h4>Card Summary</h4>
              <ul>
                {workspaceItem.stats.card_summary.map((summary_item, idx) => (
                  <li key={idx}>{summary_item}</li>
                ))}
              </ul>
            </FcBdList>
          </FcBdSummary>
        ))}
      </FcBoard>
    </>
  );
};

export default Focus;
