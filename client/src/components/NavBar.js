import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const NavBar = ({ user, handleLogoutClick }) => {
  const location = useLocation();
  const [active, setActive] = useState("");
  const history = useHistory();

  useEffect(() => {
    setActive(location.pathname.slice(1));
  }, [location]);

  const handleClick = (e, { name }) => {
    setActive(name);
  };

  return (
    <Container>
      <Menu secondary id="navbar">
        <Menu.Menu position="left">
        {user ? (
        <Menu.Item
              as={NavLink}
              to="/"
              name="Home"
              active={active === "home"}
              onClick={handleClick}
            />
        ) : null}
          {!user ? (
            <Menu.Item
              as={NavLink}
              exact
              to="/login"
              name="Python Pages"
              active={active === "login"}
              onClick={handleClick}
            />
          ) : (
            <Menu.Item
              as={NavLink}
              exact
              to="/logout"
              name="Logout"
              active={active === "logout"}
              onClick={handleLogoutClick}
            />
          )}
          {user ? (
            <Menu.Item
              as={NavLink}
              to="/user-books"
              name="Your Library"
              active={active === "user-books"}
              onClick={handleClick}
            />
          ) : null}
          {user ? (
            <Menu.Item
              as={NavLink}
              to="/books"
              name="Collection"
              active={active === "books"}
              onClick={handleClick}
            />
          ) : null}
          {user ? (
          <Menu.Item
            as={NavLink}
            to="/contact-us"
            name="Contact Us"
            active={active === "contact-us"}
            onClick={handleClick}
            />
          ) : null}
        </Menu.Menu>
        
      </Menu>
    </Container>
  );
};

export default NavBar;