import { colors } from "src/utils/styles";
import styled from "styled-components";

export const LoadingDots = styled.span`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${colors.textPlaceholder};
  color: ${colors.textPlaceholder};
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;

  &::before,
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${colors.textPlaceholder};
    color: ${colors.textPlaceholder};
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  &::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${colors.textPlaceholder};
    color: ${colors.textPlaceholder};
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: ${colors.textPlain};
    }
    50%,
    100% {
      background-color: ${colors.backgroundSub};
    }
  }
`;
