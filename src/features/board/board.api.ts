import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";
import { OuterBoard } from "./board.g";

export const getBoard = async ({
  boardId,
  idToken,
}: {
  boardId: number;
  idToken: string;
}) => {
  return await drelloApiAxios.get<OuterBoard>(path.boards(boardId), {
    headers: { Authorization: `Bearer ${idToken}` },
  });
};
