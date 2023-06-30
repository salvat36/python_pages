import {useEffect, useState} from 'react'
import BookCard from './BookCard';

const UserBooks = ( { user, handleDeleteUser } ) => {

// if (!user) return <h1>Loading...</h1>
const booksList = user?.user_books.map((userBook) => <BookCard key={userBook.book.id} {...userBook.book} />)

//! NEED TO FIGURE OUT HOW TO TIE IN THE EDIT ACCOUNT BUTTON THAT WANTS TO BE ADDED BELOW
//! WITH THE FORMIK UPDATEUSERFORM BASIC FUNCTIONALITY
//! STILL NEED A USEEFFECT I THINK

  return (
    <div>
      <h2>Welcome to your library, {user.username}!</h2>
      <button onClick={handleDeleteUser}>Delete Account</button>
      {/* <button onClick={handleUpdateUser}>Edit Account</button> */}
      <h1>Books</h1>
      <h3>{booksList ? booksList : <></>}</h3>
    </div>
  )
}
export default UserBooks