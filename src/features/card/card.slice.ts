import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card as InnerCard } from "src/features/card/card.g";
import { Card as OuterCard } from "src/features/board/board.api";
import { RootState } from "src/utils/redux/root";
import { getBoardThunk } from "src/features/board/board.slice";
import { postCard, updateCard } from "./card.api";
import { calcPositionOnCreate, updatePositions } from "./position";

export interface CardState {
  cardsByColumn: { [columnId: number]: InnerCard[] | undefined };
}

const initialState: CardState = {
  cardsByColumn: {},
};

const convertCardToInnerType = (outerCard: OuterCard): InnerCard => {
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

    const cards = (getState() as RootState).cardState.cardsByColumn[columnId];

    const position = calcPositionOnCreate(cards || []);

    const newCard = {
      title,
      columnId,
      position,
    };

    return (await postCard({ idToken, ...newCard })).data;
  }
);

export const moveCardThunk = createAsyncThunk(
  "card/moveCardThunk",
  async (
    {
      startIndex,
      endIndex,
      startColumnId,
      endColumnId,
    }: {
      startIndex: number;
      endIndex: number;
      startColumnId: number;
      endColumnId: number;
    },
    { getState }
  ) => {
    const idToken = (getState() as RootState).authState.idToken;
    if (!idToken) throw new Error("Need IdToken");

    const cardsByColumn = (getState() as RootState).cardState.cardsByColumn;

    const relocateCards = () => {
      let sourceCards = cardsByColumn[startColumnId];
      let destCards = cardsByColumn[endColumnId] || [];

      if (!sourceCards) {
        throw new Error(
          `No source card list is found by the provided coulmn IDs: ${startColumnId}`
        );
      }

      sourceCards = [...sourceCards];
      destCards = startColumnId === endColumnId ? sourceCards : [...destCards];

      const [targetCard] = sourceCards.splice(startIndex, 1);
      destCards.splice(endIndex, 0, targetCard);

      return { targetCard, sourceCards, destCards };
    };

    const { targetCard, sourceCards, destCards } = relocateCards();
    const { position } = updatePositions({ endIndex, destCards });

    updateCard({
      id: targetCard.id,
      title: targetCard.title,
      columnId: endColumnId,
      position,
      idToken,
    });

    return {
      sourceColumnId: startColumnId,
      sourceCards,
      destColumnId: endColumnId,
      destCards,
    };
  }
);

export const slice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoardThunk.fulfilled, (state, action) => {
      const cards = action.payload?.data?.cards;
      if (!cards) {
        state.cardsByColumn = {};
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

      state.cardsByColumn = cardsByColumnId;
    });
    builder.addCase(getBoardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(postCardThunk.fulfilled, (state, action) => {
      const card = action.payload;
      if (state.cardsByColumn[card.columnId]) {
        state.cardsByColumn[card.columnId]?.unshift(card);
      } else {
        state.cardsByColumn[card.columnId] = [card];
      }
    });
    builder.addCase(postCardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(moveCardThunk.fulfilled, (state, action) => {
      const { sourceCards, sourceColumnId, destCards, destColumnId } =
        action.payload;
      state.cardsByColumn[sourceColumnId] = sourceCards;
      state.cardsByColumn[destColumnId] = destCards;
    });
    builder.addCase(moveCardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

// Selectors
export const selectCardsByColumn = () => (state: RootState) =>
  state.cardState.cardsByColumn;
export const selectCardsByColumnId = (columnId: number) => (state: RootState) =>
  state.cardState.cardsByColumn[columnId];

// Reducer & Actions
export const cardReducer = slice.reducer;
