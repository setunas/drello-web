import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card as InnerCard } from "src/features/card/card.g";
import { Card as OuterCard } from "src/features/board/board.api";
import { RootState } from "src/utils/redux/root";
import { getBoardThunk } from "src/features/board/board.slice";

interface CardState {
  cardsByColumnId: Record<number, InnerCard[]>;
}

const initialState: CardState = {
  cardsByColumnId: {},
};

const convertCardToInnerType = (outerCard: OuterCard): InnerCard => {
  return {
    id: outerCard.id,
    title: outerCard.title,
    columnId: outerCard.columnId,
    nextCardId: outerCard.nextCardId,
  };
};

export const slice = createSlice({
  name: "card",
  initialState,
  reducers: {
    // [TODO] Set proper type to action
    addCard: (state, action) => {
      const newItem = {
        id: Math.floor(100000 + Math.random() * 900000),
        title: action.payload.title,
        columnId: action.payload.columnId,
        nextCardId: action.payload.nextCardId,
      };
      state.cardsByColumnId[action.payload.columnId].push(newItem);
    },
    /**
     * This reducer is temporary implemented.
     * [TODO]: Use thunk later to connect to APIs
     */
    moveCards: (
      state,
      action: PayloadAction<{
        targetCardId: number;
        startIndex: number;
        endIndex: number;
        startColumnId: number;
        endColumnId: number;
      }>
    ) => {
      const { targetCardId, startIndex, endIndex, startColumnId, endColumnId } =
        action.payload;

      const checkCardIds = (
        manipulatedCardId: number,
        targetCardId: number
      ) => {
        if (manipulatedCardId !== targetCardId) {
          // Unexpected card is chosen
          window.alert("Failed moving the card. Please try again.");
          return state;
        }
      };

      if (startColumnId === endColumnId) {
        // Reorder cards in the same column.
        const targetCardList = [...state.cardsByColumnId[startColumnId]];
        const [targetCard] = targetCardList.splice(startIndex, 1);
        targetCardList.splice(endIndex, 0, targetCard);

        const updateLinkedListPointers = () => {
          const nextSourseCardId = targetCardList[startIndex + 1]?.id || null;

          if (startIndex > 0) {
            // There is a previous card. Need to update next ID of previous card.
            const prevSourseCard = targetCardList[startIndex - 1];
            prevSourseCard.nextCardId = nextSourseCardId;
          } else {
            // There is no previous card. Need to update head's card ID of target column.
            // [TODO]: Update headerCardId of column state
          }

          const nextDestCardId = targetCardList[endIndex + 1]?.id || null;
          targetCard.nextCardId = nextDestCardId;
        };
        updateLinkedListPointers();

        checkCardIds(targetCard.id, targetCardId);

        // [TODO]: Hit APIs to update data in database

        state.cardsByColumnId[startColumnId] = targetCardList;
        return state;
      } else {
        // Reorder cards across different columns.
        const sourceCardList = [...state.cardsByColumnId[startColumnId]];
        const [targetCard] = sourceCardList.splice(startIndex, 1);
        const destCardList = [...state.cardsByColumnId[endColumnId]];
        destCardList.splice(endIndex, 0, targetCard);

        // [TODO]: Enable to change nextCardId and headCardID then hit API to update data in database.

        checkCardIds(targetCard.id, targetCardId);

        state.cardsByColumnId[startColumnId] = sourceCardList;
        state.cardsByColumnId[endColumnId] = destCardList;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoardThunk.fulfilled, (state, action) => {
      const cards = action.payload?.data?.cards;
      if (!cards) {
        state.cardsByColumnId = [];
        return state;
      }

      const cardsByColumnId: Record<number, InnerCard[]> = {};
      cards
        .map((card) => convertCardToInnerType(card))
        .forEach((card) => {
          if (cardsByColumnId[card.columnId]) {
            cardsByColumnId[card.columnId].push(card);
          } else {
            cardsByColumnId[card.columnId] = [card];
          }
        });

      state.cardsByColumnId = cardsByColumnId;
    });
    builder.addCase(getBoardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

// Selectors
export const selectCardsByColumnId = (columnId: number) => (state: RootState) =>
  state.cardState.cardsByColumnId[columnId];

// Reducer & Actions
export const { addCard, moveCards } = slice.actions;
export const cardReducer = slice.reducer;
