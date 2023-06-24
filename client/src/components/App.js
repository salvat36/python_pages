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
import UserBooks from './UserBooks';
import BookDetails from './BookDetails';

function App() {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const history = useHistory()
  const [books, setBooks] = useState([])

  const updateUser = (user) => { 
    setUser(user)
  }

  const addUserBook = (book) => {
    setUser(currentUser => (
      {...currentUser, 
        user_books: [
          ...currentUser.user_books,
              {
                book
              }
      ]}
    ))  
  }

  const removeUserBook = (book) => {
    setUser(currentUser => (
      {...currentUser, 
        user_books: currentUser.user_books.filter((userBook) => userBook.book.id !== book.id)}
    ))  
  }




  
  useEffect(()=> {
    const fetchUser = () => {
      fetch('/authenticate')
      .then((res) => {
        if (res.ok) {
          res.json()
      .then(updateUser);
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
      <Switch>
        <Route exact path='/books'>
          <AllBooks />
        </Route>
        <Route exact path='/user-books'>
          <UserBooks user={user} books={books} />
        </Route>
        <Route exact path='/books/:id'>
          <BookDetails user={user} addUserBook={addUserBook} removeUserBook={removeUserBook}/>
        </Route>
      </Switch>
    </>
  )
}

export default App;
