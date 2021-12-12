import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/redux/root";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

interface AuthState {
  firebaseIdToken: string | null;
  firebaseAccessToken: string | null;
}

const initialState: AuthState = {
  firebaseIdToken: null,
  firebaseAccessToken: null,
};

export const signUp = createAsyncThunk("auth/signUp", async () => {
  return await signInWithPopup(getAuth(), new GoogleAuthProvider());
});

export const getFirebaseIdToken = createAsyncThunk(
  "auth/getFirebaseIdToken",
  async () => {
    const idToken = await getAuth().currentUser?.getIdToken(true);
    // console.log("idToken", idToken);

    if (!idToken) {
      // window.location.replace("/signup");
      return null;
    }

    return idToken;
  }
);

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      const cred = GoogleAuthProvider.credentialFromResult(action.payload);
      state.firebaseIdToken = cred?.idToken || null;
      state.firebaseAccessToken = cred?.accessToken || null;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(getFirebaseIdToken.fulfilled, (state, action) => {
      state.firebaseIdToken = action.payload;
    });
    builder.addCase(getFirebaseIdToken.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

export const selectIdToken = () => (state: RootState) =>
  state.authState.firebaseIdToken;

export const authReducer = slice.reducer;
