import Link from "next/link";
import styled from "styled-components";
import { path } from "src/utils/url/drello-web";
import { colors, fontFamily } from "src/utils/styles";
import { useAuth } from "../auth/use-auth";
import { FC } from "react";
import { GoToBoardButton } from "./go-to-board-button";
import { SigninButton } from "./signin-button";

const HeaderContainer = styled.header`
  padding: 1em 2em 0;
  color: ${colors.brandGrey()};

  @media screen and (min-width: 720px) {
    padding: 2em 10% 0;
  }
`;

const HeaderBar = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1.5em;
  border-radius: 1em;
  box-shadow: 0 0.1em 0.5em ${colors.black(0.4)};
  @media screen and (min-width: 720px) {
    padding: 1em 3em;
  }
`;

const HeaderBrand = styled.h3`
  font-family: ${fontFamily.brand};
  font-size: 1.7em;
  color: ${colors.brandGrey()};
  @media screen and (min-width: 720px) {
    font-size: 2em;
  }
`;

const LeftNavItems = styled.div`
  display: grid;
  align-content: center;
`;

interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  const { currentUser } = useAuth();

  return (
    <HeaderContainer>
      <HeaderBar>
        <Link href={path.home()}>
          <a>
            <HeaderBrand>{title}</HeaderBrand>
          </a>
        </Link>
        <LeftNavItems>
          {currentUser ? (
            <GoToBoardButton boardId={currentUser.boardId} />
          ) : (
            <SigninButton />
          )}
        </LeftNavItems>
      </HeaderBar>
    </HeaderContainer>
  );
};

export default Header;
