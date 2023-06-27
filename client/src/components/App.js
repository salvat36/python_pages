import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Collection from "./Collection";
import Login from "./Login";

function App() {
  return (
    <>
      <Login />
      <Navbar />
      <Switch>
        <Route exact path='/books/:id'>
          <Collection />
        </Route>
        <Route>
          <Home />
        </Route>
        {/* <Route>
          <Login />
        </Route> */}
      </Switch>
    </>
  )
}

export default App;
