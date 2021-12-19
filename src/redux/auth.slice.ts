import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/redux/root";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import { createBoardThunk } from "src/redux/board.slice";
import { getUser, postUser } from "src/api/drello-api/user";
import { getBoard, postBoard } from "src/api/drello-api/board";
import { path } from "src/utils/url/drello-api";

interface AuthState {
  idToken: string | null;
}

const initialState: AuthState = {
  idToken: null,
};

export const signin = createAsyncThunk("auth/signUp", async () => {
  const userCred = await signInWithPopup(getAuth(), new GoogleAuthProvider());
  const oAuthCred = GoogleAuthProvider.credentialFromResult(userCred);
  if (!oAuthCred || !oAuthCred.idToken) {
    throw "Coudn't find valid ID token";
  }
  const { idToken } = oAuthCred;

  const { data: currentUser } = await getUser({ idToken });
  if (currentUser) {
    return currentUser;
  } else {
    const { data: board } = await postBoard({
      idToken,
      title: userCred.user.displayName || "",
    });
    const { data: createdUser } = await postUser({
      idToken,
      boardId: board.id,
    });
    return createdUser;
  }
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
