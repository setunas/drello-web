import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { drelloColors } from "src/utils/colors";

const Container = styled.nav`
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
`;

const BoardName = styled.h3`
  font-size: 1.3em;
`;

const BgNavItem = styled.div`
  background-color: ${drelloColors.black(0.3)};
  font-size: 0.8rem;
  border-radius: 0.3rem;
  padding: 0.5rem;
`;

interface SubnavProps {
  name: string;
}

export const Subnav = ({ name }: SubnavProps) => {
  return (
    <Container>
      <BoardName>{name}</BoardName>
      {/* TODO: Add focus/starred state to toggle star */}
      <BgNavItem>
        <FontAwesomeIcon icon={["far", "star"]} />
      </BgNavItem>
      <BgNavItem>
        <FontAwesomeIcon icon="cog" />
      </BgNavItem>
    </Container>
  );
};
