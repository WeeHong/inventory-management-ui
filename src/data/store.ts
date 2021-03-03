import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer, { State } from "./reducers";
import { ServiceTypes } from "../services/types";

import rootSaga from "./sagas";

export default function configureStore(services: ServiceTypes, initialState?: Partial<State>) {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga, services);
  return store;
}
