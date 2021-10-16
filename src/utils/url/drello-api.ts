import { serverEnv } from "src/constants/system";
import { currentEnv } from "src/utils/server-env";

export const domain = () => {
  switch (currentEnv()) {
    case serverEnv.development:
    case serverEnv.test:
      return "http://localhost:3000";
    case serverEnv.staging:
    case serverEnv.production:
    default:
      throw Error(`Invalid server env: ${currentEnv()}`);
  }
};

export const path = {
  boards: (boardId?: number) =>
    boardId ? `/api/boards/${boardId}` : `/api/boards`,
  signUp: (signUpId?: number) =>
    signUpId ? `/api/sign-up/${signUpId}` : `/api/sign-up`,
};
