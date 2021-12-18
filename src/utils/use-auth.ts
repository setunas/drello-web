import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { updateAuthedUser, resetAuth } from "src/redux/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [idToken, setIdToken] = useState<string>("");

  onAuthStateChanged(getAuth(), async (user) => {
    if (user) {
      // User is signed in
      dispatch(updateAuthedUser(user));
      setIdToken(await user.getIdToken());
    } else {
      // User is signed out
      dispatch(resetAuth());
    }
  });

  return { idToken };
};
