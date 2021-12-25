import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signin } from "src/features/auth/auth.slice";
import { path } from "src/utils/url/drello-api";
import { useAuth } from "src/utils/use-auth";

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

  return <button onClick={handleClick}>Sign in with Google</button>;
};

export default SigninPage;
