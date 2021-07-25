import React from "react";
import { HeaderBar, HeaderBrand } from "./custom-styles";

const Header = ({ title }) => {
  return (
    <HeaderBar>
      <HeaderBrand>{title}</HeaderBrand>
    </HeaderBar>
  );
};

export default Header;
