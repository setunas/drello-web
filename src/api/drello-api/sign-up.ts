import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";

export const signup = () => drelloApiAxios.get<{ signUp: {} }>(path.signUp());
