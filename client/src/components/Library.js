import { useState } from "react";
import User from './User';
import Spine from './Spine';


// !# Needs functions to "addSpine" , "removeSpine"

const Library = () => {

  const [spines, setSpines] = useState([]);


  const addSpine = (spine) => {
    setSpines([...spines, spine])
  }

  const removeSpine = (spine) => {
    setSpines([spines.filter((spine)=> spine.id )])
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
