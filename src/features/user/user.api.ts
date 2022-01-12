import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";
import { OuterUser } from "./user.g";

export const getUser = ({ idToken }: { idToken: string }) =>
  drelloApiAxios.get<OuterUser>(path.users(), {
    headers: { Authorization: `Bearer ${idToken}` },
  });

export const postUser = ({
  idToken,
  username,
}: {
  idToken: string;
  username: string;
}) => {
  return drelloApiAxios.post<OuterUser>(
    path.signup(),
    { Username: username },
    {
      headers: { Authorization: `Bearer ${idToken}` },
    }
  );
};
