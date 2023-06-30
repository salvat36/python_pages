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
    <Menu.Item 
        as={NavLink}
        exact to="/logout"
        name='Logout'
        active={active === 'logout'}
        onClick={handleLogoutClick}
      />
  )}
      <Menu.Item 
        as={NavLink}
        to="/user-books"
        name='Your Library'
        active={active === 'user-books'}
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