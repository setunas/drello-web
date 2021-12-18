import React from "react";
import { useDispatch } from "react-redux";
import { signin } from "src/redux/auth.slice";

const SigninPage = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(signin());
  };

  return <button onClick={handleClick}>Sign up with Google</button>;
};

export default SigninPage;
