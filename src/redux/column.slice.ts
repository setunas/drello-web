import { createSlice } from "@reduxjs/toolkit";
import { Column as innerColumn } from "src/types/column.g";
import { Column as OuterColumn } from "src/features/board/board.api";
import { RootState } from "src/redux/root";
import { getBoardThunk } from "src/redux/board.slice";

interface ColumnState {
  columns: innerColumn[];
}

const initialState: ColumnState = {
  columns: [],
};

const convertColumnToInnerType = (ob: OuterColumn): innerColumn => {
  return {
    id: ob.id,
    title: ob.title,
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
      };
      state.columns.push(newItem);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardThunk.fulfilled, (state, action) => {
      const data = action.payload?.data;
      if (data) {
        state.columns = data.columns.map((column) =>
          convertColumnToInnerType(column)
        );
      }
    });
    builder.addCase(getBoardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

export const selectColumns = (state: RootState) => state.columnState.columns;
export const { addColumn } = slice.actions;

export const columnReducer = slice.reducer;
