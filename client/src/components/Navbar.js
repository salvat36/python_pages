import React from 'react'

const Navbar = ( { handleLogoutClick, handleLoginClick, isLoggedIn }) => {

  return (
    <div className="navbar">
      {isLoggedIn ? (
        <>
          <button onClick={handleLogoutClick}>Logout</button>
          <button>Bookcase</button>
          <button>Books</button>
          <button>Contact Us</button>
        </>
      ) : (
        <>
        <button>Login</button>
        <button>Contact Us</button>
        </>
      )}
    </div>
  );
};

export default Navbar
