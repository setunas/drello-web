import { createSlice } from "@reduxjs/toolkit";
import { Column as innerColumn } from "src/types/inner/column.g";
import { Column as OuterColumn } from "src/api/drello-api/board";
import { RootState } from "src/redux/root";
import { getBoardsThunk } from "src/redux/domain/board";

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
    builder.addCase(getBoardsThunk.fulfilled, (state, action) => {
      state.columns = action.payload;
    });
    builder.addCase(getBoardsThunk.rejected, (state, action) => {
      // handle errors if needed.
    });
  },
});

/**
 * selectColumns returns columns list from ColumnState of redux store.
 * This kind of functions that select proper data and return them are called `selector`.
 * Selector is often used when you want to access redux store's data from a component file,
 * so you can reuse the code to access them in many components.
 */
export const selectColumns = (state: RootState) => state.columnState.columns;
export const { addColumn } = slice.actions;

export const columnReducer = slice.reducer;
