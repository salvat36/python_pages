import React from 'react'

const Navbar = ( { user, setUser }) => {
  function handleLogoutClick() {
    fetch('/logout', {method: 'DELETE'}).then((res) => {
      if (res.ok) {
        setUser(null);
      }
    });
  }


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
