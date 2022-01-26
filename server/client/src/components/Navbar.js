import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'  //LINK is used to avoid reloading each time going to a different route
import { UserContext } from '../App'

const NavBar = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext)
    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/portfolio">Portfolio</Link></li>,
                <li><Link to="/transaction">Transaction</Link></li>,
                <li>
                    <button className="btn logout auth-btn  #ef5350 red lighten-1"
                        onClick={() => {
                            localStorage.clear();
                            dispatch({ type: "CLEAR" })
                            navigate('/signin');
                        }} >
                        Logout
                    </button >
                </li>
            ]
        } else {
            return [
                <li><Link to="/signin">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper nav nav-mob #8bc34a #212121 grey darken-4">
                <Link to="/" className="left brand-logo">Stonks</Link>
                <Link to="#" className="right sidenav-trigger" data-target="mobile-links" >
                    <i className="material-icons">menu</i>
                </Link>
                <ul className="ul-mob right hide-on-med-and-down">
                    {renderList()}
                </ul>

            </div>
            <ul className="sidenav right" id="mobile-links">
                {renderList()}
            </ul>
        </nav>

    )
}

export default NavBar