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

const HeaderContainer = styled.header<{ disableShadow: boolean }>`
  box-shadow: ${({ disableShadow }) =>
    disableShadow ? "none" : "0 0.1em 0.6em #ddd"};
  padding: 0 5% 0;
  height: ${headerHeight};
  width: 100vw;
  position: fixed;
  top: 0;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.white()};
`;

const HeaderAfter = styled.div`
  height: ${headerHeight};
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
  gap: 2em;
`;

interface HeaderProps {
  disableShadow?: boolean;
}

export const Header: FC<HeaderProps> = ({ disableShadow = false }) => {
  const { currentUser } = useAuth();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 460px)" });

  return (
    <>
      <HeaderContainer disableShadow={disableShadow}>
        <Link href={path.home()}>
          <a>
            <HeaderBrand>Drello</HeaderBrand>
          </a>
        </Link>
        <LeftNavItems>
          {currentUser ? (
            <DuringSigninWrapper>
              {isSmallScreen || (
                <GoToBoardButton boardId={currentUser.boardId} />
              )}
              <SignoutButton />
            </DuringSigninWrapper>
          ) : (
            <SigninButton text="Login" />
          )}
        </LeftNavItems>
      </HeaderContainer>
      <HeaderAfter />
    </>
  );
};

export default Header;
