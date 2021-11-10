import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBoards } from "src/api/drello-api/board";
import { Board as innerBoard } from "src/types/board.g";
import { Board as OuterBoard } from "src/api/drello-api/board";
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

/**
 * getBoardsThunk call the function to hit the API to fetch Board list data.
 */
export const getBoardsThunk = createAsyncThunk(
  "board/getBoardsThunk",
  async () => {
    const res = await getBoards();
    return res.data.boards.map((b) => convertBoardToInnerType(b));
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
    builder.addCase(getBoardsThunk.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(getBoardsThunk.rejected, (state, action) => {
      // handle errors if needed.
    });
  },
});

/**
 * selectBoards returns boards list from BoardState of redux store.
 * This kind of functions that select proper data and return them are called `selector`.
 * Selector is often used when you want to access redux store's data from a component file,
 * so you can reuse the code to access them in many components.
 */
export const selectBoards = (state: RootState) => state.boardState.boards;

export const boardReducer = slice.reducer;
