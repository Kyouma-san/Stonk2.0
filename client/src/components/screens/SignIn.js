import React from 'react'
import { Link } from 'react-router-dom'

const SignIn = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field #212121 grey darken-4">
                <h2 className="brand-logo">Stonks</h2>
                <input type="text" placeholder="email" />
                <input type="text" placeholder="password" />
                <button className="btn auth-btn waves-effect waves-light #ffffff white" >
                    Login
                </button >
                <h6>
                    <Link to="/signup"> Don't have an account? </Link>
                </h6>
            </div>
            <h2 className="quote">TRACK ALL YOUR INVESTMENTS AT A SINGLE PLACE</h2>
        </div>
    )
}

export default SignIn