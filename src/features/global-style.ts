import { colors, fontFamily } from "src/utils/styles";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${colors.textPlain};
    outline: none;
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

  input {
    &::placeholder {
      color: ${colors.textPlaceholder}; /* Chrome, Firefox, Opera, Safari 10.1+ */
      opacity: 1; /* Firefox */
    }
    &:-ms-input-placeholder {
      color: ${colors.textPlaceholder}; /* Internet Explorer 10-11 */
    }
    &::-ms-input-placeholder {
      color: ${colors.textPlaceholder}; /* Microsoft Edge */
    }
  }

  input[type=text] {
    border: 1px solid ${colors.backgroundMain};    

    &:focus {
      border: 1px solid ${colors.primary};
      outline: none !important;
    }
  }

  button {
    border: none;
    cursor: pointer;
  }
`;
