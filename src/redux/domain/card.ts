import { createSlice } from "@reduxjs/toolkit";
import { Card as innerCard } from "src/types/card.g";
import { Card as OuterCard } from "src/api/drello-api/board";
import { RootState } from "src/redux/root";
import { getBoardsThunk } from "src/redux/domain/board";

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
    builder.addCase(getBoardsThunk.fulfilled, (state, action) => {
      const board = action.payload;
      board[0].cards ? (state.cards = board[0].cards) : (state.cards = []);
    });
    builder.addCase(getBoardsThunk.rejected, (state, action) => {
      // handle errors if needed.
    });
  },
});

/**
 * selectCards returns cards list from CardState of redux store.
 * This kind of functions that select proper data and return them are called `selector`.
 * Selector is often used when you want to access redux store's data from a component file,
 * so you can reuse the code to access them in many components.
 */
export const selectCards = (state: RootState) => state.cardState.cards;
export const { addCard } = slice.actions;

export const cardReducer = slice.reducer;
