import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Card, OuterCard } from "src/features/card/card.g";
import { RootState } from "src/utils/redux/root";
import { getBoardThunk } from "src/features/board/board.slice";
import { postCard, updateCard } from "./card.api";
import { calcPositionOnCreate, updatePositions } from "../position";

export interface CardState {
  cardsByColumn: { [columnId: number]: Card[] | undefined };
}

const initialState: CardState = {
  cardsByColumn: {},
};

const convertCardToInnerType = (outerCard: OuterCard): Card => {
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

const relocateCards = ({
  cardsByColumn,
  sourceIndex,
  destIndex,
  sourceColumnId,
  destColumnId,
}: {
  cardsByColumn: CardState["cardsByColumn"];
  sourceIndex: number;
  destIndex: number;
  sourceColumnId: number;
  destColumnId: number;
}) => {
  let sourceCardList = cardsByColumn[sourceColumnId];
  let destCardList = cardsByColumn[destColumnId] || [];

  if (!sourceCardList) {
    throw new Error(
      `No source card list is found by the provided coulmn IDs: ${sourceColumnId}`
    );
  }

  sourceCardList = [...sourceCardList];
  // If the target card is moved to the same column,
  // the cardList of the destination will be same as the source one.
  destCardList =
    sourceColumnId === destColumnId ? sourceCardList : [...destCardList];

  const [targetCard] = sourceCardList.splice(sourceIndex, 1);
  destCardList.splice(destIndex, 0, targetCard);

  return { targetCard, sourceCardList, destCardList };
};

export const moveCardThunk = createAsyncThunk(
  "card/moveCardThunk",
  async (
    {
      sourceIndex,
      destIndex,
      sourceColumnId,
      destColumnId,
    }: {
      sourceIndex: number;
      destIndex: number;
      sourceColumnId: number;
      destColumnId: number;
    },
    { getState }
  ) => {
    const idToken = (getState() as RootState).authState.idToken;
    if (!idToken) throw new Error("Need IdToken");
    const cardsByColumn = (getState() as RootState).cardState.cardsByColumn;

    const { targetCard, sourceCardList, destCardList } = relocateCards({
      cardsByColumn,
      sourceColumnId,
      sourceIndex,
      destColumnId,
      destIndex,
    });

    const { position } = updatePositions({
      index: destIndex,
      list: destCardList,
    });

    updateCard({
      id: targetCard.id,
      title: targetCard.title,
      columnId: destColumnId,
      position,
      idToken,
    });

    destCardList[destIndex] = { ...destCardList[destIndex], position };
    return {
      sourceColumnId,
      sourceCardList,
      destColumnId,
      destCardList,
    };
  }
);

const sortCardsOnFetch = (cards: Card[]) => {
  const cardMap = new Map<number, Card[]>();
  const cardsByColumn: CardState["cardsByColumn"] = {};

  cards.forEach((card) => {
    const cardList = cardMap.get(card.columnId) || [];
    cardList.push(card);
    cardMap.set(card.columnId, cardList);
  });

  cardMap.forEach((cardList, columnId) => {
    cardList.sort((a, b) => a.position - b.position);
    cardsByColumn[columnId] = cardList;
  });

  return cardsByColumn;
};

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

      state.cardsByColumn = sortCardsOnFetch(
        cards.map((card) => convertCardToInnerType(card))
      );
    });
    builder.addCase(getBoardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(postCardThunk.fulfilled, (state, action) => {
      const card = action.payload;

      if (state.cardsByColumn[card.columnId]) {
        state.cardsByColumn[card.columnId]?.push(card);
      } else {
        state.cardsByColumn[card.columnId] = [card];
      }
    });
    builder.addCase(postCardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(moveCardThunk.fulfilled, (state, action) => {
      const { sourceCardList, sourceColumnId, destCardList, destColumnId } =
        action.payload;

      if (sourceColumnId === destColumnId) {
        state.cardsByColumn[destColumnId] = destCardList;
      } else {
        state.cardsByColumn[sourceColumnId] = sourceCardList;
        state.cardsByColumn[destColumnId] = destCardList;
      }
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
