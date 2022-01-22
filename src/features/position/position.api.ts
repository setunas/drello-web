import { drelloApiAxios } from "src/utils/axios/drello-api-axios";
import { path } from "src/utils/url/drello-api";
import { OuterCard } from "src/features/card/card.g";

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

  return await drelloApiAxios.patch<{ cards: OuterCard[] }>(
    path.positions(args.columnId),
    body,
    {
      headers: { Authorization: `Bearer ${args.idToken}` },
    }
  );
};
