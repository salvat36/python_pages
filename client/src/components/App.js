import React, { useEffect, useState } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Collection from "./Collection";
import Login from "./Login";

function App() {

  const [books, setBooks] = useState([])
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(true)
  const [error, setError] = useState(null)
  const {bookId} = useParams()


  // Get all Books
  useEffect(()=>{
    fetch('/books')
    .then(res => res.json())
    .then(setBooks)
    .catch(err => console.log(err))
  }, [])

  // Get 1 book
  useEffect(()=>{
    fetch(`/book/${bookId}`)
    .then(res => {
      if (res.ok) {
        res.json().then(setBooks)
      } else {
        res.json().then(e => setError(e.message))
      }
  })
    .catch(console.error)
  },[bookId])




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
    fetch('/logout', {method: 'DELETE'})
    .then((res) => {
      if (res.ok) {
        setUser(null);
      }
    });
  }



  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <Navbar handleLogoutClick={handleLogoutClick}/>
      <Switch>
        <Route exact path='/books/:id'>
          <Collection />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </>
  )
}

export default App;
