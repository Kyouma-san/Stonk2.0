import React from 'react'
import {Link} from 'react-router-dom'

const Signup = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field #f1f8e9 light-green lighten-5">
                <h2>Stonks</h2>
                <input type="text" placeholder="name" />
                <input type="text" placeholder="email" />
                <input type="text" placeholder="password" />
                <button className="btn waves-effect waves-light #8bc34a light-green" >
                    SignUp
                </button>
                <h6>
                    <Link to="/signin"> Already have an account? </Link>
                </h6>
            </div>
        </div>
    )
}

export default Signup