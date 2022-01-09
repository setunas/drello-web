import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Column, OuterColumn } from "src/features/column/column.g";
import { RootState } from "src/utils/redux/root";
import { getBoardThunk } from "src/features/board/board.slice";
import { postColumn, updateColumn } from "./column.api";
import { calcPositionOnCreate, updatePositions } from "../position";

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

    const newColumn = {
      title,
      boardId,
      position,
    };

    return (await postColumn({ idToken, ...newColumn })).data;
  }
);

const relocateColumns = ({
  columnList,
  sourceIndex,
  destIndex,
}: {
  columnList: Column[];
  sourceIndex: number;
  destIndex: number;
}) => {
  const _columnList = [...columnList];
  const [targetColumn] = _columnList.splice(sourceIndex, 1);
  _columnList.splice(destIndex, 0, targetColumn);

  return { targetColumn, relocatedList: _columnList };
};

export const moveColumnThunk = createAsyncThunk(
  "column/moveColumnThunk",
  async (
    {
      boardId,
      sourceIndex,
      destIndex,
    }: {
      boardId: number;
      sourceIndex: number;
      destIndex: number;
    },
    { getState }
  ) => {
    const idToken = (getState() as RootState).authState.idToken;
    if (!idToken) throw new Error("Need IdToken");
    const columnList = (getState() as RootState).columnState.columns;

    const { targetColumn, relocatedList } = relocateColumns({
      columnList,
      sourceIndex,
      destIndex,
    });

    const { position } = updatePositions({
      destIndex,
      destCardList: relocatedList,
    });

    updateColumn({
      id: targetColumn.id,
      title: targetColumn.title,
      boardId: boardId,
      position,
      idToken,
    });

    relocatedList[destIndex] = { ...relocatedList[destIndex], position };
    return relocatedList;
  }
);

export const slice = createSlice({
  name: "column",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoardThunk.fulfilled, (state, action) => {
      const columns = action.payload?.data?.columns;

      if (columns) {
        state.columns = columns
          .map((column) => convertColumnToInnerType(column))
          .sort((a, b) => a.position - b.position);
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
    builder.addCase(moveColumnThunk.fulfilled, (state, action) => {
      state.columns = action.payload;
    });
    builder.addCase(moveColumnThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

// Selectors
export const selectColumnsByBoardId = (boardId: number) => (state: RootState) =>
  state.columnState.columns.filter((column) => column.boardId === boardId);

// Reducer & Actions
export const columnReducer = slice.reducer;
