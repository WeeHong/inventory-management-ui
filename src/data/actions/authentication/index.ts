import { AuthState } from "../../reducers/authentication";

export const types = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
};

export const actions = {
  loginRequest: (credentials: { email: string; password: string }) => ({
    type: types.LOGIN_REQUEST,
    credentials,
  }),
  loginSuccess: ({
    fetching,
    auth,
    message,
    error,
  }: Pick<AuthState, "fetching" | "auth" | "message" | "error">) => ({
    type: types.LOGIN_SUCCESS,
    fetching,
    auth,
    message,
    error,
  }),
  loginFailure: ({ error, error_message }: Pick<AuthState, "error" | "error_message">) => ({
    type: types.LOGIN_FAILURE,
    error,
    error_message,
  }),
};
