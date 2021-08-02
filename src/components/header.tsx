import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  HeaderBar,
  HeaderBrand,
  HeaderContainer,
  LeftNavItems,
} from "./custom-styles";

const Header = ({ title }) => {
  return (
    <HeaderContainer>
      <HeaderBar>
        <Link href="/">
          <a>
            <HeaderBrand>{title}</HeaderBrand>
          </a>
        </Link>
        <LeftNavItems>
          <Link href="/workspaces">
            <a>
              <FontAwesomeIcon icon="sign-in-alt" /> Login to get started
            </a>
          </Link>
        </LeftNavItems>
      </HeaderBar>
    </HeaderContainer>
  );
};

export default Header;
