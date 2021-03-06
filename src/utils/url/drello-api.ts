import { currentEnv, serverEnv } from "src/utils/server-env";

export const domain = () => {
  switch (currentEnv()) {
    case serverEnv.development:
    case serverEnv.test:
      return "http://localhost:8080";
    case serverEnv.staging:
      return "https://drello-api-dev.herokuapp.com";
    case serverEnv.production:
    default:
      throw Error(`Invalid server env: ${currentEnv()}`);
  }
};

export const path = {
  boards: (boardId?: number) => (boardId ? `/boards/${boardId}` : `/boards`),
  columns: (columnId?: number) =>
    columnId ? `/columns/${columnId}` : `/columns`,
  cards: (cardId?: number) => (cardId ? `/cards/${cardId}` : `/cards`),
  me: () => `/me`,
  signup: () => `/signup`,
  columnPositions: () => `/columns/positions`,
  cardPositions: () => `/cards/positions`,
};
