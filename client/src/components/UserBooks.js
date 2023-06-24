import {useEffect, useState} from 'react'
import BookCard from './BookCard';

const UserBooks = ( { user } ) => {

// if (!user) return <h1>Loading...</h1>
const booksList = user?.user_books.map((userBook) => <BookCard key={userBook.book.id} {...userBook.book} />)
// debugger


// function handleDeleteUserBook() {
//   fetch(`/user-books/${userBookId}`, {method: 'DELETE'})
//   .then((res) => {
//     if (res.ok) {
//       setUserBooks([])
//       alert("Successfully Deleted User-Book")
//     }
//   });
// }

// const handleAddUserBook = (book) => {
//   fetch('/user-books', {method: 'POST'})
//   .then((res) => {
//     if (res.ok) {
//       res.json()
//   .then(setUserBooks(res));
//     } else {
//       setUserBooks(null);
//     }
//   })
// }


// const addBookCard = (newBookCard) => {
//   setBookCard([...bookCard, newBookCard])
// }

// const removeBookCard = (bookCardId) => {
//   setBookCard([bookCard.filter((bookCard)=> bookCard.id !== bookCardId )])
// }

// const removeUser = (userId) => {
//   setUser(users.filter((user)=> user.id !== userId))
// }


return (
  <div>
    <div>User</div>
  <h1>Your Books</h1>
  {/* <button onClick={handleDeleteUserBook}>Remove Book</button>
  <button onClick={handleAddUserBook}>Add Book</button> */}
  {booksList? booksList : <></> }
  </div>
)
}

export default UserBooks
