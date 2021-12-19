import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";

interface User {
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
  boardId,
}: {
  idToken: string;
  boardId: number;
}) =>
  drelloApiAxios.post<User>(path.users(), {
    headers: { Authorization: `Bearer ${idToken}` },
  });
