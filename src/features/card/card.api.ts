import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";
import { OuterCard } from "./card.g";

export const postCard = async (args: {
  title: string;
  columnId: number;
  position: number;
  idToken: string;
}) => {
  const body = {
    Title: args.title,
    ColumnId: args.columnId,
    Position: args.position,
  };

  return await drelloApiAxios.post<OuterCard>(path.cards(), body, {
    headers: { Authorization: `Bearer ${args.idToken}` },
  });
};

export const updateCard = async (args: {
  id: number;
  title: string;
  columnId: number;
  position: number;
  idToken: string;
}) => {
  const body = {
    Title: args.title,
    ColumnId: args.columnId,
    Position: args.position,
  };

  return await drelloApiAxios.patch<OuterCard>(path.cards(args.id), body, {
    headers: { Authorization: `Bearer ${args.idToken}` },
  });
};
