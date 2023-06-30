import React, { useState, useEffect } from 'react'
import SearchBooks from './SearchBooks'
import BookCard from './BookCard'
import UserBooks from './UserBooks'

const AllBooks = () => {
const [books, setBooks] = useState([])

useEffect(()=>{
  fetch('/books')
  .then(res => res.json())
  .then(setBooks)
  .catch(err => console.log(err))
}, [])

const mappedBooks = books.map(book => <BookCard key={book.id} setBooks={setBooks} {...book}/>)

  return (
    <div>
        <SearchBooks/>
        {mappedBooks}
    </div>
  )
}

export default AllBooks