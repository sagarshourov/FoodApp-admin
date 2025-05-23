import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import setAuthToken from "./utils/setAuthToken";
import axios from "axios";
import { I18nextProvider } from "react-i18next";
import 'sanitize.css/sanitize.css';
import i18n from "./i18n";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
const accessToken = `Bearer ${
  JSON.parse(localStorage.getItem("headers")) &&
  JSON.parse(localStorage.getItem("headers")).data.token
}`;

function noop() {}

if (process.env.NODE_ENV !== "development") {
  console.log = noop;
  console.warn = noop;
  console.error = noop;
}

noop();

setAuthToken(accessToken);

ReactDOM.render(
  <I18nextProvider i18n={i18n}>

    <App />
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
