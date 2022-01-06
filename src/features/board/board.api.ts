import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";

export interface Board {
  id: number;
  title: string;
  columns?: Column[];
  cards?: Card[];
}
export interface Column {
  id: number;
  title: string;
  boardId: number;
  headCardId?: number;
}
export interface Card {
  id: number;
  title: string;
  columnId: number;
  nextCardId: number;
}

export const getBoard = ({
  boardId,
  idToken,
}: {
  boardId: number;
  idToken: string;
}) =>
  drelloApiAxios.get<Board>(path.boards(boardId), {
    headers: { Authorization: `Bearer ${idToken}` },
  });
