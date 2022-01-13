import React from 'react'


const NavBar = ()=>{
    return (
  <nav>
  <div className="nav-wrapper white">
    <a href="/" className="left brand-logo">Stonks</a>
    <ul id="nav-mobile" className="right">
      <li><a href="/signin">Login</a></li>
      <li><a href="/signup">Signup</a></li>
      <li><a href="/profile">Profile</a></li>
    </ul>
  </div>
</nav>
      
    )
}

export default NavBar