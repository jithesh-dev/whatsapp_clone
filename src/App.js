import React, { useEffect, useState } from "react";

import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar.component";
import Chat from "./components/Chat/Chat.component";
import Login from "./pages/Login/Login.pages";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider/StateProvider";
import { auth } from "./firebase";
import { actionTypes } from "./reducer/reducer";
function App() {
  const [{ user }, dispatch] = useStateValue();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usr) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: usr,
      });
      setisLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("Is Loading", isLoading);
  }, [isLoading]);

  return (
    <div className="app">
      {!isLoading &&
        (!user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
        ))}
    </div>
  );
}

export default App;
