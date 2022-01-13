import styled, { CSSProperties } from "styled-components";
import { colors } from "src/utils/styles";
import { signin } from "../auth/auth.slice";
import { useDispatch } from "react-redux";
import { FC } from "react";

const SigninButtonWrapper = styled.span`
  border-radius: 3em;
  padding: 0.5em 2em;
  background-color: ${colors.secondary};
  color: ${colors.boldText};
  font-weight: bold;
  cursor: pointer;
`;

interface SigninButtonProps {
  text: string;
  style?: CSSProperties;
}

export const SigninButton: FC<SigninButtonProps> = ({ text, style }) => {
  const dispatch = useDispatch();

  const handleSignin = () => {
    dispatch(signin());
  };

  return (
    <SigninButtonWrapper onClick={handleSignin} style={style}>
      {text}
    </SigninButtonWrapper>
  );
};
