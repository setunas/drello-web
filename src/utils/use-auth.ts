import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { updateAuthedUser, resetAuth } from "src/redux/auth.slice";
import { path } from "src/utils/url/drello-web";
import {
  getCurrentUserByIdToken,
  resetCurrentUser,
} from "src/redux/user.slice";
import { User } from "src/api/drello-api/user";
import { AppThunkDispatch } from "src/redux/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppThunkDispatch>();
  const [idToken, setIdToken] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        // When user is signed in
        dispatch(updateAuthedUser(user));
        const idToken = await user.getIdToken();
        const res = await dispatch(getCurrentUserByIdToken(idToken)).unwrap();
        setCurrentUser(res.data);
        setIdToken(idToken);
      } else {
        // When user is signed out
        dispatch(resetAuth());
        dispatch(resetCurrentUser());
        if (
          typeof window !== "undefined" && // Client-side only
          window.location.pathname !== path.signin() // Unless user is already at signin page
        ) {
          window.location.href = path.signin();
        }
      }
    });
  }, []);

  return { idToken, currentUser };
};
