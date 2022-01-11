import styled from "styled-components";
import Link from "next/link";
import Router from "next/router";
import { AnchorLink } from "src/features/shared-styles";
import { path } from "src/utils/url/drello-web";
import { useDispatch } from "react-redux";
import { signout } from "src/features/auth/auth.slice";

const Main = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
`;

const Brand = styled.h3`
  font-size: 1.4rem;
`;

export const Navbar = () => {
  const dispatch = useDispatch();

  const handleSignout = async () => {
    await Router.push(path.home());
    dispatch(signout());
  };

  return (
    <Main>
      <Link href={path.home()}>
        <AnchorLink>
          <Brand>Drello</Brand>
        </AnchorLink>
      </Link>
      <AnchorLink>
        <div onClick={handleSignout}>Signout</div>
      </AnchorLink>
    </Main>
  );
};
