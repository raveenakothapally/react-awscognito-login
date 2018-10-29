import { createStore, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import { routerReducer, routerMiddleware } from "react-router-redux";
import sequenceAction from "redux-sequence-action";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
import thunk from "redux-thunk";
import io from "socket.io-client";
import createSocketIoMiddleware from "redux-socket.io";
import backendFrameworkMiddleware from "./middlewares/backend-framework.client";
import authMiddleware from "./middlewares/auth";
import reducers from "./ducks";

const persistConfig = {
  key: "root",
  storage
};

const combineReducer = {
  ...reducers,
  router: routerReducer
};

const persistCombineReducer = persistCombineReducers(
  persistConfig,
  combineReducer
);

export const history = createBrowserHistory();

const socket = io();

const middlewares = [
  routerMiddleware(history),
  sequenceAction,
  backendFrameworkMiddleware,
  authMiddleware,
  createSocketIoMiddleware(socket, "server://"),
  thunk
];

const store = createStore(
  persistCombineReducer,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);

export default store;
