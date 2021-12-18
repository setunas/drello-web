import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/redux/root";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";

interface AuthState {
  idToken: string | null;
}

const initialState: AuthState = {
  idToken: null,
};

export const signin = createAsyncThunk("auth/signUp", async () => {
  return await signInWithPopup(getAuth(), new GoogleAuthProvider());
});

export const updateAuthedUser = createAsyncThunk(
  "auth/updateAuthedUser",
  async (user: User) => {
    return await user.getIdToken();
  }
);

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      const cred = GoogleAuthProvider.credentialFromResult(action.payload);
      state.idToken = cred?.idToken || null;
    });
    builder.addCase(signin.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(updateAuthedUser.fulfilled, (state, action) => {
      state.idToken = action.payload;
    });
    builder.addCase(updateAuthedUser.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

export const selectIdToken = () => (state: RootState) =>
  state.authState.idToken;

export const { resetAuth } = slice.actions;
export const authReducer = slice.reducer;
