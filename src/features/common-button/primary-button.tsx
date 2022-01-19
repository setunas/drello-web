import { FC, MouseEventHandler } from "react";
import styled, { CSSProperties } from "styled-components";
import { colors } from "src/utils/styles";

const PrimaryButtonWrapper = styled.button`
  border-radius: 3em;
  border: 1px solid ${colors.primary};
  padding: 0.7em 2em;

  background-color: ${colors.primary};
  color: ${colors.backgroundMain};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

interface PrimaryButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  text,
  onClick,
  style,
}) => {
  return (
    <PrimaryButtonWrapper onClick={onClick} style={style}>
      {text}
    </PrimaryButtonWrapper>
  );
};
