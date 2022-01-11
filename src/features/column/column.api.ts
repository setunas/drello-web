import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";
import { OuterColumn } from "./column.g";

export const postColumn = async (args: {
  title: string;
  boardId: number;
  position: number;
  idToken: string;
}) => {
  const body = {
    Title: args.title,
    BoardId: args.boardId,
    Position: args.position,
  };

  return await drelloApiAxios.post<OuterColumn>(path.columns(), body, {
    headers: { Authorization: `Bearer ${args.idToken}` },
  });
};

export const updateColumn = async (args: {
  id: number;
  title: string;
  boardId: number;
  position: number;
  idToken: string;
}) => {
  const body = {
    Title: args.title,
    BoardId: args.boardId,
    Position: args.position,
  };

  return await drelloApiAxios.patch<OuterColumn>(path.columns(args.id), body, {
    headers: { Authorization: `Bearer ${args.idToken}` },
  });
};

export const deleteColumn = async (args: { id: number; idToken: string }) => {
  return await drelloApiAxios.delete<OuterColumn>(path.columns(args.id), {
    headers: { Authorization: `Bearer ${args.idToken}` },
  });
};
