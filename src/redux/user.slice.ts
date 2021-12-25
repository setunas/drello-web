import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/redux/root";
import { signin, signout } from "src/redux/auth.slice";
import { getUser } from "src/features/user/user.api";
import { User } from "src/types/user.g";

interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const getCurrentUserByIdToken = createAsyncThunk(
  "user/getCurrentUserByIdToken",
  async (idToken: string) => {
    return await getUser({ idToken });
  }
);

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserByIdToken.fulfilled, (state, action) => {
      state.currentUser = action.payload.data;
    });
    builder.addCase(getCurrentUserByIdToken.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.currentUser = action.payload.currentUser;
    });
    builder.addCase(signout.fulfilled, (state, action) => {
      state.currentUser = null;
    });
  },
});

export const selectCurrentUser = () => (state: RootState) =>
  state.userState.currentUser;

export const { resetCurrentUser } = slice.actions;
export const userReducer = slice.reducer;
