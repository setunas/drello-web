import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";

export interface Card {
  id: number;
  title: string;
  columnId: number;
  position: number;
}

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

  return await drelloApiAxios.post<Card>(path.cards(), body, {
    headers: { Authorization: `Bearer ${args.idToken}` },
  });
};
