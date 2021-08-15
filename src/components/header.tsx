import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  HeaderBar,
  HeaderBrand,
  HeaderContainer,
  LeftNavItems,
} from "./shared-styles";
import { path } from "../utils/url/drello-web";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderBar>
        <Link href="/">
          <a>
            <HeaderBrand>{title}</HeaderBrand>
          </a>
        </Link>
        <LeftNavItems>
          <Link href={path.workspaces()}>
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
