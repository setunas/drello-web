import { url } from "src/utils/url/others";
import { colors, zIndex } from "src/utils/styles";
import styled from "styled-components";

export const footerHeight = "3em";

const InnerLink = styled.span`
  color: ${colors.textPlain}; /* To change the color of the visited link in Safari */
`;

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
  return (
    <FooterWrapper>
      <a href={url.setunasGithub} target="_blank" rel="noreferrer">
        <InnerLink>&copy; 2022 Setunas Team</InnerLink>
      </a>
    </FooterWrapper>
  );
};
