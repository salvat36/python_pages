import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const BookCard = ( {author, genre, page_count, title, id} ) => {

const [error, setError] = useState(null)

  return (
    <div>
      <Link to={`/books/${id}`}>{title} by {author}</Link>
    </div>
  )
}

export default BookCard