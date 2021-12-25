import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";
import { path } from "src/utils/url/drello-web";
import { colors } from "src/utils/styles";

const HeaderContainer = styled.header`
  display: grid;
  padding: 2em 2em 0 2em;
  @media screen and (min-width: 720px) {
    padding: 5em 10em 0 10em;
  }
`;

const HeaderBar = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  padding: 1em 1.5em;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 1em;
  box-shadow: 0.2em 0.2em 0.3em ${colors.black(0.4)};
  @media screen and (min-width: 720px) {
    padding: 2em 5em;
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

const InlineAnchor = {
  display: "grid",
  gridAutoFlow: "column",
  gap: "1em",
  alignContent: "center",
  textDecoration: "none",
  color: "inherit",
};

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderBar>
        <Link href={path.landing()}>
          <a>
            <HeaderBrand>{title}</HeaderBrand>
          </a>
        </Link>
        <LeftNavItems>
          <Link href={path.signin()}>
            <a style={InlineAnchor}>
              <FontAwesomeIcon icon="sign-in-alt" />
              <LoginText>Login to get started</LoginText>
            </a>
          </Link>
        </LeftNavItems>
      </HeaderBar>
    </HeaderContainer>
  );
};

export default Header;
