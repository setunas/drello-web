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
}
export interface Card {
  id: number;
  title: string;
  columnId: number;
  position: number;
}

export const getBoard = async ({
  boardId,
  idToken,
}: {
  boardId: number;
  idToken: string;
}) => {
  return await drelloApiAxios.get<Board>(path.boards(boardId), {
    headers: { Authorization: `Bearer ${idToken}` },
  });
};
