import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BookCard = () => {
const {bookId} = useParams()
const [book, setBook] = useState([])
const [error, setError] = useState(null)

  useEffect(()=>{
    fetch(`/books/${bookId}`)
    .then(res => {
        if (res.ok) {
            res.json().then(setBook)
          } else {
              res.json().then(e => setError(e.message))
            }
        })
  .catch(console.error)
},[bookId])

  return (
    <div>
    <h3>Book</h3>
    <p>Title</p>
    <p></p>


    </div>
    // ! RENDER INDIVIDUAL BOOKS HERE //
  )
}

export default BookCard
