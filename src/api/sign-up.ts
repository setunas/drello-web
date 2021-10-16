import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";
import { SignUp } from "src/types/outer/drello-api/sign-up";

export const signup = () =>
  drelloApiAxios.get<{ signUp: SignUp }>(path.signUp());
