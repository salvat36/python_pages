import React from "react";
import { Header as SemanticHeader } from "semantic-ui-react";

import NavBar from "./NavBar";

const Header = ({ user, handleLogoutClick }) => {
  return (
    <header>
      <SemanticHeader id="header">
        <NavBar handleLogoutClick={handleLogoutClick} user={user} />
      </SemanticHeader>
    </header>
  );
};

export default Header;
