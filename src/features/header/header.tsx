import Link from "next/link";
import styled from "styled-components";
import { path } from "src/utils/url/drello-web";
import { colors } from "src/utils/styles";
import { useAuth } from "../auth/use-auth";
import { FC } from "react";
import { GoToBoardButton } from "./go-to-board-button";
import { SigninButton } from "./signin-button";
import { SignoutButton } from "./signout-button";
import { useMediaQuery } from "react-responsive";

export const headerHeight = "3.8rem";

const HeaderContainer = styled.header`
  box-shadow: 0 0.1em 0.5em ${colors.black()};
  padding: 0 5% 0;
  height: ${headerHeight};
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
`;

const HeaderBrand = styled.h3`
  font-size: 2em;
  color: ${colors.primary};
  @media screen and (max-width: 720px) {
    font-size: 1.7em;
  }
`;

const LeftNavItems = styled.div`
  display: grid;
  align-content: center;
`;

const DuringSigninWrapper = styled.div`
  display: flex;
`;

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  const { currentUser } = useAuth();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 460px)" });

  return (
    <HeaderContainer>
      <Link href={path.home()}>
        <a>
          <HeaderBrand>Drello</HeaderBrand>
        </a>
      </Link>
      <LeftNavItems>
        {currentUser ? (
          <DuringSigninWrapper>
            {isSmallScreen || <GoToBoardButton boardId={currentUser.boardId} />}
            <SignoutButton />
          </DuringSigninWrapper>
        ) : (
          <SigninButton text="Login" />
        )}
      </LeftNavItems>
    </HeaderContainer>
  );
};

export default Header;
