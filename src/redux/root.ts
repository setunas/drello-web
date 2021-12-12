import { combineReducers } from "redux";
import { authReducer } from "src/redux/auth.slice";
import { boardReducer } from "src/redux/board.slice";
import { columnReducer } from "src/redux/column.slice";
import { cardReducer } from "src/redux/card.slice";

export const rootReducer = combineReducers({
  authState: authReducer,
  boardState: boardReducer,
  columnState: columnReducer,
  cardState: cardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
