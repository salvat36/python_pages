import { useState } from "react";
import User from './User';
import Spine from './Spine';


// !# Needs functions to "addBook" , "removeBook"

const Library = () => {

  const [spines, setSpines] = useState([]);

  const addSpine = (spine) => {
    setSpine([...spines, spine])
  }

  const removeSpine = (spine) => {
    setSpines([spines.filter((spine)=> spine.id )])
  }

  const addUser = (users) => {
    setUser([...users, user])
  }

  const removeUser = (user) => {
    setSpines([users.filter((user)=> user.id )])
  }

  return (
    <div>
    <h1>Library</h1>
    <User/>
    <Spine/>
    </div>
  )
}

export default Library
