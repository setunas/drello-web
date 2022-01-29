import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";
import { OuterUser } from "./user.g";

export const getCurrentUser = ({ idToken }: { idToken: string }) =>
  drelloApiAxios.get<OuterUser>(path.me(), {
    headers: { Authorization: `Bearer ${idToken}` },
  });
