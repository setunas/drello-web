import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";
import { OuterUser } from "src/features/user/user.g";

export const postSignup = ({
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
