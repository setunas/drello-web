import Link from "next/link";
import styled from "styled-components";
import { path } from "src/utils/url/drello-web";
import { colors, headerHeight } from "src/utils/styles";
import { FC } from "react";
import { GoToBoardButton } from "./go-to-board-button";
import { SigninButton } from "../common-button/signin-button";
import { SignoutButton } from "./signout-button";
import { useMediaQuery } from "react-responsive";
import { User } from "../user/user.g";

const HeaderContainer = styled.header<{ disableShadow: boolean }>`
  box-shadow: ${({ disableShadow }) =>
    disableShadow ? "none" : "0 0.1em 0.6em #ddd"};
  padding: 0 5% 0;
  height: ${headerHeight};
  width: 100vw;
  width: -webkit-fill-available;

  position: fixed;
  top: 0;

  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;

  background-color: ${colors.backgroundMain};
`;

const HeaderAfter = styled.div`
  height: ${headerHeight};
`;

const HeaderBrand = styled.h3`
  font-size: 2rem;
  color: ${colors.primary};
  @media screen and (max-width: 720px) {
    font-size: 1.7rem;
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
  currentUser: User | null;
  disableShadow?: boolean;
}

export const Header: FC<HeaderProps> = ({
  currentUser,
  disableShadow = false,
}) => {
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
            <SigninButton
              text="Login"
              loadingStyle={{ marginRight: "3.4em" }}
            />
          )}
        </LeftNavItems>
      </HeaderContainer>
      <HeaderAfter />
    </>
  );
};

export default Header;
