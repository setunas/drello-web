import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "src/redux/auth.slice";
import { selectCurrentUser } from "src/redux/user.slice";
import { path } from "src/utils/url/drello-api";

const SigninPage = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser());

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
