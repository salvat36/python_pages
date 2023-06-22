import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Collection from "./Collection";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/books/:id'>
          <Collection/>
        </Route>
        <Route>
          <Home/>
        </Route>
      </Switch>
    </>
  )
}

export default App;
