import React, {useContext} from 'react'
import {Link} from 'react-router-dom'   //used to avoid reloading each time going to a different route
import {UserContext} from '../App'

const NavBar = ()=>{
  const {state,dispatch} = useContext(UserContext)
  const renderList = ()=>{
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>
      ]
    }else{
      return [
        <li><Link to="/signin">Login</Link></li>,
      <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }
    return (
  <nav>
  <div className="nav-wrapper nav #8bc34a #212121 grey darken-4">
    <Link to="/" className="left brand-logo">Stonks</Link>
    <ul id="nav-mobile" className="right">
     {renderList()}
    </ul>
  </div>
</nav>
      
    )
}

export default NavBar