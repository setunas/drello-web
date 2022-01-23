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
  users: (userId?: number) => (userId ? `/users/${userId}` : `/users`),
  signup: () => `/signup`,
  columnPositions: () => `/columns/positions`,
  cardPositions: (columnId: number) => `/columns/${columnId}/cards/positions`,
};
