import { checkingCredentials } from "./AuthSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    console.log({ email, password });
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};
