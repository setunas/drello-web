import styled from "styled-components";
import Link from "next/dist/client/link";

const BarMain = styled.nav`
  grid-column: 1 / 13;
  display: grid;
  justify-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
`;

export const BoardNavbar = () => {
  return (
    <BarMain>
      <Link href="/">
        <a>
          <h3>Drello</h3>
        </a>
      </Link>
    </BarMain>
  );
};
