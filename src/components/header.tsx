import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
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
        <HeaderBrand>{title}</HeaderBrand>
        {/* TODO: Figure out grid styling for login button */}
        {/* <LeftNavItems>
          <span>
            <FontAwesomeIcon icon="sign-in-alt" /> Login to get started
          </span>
        </LeftNavItems> */}
      </HeaderBar>
    </HeaderContainer>
  );
};

export default Header;
