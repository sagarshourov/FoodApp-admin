import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

import imageReducer from "./imageReducer";

import customerReducer from "./customerReducer";
import localizedMessageReducer from "./localizedMessageReducer";

import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";

import orderReducer from "./orderReducer";
import outlateReducer from "./outlateReducer";
import menuReducer from "./menuReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  image: imageReducer,
  customer: customerReducer,
  message: localizedMessageReducer,
  category: categoryReducer,
  menus: menuReducer,
  product: productReducer,
  order: orderReducer,
  outlate : outlateReducer
});
