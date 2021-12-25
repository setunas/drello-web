import { currentEnv, serverEnv } from "src/utils/server-env";

export const domain = () => {
  switch (currentEnv()) {
    case serverEnv.development:
    case serverEnv.test:
      return "http://localhost:8080";
    case serverEnv.staging:
    case serverEnv.production:
    default:
      throw Error(`Invalid server env: ${currentEnv()}`);
  }
};

export const path = {
  boards: (boardId?: number) => (boardId ? `/boards/${boardId}` : `/boards`),
  users: (userId?: number) => (userId ? `/users/${userId}` : `/users`),
};
