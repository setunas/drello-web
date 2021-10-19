import { combineReducers } from "redux";
import { boardReducer } from "src/redux/domain/board";

export const rootReducer = combineReducers({
  boardState: boardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
