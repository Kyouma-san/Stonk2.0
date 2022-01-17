import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const SignIn = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const PostData = ()=>{
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
            M.toast({html: data.error, classes:"#ef5350 red lighten-1"})
           } else {
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
            M.toast({html: "Signed in successfully!", classes:"#689f38 light-green darken-2"})
            navigate('/profile');
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