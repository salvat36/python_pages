import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/books/:id'>
          <Books/>
        </Route>
        <Route>
          <Home/>
        </Route>
      </Switch>
    </>
  )
}

export default App;
