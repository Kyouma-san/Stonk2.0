import React from 'react'

const Login = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field #f1f8e9 light-green lighten-5">
                <h2>Stonks</h2>
                <input type="text" placeholder="email" />
                <input type="text" placeholder="password" />
                <button className="btn waves-effect waves-light #8bc34a light-green" >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login