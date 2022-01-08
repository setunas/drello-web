import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Card as InnerCard } from "src/features/card/card.g";
import { Card as OuterCard } from "src/features/board/board.api";
import { RootState } from "src/utils/redux/root";
import { getBoardThunk } from "src/features/board/board.slice";
import { postCard, updateCard } from "./card.api";

interface CardState {
  cardsByColumnId: { [columnId: number]: InnerCard[] | undefined };
}

const initialState: CardState = {
  cardsByColumnId: {},
};

const INITIAL_POSITION = 16384;
const MIN_POSITION_GAP = 0.001;

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
    const cards = (getState() as RootState).cardState.cardsByColumnId[columnId];

    let position: number;
    if (cards && cards.length > 0) {
      position = cards[0].position / 2;
    } else {
      position = INITIAL_POSITION;
    }

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
    let sourceCards = (getState() as RootState).cardState.cardsByColumnId[
      startColumnId
    ];
    let destCards = (getState() as RootState).cardState.cardsByColumnId[
      endColumnId
    ];

    if (!sourceCards || !destCards) {
      throw new Error(
        `No card list is found by the provided coulmn IDs: ${startColumnId}, ${endColumnId}`
      );
    }

    sourceCards = [...sourceCards];
    destCards = startColumnId === endColumnId ? sourceCards : [...destCards];

    const [targetCard] = sourceCards.splice(startIndex, 1);

    destCards.splice(endIndex, 0, targetCard);

    const prevPos = destCards[endIndex - 1]?.position || 0;
    const nextPos = destCards[endIndex + 1]?.position || 0;

    if (
      prevPos >= Number.MAX_SAFE_INTEGER - INITIAL_POSITION ||
      nextPos >= Number.MAX_SAFE_INTEGER - INITIAL_POSITION ||
      Math.abs(nextPos - prevPos) < MIN_POSITION_GAP
    ) {
      // [TODO]: ↓↓↓↓
      console.log("Need relocate all cards' position in the column");
    }

    let position: number;
    if (nextPos) {
      position = (prevPos + nextPos) / 2;
    } else {
      position = prevPos + INITIAL_POSITION;
    }

    const idToken = (getState() as RootState).authState.idToken;
    if (!idToken) throw new Error("Need IdToken");

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
    builder.addCase(moveCardThunk.fulfilled, (state, action) => {
      const { sourceCards, sourceColumnId, destCards, destColumnId } =
        action.payload;
      state.cardsByColumnId[sourceColumnId] = sourceCards;
      state.cardsByColumnId[destColumnId] = destCards;
    });
    builder.addCase(moveCardThunk.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

// Selectors
export const selectCardsByColumnId = (columnId: number) => (state: RootState) =>
  state.cardState.cardsByColumnId[columnId];

// Reducer & Actions
export const cardReducer = slice.reducer;
