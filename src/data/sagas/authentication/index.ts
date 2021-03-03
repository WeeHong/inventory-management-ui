import { SESSION_KEYS } from "../../../constants";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { actions, types } from "../../actions/authentication";
import { ServiceTypes } from "../../../services/types";

type RequiredServices = Pick<ServiceTypes, "Authentication">;

function login(services: RequiredServices) {
  return function* (action: any) {
    try {
      const response = yield call(services.Authentication.login, action.credentials);
      const { data, message } = response.data;
      const token = data.token;
      if (!token) throw new Error("error");
      try {
        sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, token);
        yield put(
          actions.loginSuccess({
            fetching: true,
            auth: false,
            message: message,
            error: false,
          })
        );
        yield delay(500);
        yield put(
          actions.loginSuccess({
            fetching: false,
            auth: true,
            message: "",
            error: false,
          })
        );
      } catch (err) {
        yield put(
          actions.loginFailure({
            error: true,
            error_message: "Sorry, you do not have access privileges.",
          })
        );
      }
    } catch (e) {
      yield put(
        actions.loginFailure({
          error: true,
          error_message: "Your credential is incorrect.",
        })
      );
    }
  };
}

export default (services: RequiredServices) => [takeLatest(types.LOGIN_REQUEST, login(services))];
