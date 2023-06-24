import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';

const NavBar = ( {updateUser, user, handleLogoutClick}) => {
  const location = useLocation()
  const [active, setActive] = useState('')
  const history = useHistory()

  useEffect(() => {
      setActive(location.pathname.slice(1))
  }, [location])

  const handleClick = (e, { name }) => {
      setActive(name)
  }


  return(
    <Menu secondary id="navbar">
      {!user ? (
      <Menu.Item 
      as={NavLink}
      exact to="/login"
      name='Login'
      active={active === 'login'}
      onClick={handleClick}
    />
  ) : (
    <button onClick={handleLogoutClick}>Logout</button>
    // <Menu.Item 
    //     as={NavLink}
    //     exact to="/logout"
    //     name='Logout'
    //     active={active === 'logout'}
    //     onClick={handleClick}
    //   />
  )}
      <Menu.Item 
        as={NavLink}
        to="/library"
        name='Your Library'
        active={active === 'library'}
        onClick={handleClick}
      />
      <Menu.Item 
        as={NavLink}
        to="/books"
        name='Collection'
        active={active === 'books'}
        onClick={handleClick}
      />
      <Menu.Item 
        as={NavLink}
        to="/contact-us"
        name='Contact Us'
        active={active === 'contact-us'}
        onClick={handleClick}
      />
    </Menu>
)
}


export default NavBar;
//* <button onCLick={handleClick}>{signUp ? 'Log In!' : 'Register now!'}</button> */
// import React from 'react'

// const Navbar = ( { handleLogoutClick, handleLoginClick, isLoggedIn}) => {

//   return (
//     <div className="navbar">
//       {!isLoggedIn ? (
//         <>
//           <button onClick={handleLogoutClick}>Logout</button>
//           <button>Bookcase</button>
//           <button>Books</button>
//           <button>Contact Us</button>
//         </>
//       ) : (
//         <>
//           <button onClick={handleLoginClick}>Login</button>
//           <button>Contact Us</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default Navbar
