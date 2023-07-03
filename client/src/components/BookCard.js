import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ( {author, title, id} ) => {

  return (
    <div>
      <Link to={`/books/${id}`}>{title} by {author}</Link>
    </div>
  )
}

export default BookCard