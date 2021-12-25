import { createSlice } from "@reduxjs/toolkit";
import { Card as innerCard } from "src/types/card.g";
import { Card as OuterCard } from "src/features/board/board.api";
import { RootState } from "src/redux/root";
import { getBoardThunk } from "src/features/board/board.slice";

interface CardState {
  cards: innerCard[];
}

const initialState: CardState = {
  cards: [],
};

const convertCardToInnerType = (ob: OuterCard): innerCard => {
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
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardThunk.fulfilled, (state, action) => {
      const data = action.payload?.data;
      if (data) {
        data.cards
          ? (state.cards = data.cards.map((card) =>
              convertCardToInnerType(card)
            ))
          : (state.cards = []);
      }
    });
    builder.addCase(getBoardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

export const selectCards = (state: RootState) => state.cardState.cards;
export const { addCard } = slice.actions;

export const cardReducer = slice.reducer;
