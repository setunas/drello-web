import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signin } from "src/features/auth/auth.slice";
import { path } from "src/utils/url/drello-api";
import { useAuth } from "src/features/auth/use-auth";
import Header from "src/features/header";
import { Footer, LandingMain } from "src/features/shared-styles";
import styled from "styled-components";

const Card = styled.div`
  display: grid;
  justify-self: center;
  gap: 1em;
`;

const Button = styled.button`
  padding: 1em;
  text-align: center;
`;

const SigninPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      window.location.href = path.boards(currentUser.boardId);
    }
  }, [currentUser]);

  const handleClick = () => {
    dispatch(signin());
  };

  return (
    <>
      <Header title="Drello" />
      <LandingMain>
        <Card>
          <Button onClick={handleClick}>Sign in with Google</Button>
        </Card>
      </LandingMain>
      <Footer>&copy; 2021 Setunas Team</Footer>
    </>
  );
};

export default SigninPage;
