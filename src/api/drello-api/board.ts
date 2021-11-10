import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";

export interface Board {
  id: number;
  title: string;
  columns: Column[];
}

export interface Column {
  id: number;
  title?: string;
  cards?: Card[];
}
export interface Card {
  id: number;
  title: string;
}

export const getBoards = () =>
  drelloApiAxios.get<{ boards: Board[] }>(path.boards());
