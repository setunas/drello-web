import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBoard } from "src/api/drello-api/board.api";
import { Board as innerBoard } from "src/types/board.g";
import { Board as OuterBoard } from "src/api/drello-api/board.api";
import { RootState } from "src/redux/root";

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

export const selectBoardById = (boardId: number) => (state: RootState) =>
  state.boardState.boards.find((board) => board.id === boardId);

export const boardReducer = slice.reducer;
