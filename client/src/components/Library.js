import { useState } from "react";
import User from './User';
import Spine from './Spine';


import React from 'react'


// !# Needs functions to "addBook" , "removeBook"

const Library = () => {
  return (
    <div>
    <h1>Library</h1>
    <User/>
    <Spine/>
    </div>
  )
}

export default Library
