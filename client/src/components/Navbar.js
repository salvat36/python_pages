import React from 'react'

const Navbar = ( { handleLogoutClick }) => {


  return (
    <div class='b'>
      <button>Login</button>,
      <button onclick={handleLogoutClick}>Logout</button>
      <button>Bookcase</button>
      <button>Books</button>
      <button>Contact Us</button>
    </div>
  )
}

export default Navbar
