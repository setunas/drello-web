import styled from "styled-components";
import Link from "next/dist/client/link";
import { AnchorLink } from "../shared-styles";
import { path } from "../../utils/url/drello-web";

const NavMain = styled.nav`
  display: grid;
  background-color: rgba(0, 0, 0, 0.6);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
`;

const NavBrand = styled.h3`
  font-size: 1.4rem;
`;

export const BoardNavbar = () => {
  return (
    <NavMain>
      <Link href={path.landing()}>
        <AnchorLink>
          <NavBrand>Drello</NavBrand>
        </AnchorLink>
      </Link>
    </NavMain>
  );
};
