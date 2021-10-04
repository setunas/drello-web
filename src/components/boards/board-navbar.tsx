import styled from "styled-components";
import Link from "next/dist/client/link";
import { AnchorLink } from "../shared-styles";

const NavMain = styled.nav`
  display: grid;
  justify-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 1rem;
`;

const NavBrand = styled.h3`
  color: rgba(187, 178, 178, 1);
  font-size: 1.4rem;
`;

export const BoardNavbar = () => {
  return (
    <NavMain>
      <Link href="/">
        <AnchorLink>
          <NavBrand>Drello</NavBrand>
        </AnchorLink>
      </Link>
    </NavMain>
  );
};
