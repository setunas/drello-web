import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";
import { Board } from "src/types/outer/drello-api/board";

export const getBoards = () =>
  drelloApiAxios.get<{ boards: Board[] }>(path.boards());
