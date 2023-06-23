import React, { useEffect, useState } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Collection from "./Collection";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function App() {

  const [books, setBooks] = useState([])
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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
    fetch(`/books/${bookId}`)
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

  function handleLoginClick() {
    setIsLoggedIn(current => !isLoggedIn)
  }



// if (!user) {
//   return isLoggedIn ? <LoginForm onLogin={setUser} handleLoginClick={handleLoginClick} /> : <SignupForm onSignup={setUser} handleLoginClick={handleLoginClick}/>
// }


  return (
    <>
      <Navbar handleLogoutClick={handleLogoutClick} handleLoginClick={handleLoginClick}/>
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
