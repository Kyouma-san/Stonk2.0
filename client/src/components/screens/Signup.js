import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const PostData = ()=>{
        fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
            M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
           } else {
            M.toast({html: "Account created", classes:"#689f38 light-green darken-2"})
            navigate('/signin');
           }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field #212121 grey darken-4">
                <h2 className="brand-logo">Stonks</h2>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    className="white-text"
                    onChange={(e)=>setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    className="white-text"
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="password"
                    value={password}
                    className="white-text"
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn auth-btn waves-effect waves-light #455a64 blue-grey darken-2" 
                onClick={()=>PostData()}>
                    SignUp
                </button>
                <h6>
                    <Link to="/signin"> Already have an account? </Link>
                </h6>
            </div>
            <h2 className="quote">TRACK ALL YOUR INVESTMENTS AT A SINGLE PLACE</h2>
        </div>
    )
}

export default Signup