import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormFields = {
  email: string;
  password: string;
};

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}
      <input {...register("password", { required: true })} />
      {errors.password && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
};

export default SignupPage;
