import Link from "next/dist/client/link";
import { Card } from "../custom-components/card";
import { Board } from "../../types/inner/board.g";
import { Workspace } from "../../types/inner/workspace.g";
import styled from "styled-components";
import { AnchorLink } from "../shared-styles";

const WsSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 8fr;
  padding: 2rem 3em;
`;

const WsNavHeader = styled.h3`
  font-size: 1.3em;
  margin-bottom: 1rem;
`;

const WsNavList = styled.ul`
  list-style-type: none;
`;

const BdList = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2em;
  padding: 1em;
`;

interface BoardsListProps {
  drelloBoardsList: Board[];
}

const workspaceList: Workspace[] = [
  { id: 1232, name: "Setunas", type: "Engineering - IT", description: "" },
  { id: 124123, name: "Family", type: "Engineering - IT", description: "" },
];

export const BoardsList = ({ drelloBoardsList }: BoardsListProps) => {
  return (
    <WsSection>
      <nav>
        <WsNavHeader>Workspaces</WsNavHeader>
        <WsNavList>
          {workspaceList.map((workspace) => (
            <li key={workspace.id}>{workspace.name}</li>
          ))}
          <li>+ Add Workspace</li>
        </WsNavList>
      </nav>
      <BdList>
        {drelloBoardsList.map((boardItem) => (
          <Link key={boardItem.id} href={`/boards/${boardItem.id}`}>
            <AnchorLink>
              <Card title={boardItem.title} />
            </AnchorLink>
          </Link>
        ))}
      </BdList>
    </WsSection>
  );
};
