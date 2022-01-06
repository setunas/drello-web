import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBoard } from "src/features/board/board.api";
import { Board as innerBoard } from "src/features/board/board.g";
import { Board as OuterBoard } from "src/features/board/board.api";
import { RootState } from "src/utils/redux/root";

interface BoardState {
  boards: innerBoard[];
}

const initialState: BoardState = {
  boards: [],
};

const convertBoardToInnerType = (ob: OuterBoard): innerBoard => {
  return {
    id: ob.id,
    title: ob.title,
  };
};

export const getBoardThunk = createAsyncThunk(
  "board/getBoardsThunk",
  async ({ boardId, idToken }: { boardId: number; idToken: string }) => {
    return await getBoard({ boardId, idToken });
  }
);

export const slice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardThunk.fulfilled, (state, action) => {
      state.boards = action.payload
        ? [convertBoardToInnerType(action.payload.data)]
        : [];
    });
    builder.addCase(getBoardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

// Selectors
export const selectBoardById = (boardId: number) => (state: RootState) =>
  state.boardState.boards.find((board) => board.id === boardId);

// Reducer & Actions
export const boardReducer = slice.reducer;
