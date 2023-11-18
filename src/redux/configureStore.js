import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import user from "./modules/user";
import comment from "./modules/comment";
import post from "./modules/post";
import image from "./modules/image";
import mypage from "./modules/mypage";
import detail from "./modules/detail";
import like from "./modules/like";

const rootReducer = combineReducers({
  user: user,
  comment: comment,
  post: post,
  image: image,
  mypage: mypage,
  detail: detail,
  like: like,
});

const middlewares = [thunk];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
