import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const BookCard = ( {author, genre, page_count, title, id} ) => {

const [error, setError] = useState(null)


  return (
    <div>
      <Link to={`/books/${id}`}>Title: {title} Author: {author}</Link>
    </div>
    // ! RENDER INDIVIDUAL BOOKS HERE //
  )
}

export default BookCard
