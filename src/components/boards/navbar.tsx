import styled from "styled-components";
import Link from "next/dist/client/link";
import { AnchorLink } from "src/components/shared-styles";
import { path } from "src/utils/url/drello-web";

const Main = styled.nav`
  display: grid;
  background-color: rgba(0, 0, 0, 0.6);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
`;

const Brand = styled.h3`
  font-size: 1.4rem;
`;

export const Navbar = () => {
  return (
    <Main>
      <Link href={path.landing()}>
        <AnchorLink>
          <Brand>Drello</Brand>
        </AnchorLink>
      </Link>
    </Main>
  );
};
