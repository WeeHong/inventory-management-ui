import { all } from "redux-saga/effects";

import authenticationSagas from "./authentication";

import { ServiceTypes } from "../../services/types";

export default function* rootSaga(services: ServiceTypes) {
  const allSagas = [...authenticationSagas({ Authentication: services.Authentication })];
  yield all(allSagas);
}
