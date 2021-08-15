import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./pages/dashBoard/DashBoard";

import PrivateRoute from "./common/PrivateRoute";
import { Provider } from "react-redux";
import Login from "./components/Login/Login";
import store from "./store";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./styles/theme/ThemeProvider";
import { setCurrentUser } from "./actions/authActions";

if (localStorage.headers) {
  store.dispatch(setCurrentUser(localStorage.headers));
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <HelmetProvider>
          <Router>
            <Route exact path="/" component={Login}></Route>
            <PrivateRoute
              exact
              path="/db/:url"
              component={Dashboard}
            ></PrivateRoute>
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
