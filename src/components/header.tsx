import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkItem } from "./custom-components/link-item";
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
        <LinkItem path="/">
          <HeaderBrand>{title}</HeaderBrand>
        </LinkItem>
        <LeftNavItems>
          <LinkItem path={path.workspaces()}>
            <FontAwesomeIcon icon="sign-in-alt" /> Login to get started
          </LinkItem>
        </LeftNavItems>
      </HeaderBar>
    </HeaderContainer>
  );
};

export default Header;
