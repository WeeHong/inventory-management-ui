import { types } from "../../actions/authentication";

export interface AuthState {
  fetching: boolean;
  auth: boolean;
  message: string;
  error: boolean;
  error_message: string;
}

export const initialState = {
  fetching: false,
  auth: false,
  message: "",
  error: false,
  error_message: "",
};

const authentication = (state = initialState, actions: any) => {
  switch (actions.type) {
    case types.LOGIN_REQUEST: {
      return {
        ...state,
        fetching: true,
        auth: false,
        error: false,
        logout: false,
      };
    }
    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        fetching: actions.fetching,
        auth: actions.auth,
        message: actions.message,
        error: false,
      };
    }
    case types.LOGIN_FAILURE: {
      return {
        ...state,
        fetching: false,
        auth: true,
        error: actions.error,
      };
    }
    default:
      return state;
  }
};

export default authentication;
