import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/books/:id'>
          <Books/>
        </Route>
        <Route>
        </Route>
      </Switch>
    </>
  )
}

export default App;
