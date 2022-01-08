import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getIdTokenAndCurrentUser,
  resetAuth,
  selectIdToken,
} from "src/features/auth/auth.slice";
import { path } from "src/utils/url/drello-web";
import {
  resetCurrentUser,
  selectCurrentUser,
} from "src/features/user/user.slice";
import { AppThunkDispatch } from "src/utils/redux/store";

/**
 * `useAuth` checks current auth state and does proper things when the state is changed.
 *
 * When user is signed in, `useAuth` will get auth data and store it in redux store and return it to the
 * component where `useAuth` is used.
 *
 * When user is signed out, `useAuth` will clean up stored data and redirect to a proper page.
 */
export const useAuth = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const idToken = useSelector(selectIdToken());
  const currentUser = useSelector(selectCurrentUser());

  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        // When user is signed in
        dispatch(getIdTokenAndCurrentUser(user));
      } else {
        // When user is signed out
        dispatch(resetAuth());
        dispatch(resetCurrentUser());
        if (
          typeof window !== "undefined" && // Client-side only
          window.location.pathname !== path.signin() // Unless user is already at signin page
        ) {
          window.location.href = path.signin();
          window.alert("Please signin.");
        }
      }
    });
  }, []);

  return { idToken, currentUser };
};
