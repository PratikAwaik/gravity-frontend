import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import CreatePost from "./components/Forums/CreatePost";
import PrivateRoute from "./components/Auth/PrivateRoute";

import { setUserFromLocalStorageAction } from "./actions/currentUser";
import loadingIcon from "./images/loading-icon.gif";

const Forums = React.lazy(() => import("./components/Forums/Forums"));
const PostDetail = React.lazy(() => import("./components/Forums/PostDetail"));

const loadingElement = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <img src={loadingIcon} alt="Red Loading Gear Icon" />
    </div>
  );
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserFromLocalStorageAction());
  }, [dispatch]);

  return (
    <React.Suspense fallback={loadingElement()}>
      <BrowserRouter>
        <div className="App mt-16">
          <Navbar />

          <Switch>
            <Route exact path="/register">
              <Register />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <PrivateRoute exact path="/forums/create">
              <CreatePost />
            </PrivateRoute>

            <Route exact path="/">
              <Forums />
            </Route>

            <PrivateRoute exact path="/forums/:id">
              <PostDetail />
            </PrivateRoute>
          </Switch>
        </div>
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
