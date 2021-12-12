import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { signUp } from "src/redux/auth.slice";

type FormFields = {
  email: string;
  password: string;
};

const SignupPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const handleClick = () => {
    dispatch(signUp());
  };

  return <button onClick={handleClick}>Sign up with Google</button>;
};

export default SignupPage;
