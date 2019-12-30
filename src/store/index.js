import { createStore, applyMiddleware } from "redux";

import reducers from "../reducers";
import apiMiddleware from "../reducers/apiMiddleware";
// import { createLogger } from "redux-logger";

// const logger = createLogger();

const store = createStore(reducers, applyMiddleware(apiMiddleware));
export default store;
