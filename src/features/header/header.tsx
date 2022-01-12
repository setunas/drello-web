import Link from "next/link";
import styled from "styled-components";
import { path } from "src/utils/url/drello-web";
import { colors, fontFamily } from "src/utils/styles";
import { useAuth } from "../auth/use-auth";
import { FC } from "react";
import { GoToBoardButton } from "./go-to-board-button";
import { SigninButton } from "./signin-button";

const HeaderContainer = styled.header`
  box-shadow: 0 0.1em 0.5em ${colors.black(0.4)};
  padding: 0 10% 0;
  height: 5em;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  color: ${colors.brandGrey()};

  @media screen and (max-width: 720px) {
    padding: 1em 2em 0;
  }
`;

const HeaderBrand = styled.h3`
  font-family: ${fontFamily.brand};
  font-size: 2em;
  color: ${colors.brandGrey()};
  @media screen and (max-width: 720px) {
    font-size: 1.7em;
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
    </HeaderContainer>
  );
};

export default Header;
