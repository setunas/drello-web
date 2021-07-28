import React from "react";
import { HeaderBar, HeaderBrand, HeaderContainer } from "./custom-styles";

const Header = ({ title }) => {
  return (
    <HeaderContainer>
      <HeaderBar>
        <HeaderBrand>{title}</HeaderBrand>
      </HeaderBar>
    </HeaderContainer>
  );
};

export default Header;
