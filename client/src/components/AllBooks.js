import React, { useState, useEffect } from 'react'
import SearchBooks from './SearchBooks'
import BookCard from './BookCard'
import UserBooks from './UserBooks'

const AllBooks = ( {booksToDisplay} ) => {

const mappedBooks = booksToDisplay.map(book => <BookCard key={book.id} {...book}/>)

  return (
    <div>
        {/* <SearchBooks setSearchBook={setSearchBook} searchBook={searchBook} onSearch={onSearch} /> */}
        {mappedBooks}
    </div>
  )
}

export default AllBooks