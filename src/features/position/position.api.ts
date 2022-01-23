import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";

export const patchCardPositions = async (args: {
  cards: {
    id: number;
    position: number;
  }[];
  columnId: number;
  idToken: string;
}) => {
  const body = {
    Cards: args.cards,
  };

  return await drelloApiAxios.patch<null>(
    path.cardPositions(args.columnId),
    body,
    {
      headers: { Authorization: `Bearer ${args.idToken}` },
    }
  );
};

export const patchColumnPositions = async (args: {
  columns: {
    id: number;
    position: number;
  }[];
  idToken: string;
}) => {
  const body = {
    Columns: args.columns,
  };

  return await drelloApiAxios.patch<null>(path.columnPositions(), body, {
    headers: { Authorization: `Bearer ${args.idToken}` },
  });
};
