import React, { useEffect, useState } from 'react';
import { Switch, Route, useParams, useHistory } from 'react-router-dom';
import Navbar from './NavBar';
import AllBooks from './AllBooks';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Authentication from './Authentication';
import Book from './BookCard';
import Header from './Header'
import '../App.css';

function App() {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const history = useHistory()
  const [books, setBooks] = useState([])

  const updateUser = () => { 
    setUser(current => !current)
  }

  const toggleIsLoggedIn = () => {
    setIsLoggedIn(isLoggedIn => !isLoggedIn)
  }

  
  
  // Get all Books
  useEffect(()=>{
    fetch('/books')
    .then(res => res.json())
    .then(setBooks)
    .catch(err => console.log(err))
  }, [])
  


  
  useEffect(()=> {
    const fetchUser = () => {
      fetch('/authenticate', {method: 'POST'})
      .then((res) => {
        if (res.ok) {
          res.json()
      .then(updateUser(res));
        } else {
          setUser(null);
        }
      })
    }
    fetchUser()
  }, [])
  
  
  function handleLogoutClick() {
    fetch('/logout', {method: 'DELETE'})
    .then((res) => {
      if (res.ok) {
        updateUser(null)
        history.push('/authentication')
      }
    });
  }
  
  function handleLoginClick() {
    setIsLoggedIn(current => !isLoggedIn)
  }



if (!user)  {
  return (
    <>
      <Navbar/>
      <Authentication updateUser={updateUser}/>
    </>
  );
}


  return (
    <>
    <Header handleLogoutClick={handleLogoutClick} user={user}/>
      {/* <Navbar handleLogoutClick={handleLogoutClick} handleLoginClick={handleLoginClick} user={user}/> */}
      <Switch>
        <Route exact path='/books'>
          <AllBooks />
        </Route>
      </Switch>
    </>
  )
}

export default App;
