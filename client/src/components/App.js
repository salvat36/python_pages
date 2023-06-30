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
import SearchBooks from './SearchBooks';

function App() {

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const history = useHistory()
  const [books, setBooks] = useState([])
  const {id} = useParams()

  const [searchBook, setSearchBook] = useState('')

  useEffect(()=>{
    fetch('/books')
    .then(res => res.json())
    .then(setBooks)
    .catch(err => console.log(err))
  }, [])
  
  const onSearch = (input) => {
    setSearchBook(input)
  }

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

  const removeUser = (user) => {
    setUser((currentUser) => {
      if (currentUser.user) {
        return {
          ...currentUser,
          user: currentUser.user.filter((otherUser) => otherUser.id !== user.id),
        }
      }
      return currentUser
    })
  }
  
  function handleDeleteUser() {
    fetch(`/users/${user.id}`, {method: 'DELETE'})
    .then((res) => {
      if (res.ok) {
        removeUser(user)
        setUser(null)
        alert('Successfully Deleted User')
        history.push('/login')
      } else {
        alert('Something went wrong')
      }
    });
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

  const booksToDisplay = books.filter((book) => {
    return book.title.toLowerCase().includes(searchBook.toLowerCase()) ||
    book.author.toLowerCase().includes(searchBook.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchBook.toLowerCase())
  })

  return (
    <>
    <Header handleLogoutClick={handleLogoutClick} user={user}/>
      <Switch>
        <Route exact path='/books'>
          <SearchBooks searchBook={searchBook} setSearchBook={setSearchBook} onSearch={onSearch} />
          <AllBooks booksToDisplay={booksToDisplay} />
        </Route>
        <Route exact path='/user-books'>
          <UserBooks user={user} updateUser={updateUser} handleDeleteUser={handleDeleteUser}/>
        </Route>
        <Route exact path='/books/:id'>
          <BookDetails user={user} addUserBook={addUserBook} removeUserBook={removeUserBook}/>
        </Route>
      </Switch>
    </>
  )
}

export default App;