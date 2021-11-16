import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import CreatePost from "./components/Post/CreatePost";
import PrivateRoute from "./components/Auth/PrivateRoute";
import NotFound from "./components/Utils/NotFound";
import Home from "./components/Forums/Home";
import PostDetail from "./components/Post/PostDetail";
import UserProfile from "./components/User/UserProfile";
import SubredditProfile from "./components/Subreddit/SubredditProfile";

import { setUserFromLocalStorageAction } from "./actions/currentUser";
import CreateSubreddit from "./components/Subreddit/CreateSubreddit";
import { currentUserDetailsDispatcher } from "./dispatchers/currentUser";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    dispatch(setUserFromLocalStorageAction());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser.id) currentUserDetailsDispatcher(dispatch);
  }, [dispatch, currentUser.id]);

  return (
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

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
