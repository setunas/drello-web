import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";

export interface Board {
  id: number;
  title: string;
  columns: Column[];
  cards?: Card[];
}
export interface Column {
  id: number;
  title?: string;
}
export interface Card {
  id: number;
  title: string;
  columnId: number;
}

export const getBoard = (boardId: number) =>
  drelloApiAxios.get<Board>(path.boards(boardId));
