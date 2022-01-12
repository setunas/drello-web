import styled from "styled-components";
import { colors } from "src/utils/styles";
import { signin } from "../auth/auth.slice";
import { useDispatch } from "react-redux";

const SigninButtonWrapper = styled.div`
  border-radius: 3em;
  padding: 0.5em 2em;
  background-color: ${colors.secondary};
  color: ${colors.black()};
  font-weight: bold;
  cursor: pointer;
`;

export const SigninButton = () => {
  const dispatch = useDispatch();

  const handleSignin = () => {
    dispatch(signin());
  };

  return (
    <SigninButtonWrapper onClick={handleSignin}>Login</SigninButtonWrapper>
  );
};
