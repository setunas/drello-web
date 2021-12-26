import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/utils/redux/root";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  signOut,
} from "firebase/auth";
import { getUser, postUser } from "src/features/user/user.api";
import { User as InnerUser } from "src/features/user/user.g";
import { getCurrentUserByIdToken } from "../user/user.slice";

interface AuthState {
  idToken: string | null;
}

const initialState: AuthState = {
  idToken: null,
};

export const signin = createAsyncThunk("auth/signin", async () => {
  const userCred = await signInWithPopup(getAuth(), new GoogleAuthProvider());
  const idToken = await userCred.user.getIdToken(true);

  let currentUser: InnerUser;
  try {
    const { data } = await getUser({ idToken });
    currentUser = data;
  } catch (err) {
    const { data } = await postUser({
      idToken,
      username: userCred.user.displayName || "",
    });
    currentUser = data;
  }

  return { currentUser, idToken };
});

export const getIdTokenAndCurrentUser = createAsyncThunk(
  "auth/getIdTokenAndCurrentUser",
  async (user: User, { dispatch }) => {
    const idToken = await user.getIdToken();
    await dispatch(getCurrentUserByIdToken(idToken));
    return idToken;
  }
);

export const signout = createAsyncThunk(
  "auth/signout",
  async (_, { dispatch }) => {
    await signOut(getAuth());
    dispatch(resetAuth());
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
      state.idToken = action.payload.idToken;
    });
    builder.addCase(signin.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(getIdTokenAndCurrentUser.fulfilled, (state, action) => {
      state.idToken = action.payload;
    });
    builder.addCase(getIdTokenAndCurrentUser.rejected, (state, action) => {
      console.error(action.error.message);
    });
    builder.addCase(signout.rejected, (state, action) => {
      console.error(action.error.message);
    });
  },
});

export const selectIdToken = () => (state: RootState) =>
  state.authState.idToken;

export const { resetAuth } = slice.actions;
export const authReducer = slice.reducer;
