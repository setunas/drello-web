import styled from "styled-components";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { colors } from "src/utils/styles";
import { path } from "src/utils/url/drello-web";
import { signout } from "src/features/auth/auth.slice";

const SignoutButtonWrapper = styled.span`
  padding: 0.5em 0;
  color: ${colors.text};
  font-weight: bold;
  cursor: pointer;
`;

export const SignoutButton = () => {
  const dispatch = useDispatch();

  const handleSignout = async () => {
    await Router.push(path.home());
    dispatch(signout());
  };

  return (
    <SignoutButtonWrapper onClick={handleSignout}>Logout</SignoutButtonWrapper>
  );
};
