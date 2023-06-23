import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Collection from "./Collection";
import Login from "./Login";

function App() {

  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(true)

  useEffect(()=> {
    fetch('/check_session')
    .then((res) => {
      if (res.ok) {
        res.json().then(setUser);
      } else {
        Error(res.status);
      }
      })
  }, []);

  function handleLogoutClick() {
    fetch('/logout', {method: 'DELETE'}).then((res) => {
      if (res.ok) {
        setUser(null);
      }
    });
  }



  // if (!user) return <Login onLogin={setUser} />;
  return (
    <>
      <Navbar handleLogoutClick={handleLogoutClick}/>
      <Login />
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
