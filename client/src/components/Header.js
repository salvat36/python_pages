import NavBar from './NavBar.js'
import React from 'react'
import { Header as SemanticHeader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Header = ( {user, handleLogoutClick}) => {

    return(
        <div>
            <Link to='/'>
                <SemanticHeader id='title'>Python Pages</SemanticHeader>
            </Link>
            <NavBar handleLogoutClick={handleLogoutClick} user={user} />
        </div> 
    )
}

export default Header;