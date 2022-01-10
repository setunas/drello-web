import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";
import { path } from "src/utils/url/drello-web";
import { colors } from "src/utils/styles";
import { signin } from "./auth/auth.slice";
import { useDispatch } from "react-redux";

const HeaderContainer = styled.header`
  display: grid;
  padding: 1em 2em 0;
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
  font-family: "Arapey", serif;
  font-size: 1.7em;
  color: #707070;
  @media screen and (min-width: 720px) {
    font-size: 2em;
  }
`;

const LeftNavItems = styled.div`
  display: grid;
  align-content: center;
`;

const LoginText = styled.span`
  display: none;
  @media screen and (min-width: 720px) {
    display: block;
  }
`;

const SigninButton = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 1em;
  align-content: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const dispatch = useDispatch();

  const handleSignin = () => {
    dispatch(signin());
  };

  return (
    <HeaderContainer>
      <HeaderBar>
        <Link href={path.home()}>
          <a>
            <HeaderBrand>{title}</HeaderBrand>
          </a>
        </Link>
        <LeftNavItems>
          <SigninButton onClick={handleSignin}>
            <FontAwesomeIcon icon="sign-in-alt" />
            <LoginText>Login to get started</LoginText>
          </SigninButton>
        </LeftNavItems>
      </HeaderBar>
    </HeaderContainer>
  );
};

export default Header;
