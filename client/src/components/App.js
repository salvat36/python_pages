import React, { useEffect, useState } from 'react'
import { Switch, Route, useParams, useHistory } from 'react-router-dom'
import { Card, CardContent } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Navbar from './NavBar'
import AllBooks from './AllBooks'
import Authentication from './Authentication'
import Header from './Header'
import '../App.css'
import UserBooks from './UserBooks'
import BookDetails from './BookDetails'
import SearchBooks from './SearchBooks'
import ContactUs from './ContactUs'

function App() {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const history = useHistory()
  const [books, setBooks] = useState([])
  const { id } = useParams()

  const [searchBook, setSearchBook] = useState('')

  useEffect(() => {
    fetch('/books')
      .then((res) => res.json())
      .then(setBooks)
      .catch((err) => console.log(err))
  }, [])

  const onSearch = (input) => {
    setSearchBook(input)
  }

  const updateUser = (user) => {
    setUser(user)
  }

  const addUserBook = (book) => {
    setUser((currentUser) => ({
      ...currentUser,
      user_books: [
        ...currentUser.user_books,
        {
          book,
        },
      ],
    }))
  }

  const removeUserBook = (book) => {
    setUser((currentUser) => ({
      ...currentUser,
      user_books: currentUser.user_books.filter(
        (userBook) => userBook.book.id !== book.id
      ),
    }));
  };

  const removeUser = (user) => {
    setUser((currentUser) => {
      if (currentUser.user) {
        return {
          ...currentUser,
          user: currentUser.user.filter(
            (otherUser) => otherUser.id !== user.id
          ),
        };
      }
      return currentUser
    });
  };

  function handleDeleteUser() {
    fetch(`/users/${user.id}`, { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          removeUser(user);
          setUser(null);
          alert('Successfully Deleted User');
          history.push('/login');
        } else {
          alert('Something went wrong');
        }
      });
  }

  useEffect(() => {
    const fetchUser = () => {
      fetch('/authenticate')
        .then((res) => {
          if (res.ok) {
            res.json().then(updateUser);
          } else {
            setUser(null);
          }
        });
    };
    fetchUser();
  }, []);

  function handleLogoutClick() {
    fetch('/logout', { method: 'DELETE' })
      .then((res) => {
        if (res.ok) {
          updateUser(null);
          history.push('/authentication');
        }
      });
  }

  function handleLoginClick() {
    setIsLoggedIn((current) => !current);
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <Authentication updateUser={updateUser} />
      </>
    );
  }

  const booksToDisplay = books.filter((book) => (
    book.title.toLowerCase().includes(searchBook.toLowerCase()) ||
    book.author.toLowerCase().includes(searchBook.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchBook.toLowerCase())
  ));

  return (
    <div className="app-container">
      <Header handleLogoutClick={handleLogoutClick} user={user} />
      <Switch>
        <Route exact path="/books">
          <SearchBooks
            searchBook={searchBook}
            setSearchBook={setSearchBook}
            onSearch={onSearch}
          />
          <AllBooks booksToDisplay={booksToDisplay} />
        </Route>
        <Route exact path="/user-books">
          <UserBooks
            user={user}
            updateUser={updateUser}
            handleDeleteUser={handleDeleteUser}
          />
        </Route>
        <Route exact path="/books/:id">
          <BookDetails
            user={user}
            addUserBook={addUserBook}
            removeUserBook={removeUserBook}
          />
        </Route>
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/">
          <div className="card-container">
            <Card className="welcome-card">
              <CardContent>
                <h2>Welcome to Python Pages!</h2>
                <p>
                  Thank you for visiting our website. We are excited to have you here and
                  help you on your Python programming journey.
                </p>
                <p>
                  Getting started is easy:
                </p>
                <ol>
                  <li>Explore our collection of books by clicking on the "Books" tab above.</li>
                  <li>Find books that interest you and click on them to view details.</li>
                  <li>Add books to your reading list and track your progress.</li>
                </ol>
                <p>
                  If you have any questions or need support, please don't hesitate to{' '}
                  <Link to="/contact-us">contact us</Link>. Our team is always ready to assist you.
                </p>
              </CardContent>
            </Card>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;