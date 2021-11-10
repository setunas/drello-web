import { combineReducers } from "redux";
import { boardReducer } from "src/redux/domain/board";
import { columnReducer } from "src/redux/domain/column";

export const rootReducer = combineReducers({
  boardState: boardReducer,
  columnState: columnReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
