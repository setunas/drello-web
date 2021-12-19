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

export const postBoard = ({
  idToken,
  title,
}: {
  idToken: string;
  title: string;
}) =>
  drelloApiAxios.post<Board>(
    path.boards(),
    { title },
    {
      headers: { Authorization: `Bearer ${idToken}` },
    }
  );
