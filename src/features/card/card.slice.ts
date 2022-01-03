import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card as InnerCard } from "src/features/card/card.g";
import { Card as OuterCard } from "src/features/board/board.api";
import { RootState } from "src/utils/redux/root";
import { getBoardThunk } from "src/features/board/board.slice";

interface CardState {
  cards: InnerCard[];
}

const initialState: CardState = {
  cards: [],
};

const convertCardToInnerType = (ob: OuterCard): InnerCard => {
  return {
    id: ob.id,
    title: ob.title,
    columnId: ob.columnId,
  };
};

export const slice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard: (state, action) => {
      const newItem = {
        id: Math.floor(100000 + Math.random() * 900000),
        title: action.payload.title,
        columnId: action.payload.columnId,
      };
      state.cards.push(newItem);
    },
    reorderCards: (
      state,
      action: PayloadAction<{
        cards: InnerCard[];
        startIndex: number;
        endIndex: number;
      }>
    ) => {
      const { cards, startIndex, endIndex } = action.payload;
      const newCardList = [...cards];
      const [removed] = newCardList.splice(startIndex, 1);
      newCardList.splice(endIndex, 0, removed);

      state.cards = newCardList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardThunk.fulfilled, (state, action) => {
      const cards = action.payload?.data?.cards;
      if (cards) {
        state.cards = cards.map((card) => convertCardToInnerType(card));
      } else {
        state.cards = [];
      }
    });
    builder.addCase(getBoardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

// Selectors
export const selectCards = () => (state: RootState) => state.cardState.cards;
export const selectCardsByColumnId = (columnId: number) => (state: RootState) =>
  state.cardState.cards.filter((card) => card.columnId === columnId);

// Reducer & Actions
export const { addCard, reorderCards } = slice.actions;
export const cardReducer = slice.reducer;
