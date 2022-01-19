import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/utils/redux/root";

interface SigninButtonState {
  isLoading: boolean;
}

const initialState: SigninButtonState = {
  isLoading: false,
};

export const slice = createSlice({
  name: "signinButton",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Selectors
export const selectIsLoading = () => (state: RootState) =>
  state.signinButtonState.isLoading;

// Reducer & Actions
export const { setIsLoading } = slice.actions;
export const signinButtonReducer = slice.reducer;
