import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card as InnerCard } from "src/features/card/card.g";
import { Card as OuterCard } from "src/features/board/board.api";
import { RootState } from "src/utils/redux/root";
import { getBoardThunk } from "src/features/board/board.slice";
import { postCard } from "./card.api";

interface CardState {
  cardsByColumnId: { [columnId: number]: InnerCard[] | undefined };
}

const initialState: CardState = {
  cardsByColumnId: {},
};

const INITIAL_POSITION = 16384;

const convertCardToInnerType = (outerCard: OuterCard): InnerCard => {
  console.log("outerCard", outerCard);
  return {
    id: outerCard.id,
    title: outerCard.title,
    columnId: outerCard.columnId,
    position: outerCard.position,
  };
};

export const postCardThunk = createAsyncThunk(
  "card/postCardThunk",
  async (
    { title, columnId }: { title: string; columnId: number },
    { getState }
  ) => {
    const idToken = (getState() as RootState).authState.idToken;
    if (!idToken) throw new Error("Need IdToken");
    const cards = (getState() as RootState).cardState.cardsByColumnId[columnId];

    let position: number;
    if (cards && cards.length > 0) {
      console.log("/2", cards[0].position);
      position = cards[0].position / 2;
    } else {
      position = INITIAL_POSITION;
    }
    console.log("positin", position);
    const newCard = {
      title,
      columnId,
      position,
    };

    return (await postCard({ idToken, ...newCard })).data;
  }
);

export const slice = createSlice({
  name: "card",
  initialState,
  reducers: {
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
        const targetCardList = [
          ...(state.cardsByColumnId[startColumnId] || []),
        ];
        const [targetCard] = targetCardList.splice(startIndex, 1);
        targetCardList.splice(endIndex, 0, targetCard);

        const updateLinkedListPointers = () => {
          const nextSourseCardId = targetCardList[startIndex + 1]?.id || null;

          if (startIndex > 0) {
            // There is a previous card. Need to update next ID of previous card.
            const prevSourseCard = targetCardList[startIndex - 1];
            // prevSourseCard.nextCardId = nextSourseCardId;
          } else {
            // There is no previous card. Need to update head's card ID of target column.
            // [TODO]: Update headerCardId of column state
          }

          const nextDestCardId = targetCardList[endIndex + 1]?.id || null;
          // targetCard.nextCardId = nextDestCardId;
        };
        updateLinkedListPointers();

        checkCardIds(targetCard.id, targetCardId);

        // [TODO]: Hit APIs to update data in database

        state.cardsByColumnId[startColumnId] = targetCardList;
        return state;
      } else {
        // Reorder cards across different columns.
        const sourceCardList = [
          ...(state.cardsByColumnId[startColumnId] || []),
        ];
        const [targetCard] = sourceCardList.splice(startIndex, 1);
        const destCardList = [...(state.cardsByColumnId[endColumnId] || [])];
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
        state.cardsByColumnId = {};
        return state;
      }

      const cardMap = new Map<number, InnerCard[]>();
      const cardsByColumnId: { [columnId: number]: InnerCard[] | undefined } =
        {};
      cards
        .map((card) => convertCardToInnerType(card))
        .forEach((card) => {
          const cardList = cardMap.get(card.columnId) || [];
          cardList.push(card);
          cardMap.set(card.columnId, cardList);
        });
      cardMap.forEach((cardList, columnId) => {
        cardList.sort((a, b) => a.position - b.position);
        cardsByColumnId[columnId] = cardList;
      });

      state.cardsByColumnId = cardsByColumnId;
    });
    builder.addCase(getBoardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(postCardThunk.fulfilled, (state, action) => {
      const card = action.payload;
      if (state.cardsByColumnId[card.columnId]) {
        state.cardsByColumnId[card.columnId]?.unshift(card);
      } else {
        state.cardsByColumnId[card.columnId] = [card];
      }
    });
    builder.addCase(postCardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

// Selectors
export const selectCardsByColumnId = (columnId: number) => (state: RootState) =>
  state.cardState.cardsByColumnId[columnId];

// Reducer & Actions
export const { moveCards } = slice.actions;
export const cardReducer = slice.reducer;
