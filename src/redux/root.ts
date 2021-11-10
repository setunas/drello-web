import { combineReducers } from "redux";
import { boardReducer } from "src/redux/domain/board";
import { columnReducer } from "src/redux/domain/column";
import { cardReducer } from "src/redux/domain/card";

export const rootReducer = combineReducers({
  boardState: boardReducer,
  columnState: columnReducer,
  cardState: cardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
