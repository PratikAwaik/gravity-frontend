import React, { useEffect } from "react"; 
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Utils/Navbar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { useDispatch } from "react-redux";
import { setUserFromLocalStorageAction } from './actions/currentUser';
import Forums from "./components/Forums/Forums";
import CreatePost from "./components/Forums/CreatePost";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserFromLocalStorageAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App mt-16 mb-16">
        <Navbar />

        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/forums/create">
            <CreatePost />
          </Route>

          <Route exact path="/">
            <Forums />
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
