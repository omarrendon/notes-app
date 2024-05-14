import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { clearNoteLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./AuthSlice";

export const checkingAuthentication = () => {
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

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async dispatch => {
    dispatch(checkingCredentials());

    const { ok, displayName, errorMessage, photoURL, uid } =
      await loginWithEmailPassword({ email, password });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, email, displayName, photoURL }));
  };
};

export const startLogout = () => {
  return async dispatch => {
    await logoutFirebase();
    dispatch(clearNoteLogout());
    dispatch(logout({}));
  };
};
