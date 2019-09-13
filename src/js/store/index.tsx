import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

const loggerMiddleware = createLogger();

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

if (process.env.NODE_ENV !== "production") {
  store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
}

export default store;
