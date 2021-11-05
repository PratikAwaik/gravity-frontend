import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import CreatePost from "./components/Forums/CreatePost";
import PrivateRoute from "./components/Auth/PrivateRoute";

import { setUserFromLocalStorageAction } from "./actions/currentUser";
import loadingIcon from "./images/loading-icon.gif";
import CreateSubreddit from "./components/Subreddit/CreateSubreddit";
import { currentUserDetailsDispatcher } from "./dispatchers/user";
import { getAllSubredditsDispatcher } from "./dispatchers/subreddit";

const Home = React.lazy(() => import("./components/Forums/Home"));
const PostDetail = React.lazy(() => import("./components/Forums/PostDetail"));
const UserProfile = React.lazy(() => import("./components/User/UserProfile"));
const SubredditProfile = React.lazy(() =>
  import("./components/Subreddit/SubredditProfile")
);

const loadingElement = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <img src={loadingIcon} alt="Red Loading Gear Icon" />
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    dispatch(setUserFromLocalStorageAction());
    getAllSubredditsDispatcher(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (currentUser.id) currentUserDetailsDispatcher(dispatch);
  }, [dispatch, currentUser.id]);

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

            <PrivateRoute exact path="/r/create">
              <CreateSubreddit />
            </PrivateRoute>

            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/forums/:id">
              <PostDetail />
            </Route>

            <Route exact path="/user/:id">
              <UserProfile />
            </Route>

            <Route exact path="/r/:id">
              <SubredditProfile />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </React.Suspense>
  );
}

export default App;
