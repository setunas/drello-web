import styled, { CSSProperties } from "styled-components";
import { colors } from "src/utils/styles";
import { signin } from "../auth/auth.slice";
import { useDispatch } from "react-redux";
import { FC, useState } from "react";
import { AppThunkDispatch } from "src/utils/redux/store";
import { LoadingDots } from "../loading-dots";

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
}

export const SigninButton: FC<SigninButtonProps> = ({ text, style }) => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = () => {
    setIsLoading(true);
    dispatch(signin())
      .unwrap()
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading ? (
        <LoadingDots />
      ) : (
        <SigninButtonWrapper onClick={handleSignin} style={style}>
          {text}
        </SigninButtonWrapper>
      )}
    </>
  );
};
