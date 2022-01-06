import { createSlice } from "@reduxjs/toolkit";
import { Column as innerColumn } from "src/features/column/column.g";
import { Column as OuterColumn } from "src/features/board/board.api";
import { RootState } from "src/utils/redux/root";
import { getBoardThunk } from "src/features/board/board.slice";

interface ColumnState {
  columns: innerColumn[];
}

const initialState: ColumnState = {
  columns: [],
};

const convertColumnToInnerType = (outerColumn: OuterColumn): innerColumn => {
  return {
    id: outerColumn.id,
    title: outerColumn.title,
    boardId: outerColumn.boardId,
    headCardId: outerColumn.headCardId,
  };
};

export const slice = createSlice({
  name: "column",
  initialState,
  reducers: {
    addColumn: (state, action) => {
      const newItem = {
        id: Math.floor(100000 + Math.random() * 900000),
        title: action.payload,
        boardId: 0,
      };
      state.columns.push(newItem);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardThunk.fulfilled, (state, action) => {
      const columns = action.payload?.data?.columns;
      if (columns) {
        state.columns = columns.map((column) =>
          convertColumnToInnerType(column)
        );
      }
    });
    builder.addCase(getBoardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

// Selectors
export const selectColumnsByBoardId = (boardId: number) => (state: RootState) =>
  state.columnState.columns.filter((column) => column.boardId === boardId);

// Reducer & Actions
export const { addColumn } = slice.actions;
export const columnReducer = slice.reducer;
