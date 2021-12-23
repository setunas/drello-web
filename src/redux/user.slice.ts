import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/redux/root";
import { signin } from "src/redux/auth.slice";
import { getUser, postUser } from "src/api/drello-api/user";
import { getBoard, postBoard } from "src/api/drello-api/board";
import { path } from "src/utils/url/drello-api";

interface UserState {
  currentUser: object | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      state.currentUser = action.payload.currentUser;
    });
  },
});

export const selectCurrentUser = () => (state: RootState) =>
  state.userState.currentUser;

export const { resetUser } = slice.actions;
export const userReducer = slice.reducer;
