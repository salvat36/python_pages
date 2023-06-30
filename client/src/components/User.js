import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const User = () => {

  const [userBooks, setUserBooks] = useState([])
  const { userBookId } = useParams()

  useEffect(()=>{
      fetch(`/user-books/${userBookId}`)
      .then(res => {
          if (res.ok) {
              res.json().then(setUserBooks)
            } else {
                res.json().then(e => alert(e.message))
              }
          })
    .catch(console.error)
  },[userBookId])

  function handleDeleteUserBook() {
    fetch(`/user-books/${userBookId}`, {method: 'DELETE'})
    .then((res) => {
      if (res.ok) {
        setUserBooks([])
        alert("Successfully Deleted User-Book")
      }
    });
  }

  const handleAddUserBook = (book) => {
    fetch('/user-books', {method: 'POST'})
    .then((res) => {
      if (res.ok) {
        res.json()
    .then(setUserBooks(res));
      } else {
        setUserBooks(null);
      }
    })
  }

  return (
    <>
      <div>User</div>
      <button onClick={handleDeleteUserBook}>Remove Book</button>
      <button onClick={handleAddUserBook}>Add Book</button>
    </>
  )
}

export default User