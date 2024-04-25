import {
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./AuthSlice";

export const checkingAuthentication = (email, password) => {
  return async dispatch => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async dispatch => {
    dispatch(checkingCredentials());

    const results = await signInWithGoogle();
    if (!results.ok) return dispatch(logout(results.errorMessage));
    dispatch(login(results));
  };
};

export const startCreatingUserEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async dispatch => {
    dispatch(checkingCredentials());

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        password,
        displayName,
      });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, email, displayName, photoURL }));
  };
};
