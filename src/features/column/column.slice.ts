import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Column, OuterColumn } from "src/features/column/column.g";
import { RootState } from "src/utils/redux/root";
import { getBoardThunk } from "src/features/board/board.slice";
import { postColumn } from "./column.api";
import { calcPositionOnCreate } from "../position";

interface ColumnState {
  columns: Column[];
}

const initialState: ColumnState = {
  columns: [],
};

const convertColumnToInnerType = (outerColumn: OuterColumn): Column => {
  return {
    id: outerColumn.id,
    title: outerColumn.title,
    position: outerColumn.position,
    boardId: outerColumn.boardId,
  };
};

export const postColumnThunk = createAsyncThunk(
  "card/postColumnThunk",
  async (
    { title, boardId }: { title: string; boardId: number },
    { getState }
  ) => {
    const idToken = (getState() as RootState).authState.idToken;
    if (!idToken) throw new Error("Need IdToken");

    const columns = (getState() as RootState).columnState.columns;

    const position = calcPositionOnCreate(columns || []);

    const newCard = {
      title,
      boardId,
      position,
    };

    return (await postColumn({ idToken, ...newCard })).data;
  }
);

export const slice = createSlice({
  name: "column",
  initialState,
  reducers: {
    reorderColumns: (
      state,
      action: PayloadAction<{
        sourceIndex: number;
        destIndex: number;
      }>
    ) => {
      const { sourceIndex, destIndex } = action.payload;

      const columnList = [...state.columns];
      const [targetColumn] = columnList.splice(sourceIndex, 1);
      columnList.splice(destIndex, 0, targetColumn);

      state.columns = columnList;
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
    builder.addCase(postColumnThunk.fulfilled, (state, action) => {
      const column = action.payload;

      if (state.columns) {
        state.columns?.push(column);
      } else {
        state.columns = [column];
      }
    });
    builder.addCase(postColumnThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

// Selectors
export const selectColumnsByBoardId = (boardId: number) => (state: RootState) =>
  state.columnState.columns.filter((column) => column.boardId === boardId);

// Reducer & Actions
export const { reorderColumns } = slice.actions;
export const columnReducer = slice.reducer;
