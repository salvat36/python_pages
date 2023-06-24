import { useState } from "react";
import User from './User';
import BookCard from './BookCard';

const UserBooks = () => {

  const [bookCard, setBookCard] = useState([]);


  const addBookCard = (bookCard) => {
    setBookCard([...bookCard, bookCard])
  }

  const removeBookCard = (bookCard) => {
    setBookCard([bookCard.filter((bookCard)=> bookCard.id )])
  }


  return (
    <div>
    <h1>Your Books</h1>
    <User/>
    <BookCard/>
    </div>
  )
}

export default UserBooks
