import { fontFamily } from "src/utils/styles";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #__next {
    height: 100%;
    width: 100%;
  }

  body, #__next {
    font-family: ${fontFamily.primary};
  }

  #__next {
    display: grid;
    grid-template-rows: 2fr 9fr 1fr;
    grid-gap: 1em;
  }
  
  a {
    text-decoration: none;
  }

  div {
    word-wrap: break-word;
  }

  button {
    cursor: pointer;
  }
`;
