import { url } from "src/utils/url/others";
import { colors, zIndex } from "src/utils/styles";
import styled from "styled-components";

export const footerHeight = "3em";

const FooterWrapper = styled.footer`
  z-index: ${zIndex.footer};
  height: ${footerHeight};
  width: 100%;

  position: fixed;
  bottom: 0;

  display: grid;
  justify-content: center;
  align-items: center;

  text-align: center;
  background-color: ${colors.backgroundMain};
`;

export const Footer = () => {
  return <FooterWrapper>&copy; 2022 Setunas Team</FooterWrapper>;
};
