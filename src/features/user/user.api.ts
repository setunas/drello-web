import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";

export interface User {
  id: number;
  username: string;
  boardId: number;
}

export const getUser = ({ idToken }: { idToken: string }) =>
  drelloApiAxios.get<User>(path.users(), {
    headers: { Authorization: `Bearer ${idToken}` },
  });

export const postUser = ({
  idToken,
  username,
}: {
  idToken: string;
  username: string;
}) => {
  return drelloApiAxios.post<User>(
    path.users(),
    { Username: username },
    {
      headers: { Authorization: `Bearer ${idToken}` },
    }
  );
};
