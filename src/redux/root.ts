import { combineReducers } from "redux";
import { authReducer } from "src/features/auth/auth.slice";
import { userReducer } from "src/redux/user.slice";
import { boardReducer } from "src/features/board/board.slice";
import { columnReducer } from "src/redux/column.slice";
import { cardReducer } from "src/features/card/card.slice";

export const rootReducer = combineReducers({
  authState: authReducer,
  userState: userReducer,
  boardState: boardReducer,
  columnState: columnReducer,
  cardState: cardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
