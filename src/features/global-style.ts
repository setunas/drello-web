import { colors, fontFamily } from "src/utils/styles";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${colors.text};
  }

  body, #__next {
    font-family: ${fontFamily.primary};
  }
  
  a {
    text-decoration: none;
    cursor: pointer;

    &:visited {
      color: inherit;
    }
  }

  div {
    word-wrap: break-word;
  }

  button {
    cursor: pointer;
  }
`;
