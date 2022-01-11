import styled from "styled-components";
import { colors } from "src/utils/styles";
import { signin } from "../auth/auth.slice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const LoginText = styled.span`
  display: none;
  @media screen and (min-width: 720px) {
    display: block;
  }
`;

const SigninButtonWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 1em;
  align-content: center;
  align-items: center;
  text-decoration: none;
  color: ${colors.brandGrey()};
  cursor: pointer;
`;

export const SigninButton = () => {
  const dispatch = useDispatch();

  const handleSignin = () => {
    dispatch(signin());
  };

  return (
    <>
      <SigninButtonWrapper onClick={handleSignin}>
        <FontAwesomeIcon icon={faSignInAlt} />
        <LoginText>Login to get started</LoginText>
      </SigninButtonWrapper>
    </>
  );
};
