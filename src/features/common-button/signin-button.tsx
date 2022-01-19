import styled, { CSSProperties } from "styled-components";
import { colors } from "src/utils/styles";
import { signin } from "../auth/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";
import { AppThunkDispatch } from "src/utils/redux/store";
import { LoadingDots } from "../loading-dots";
import { selectIsLoading, setIsLoading } from "./signin-button.slice";

const SigninButtonWrapper = styled.span`
  border-radius: 3em;
  padding: 0.5em 2em;
  background-color: ${colors.primary};
  color: ${colors.backgroundMain};
  font-weight: bold;
  cursor: pointer;
`;

interface SigninButtonProps {
  text: string;
  style?: CSSProperties;
  loadingStyle?: CSSProperties;
}

export const SigninButton: FC<SigninButtonProps> = ({
  text,
  style,
  loadingStyle,
}) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const isLoading = useSelector(selectIsLoading());

  const handleSignin = () => {
    dispatch(setIsLoading(true));
    dispatch(signin())
      .unwrap()
      .finally(() => dispatch(setIsLoading(false)));
  };

  return (
    <>
      {isLoading ? (
        <span style={loadingStyle}>
          <LoadingDots />
        </span>
      ) : (
        <SigninButtonWrapper onClick={handleSignin} style={style}>
          {text}
        </SigninButtonWrapper>
      )}
    </>
  );
};
