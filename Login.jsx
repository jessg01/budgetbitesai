import {Link} from "react-router-dom"
import React from 'react'
import {useNavigate} from 'react-router-dom'
import logo from "../images/image.jpeg"
import "./Login.css"
export default function Login(){
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errormessage, setErrormessage] = React.useState("")
    const navigate = useNavigate()
    async function handleLogin(e){
        e.preventDefault();
        try{ 
            const res = await fetch("http://localhost:5000/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
            });
            if(!res.ok){
                const edata = await res.json();
                setErrormessage(edata.message);
            }
            else{
                const data = await res.json();
                setErrormessage('')
                console.log(data);
                navigate('/home')
            }
         }catch(error){
            console.log(error)
            setErrormessage("Something went wrong. Please try again later");
         }
    }
    return(
        <section className="login">
            <div className="login-logo">
                <img src={logo} alt="logo" /> 
            </div>
            <form className="login-details" onSubmit={handleLogin}>
                <h1>Login</h1>
                <label>Username</label>
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label name="password">Password</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="login-home">Login</button>  
                {errormessage && <p className="error-message">{errormessage}</p>}
                <Link to="/signup" className="login-signup">New User? Sign up here</Link>
            </form>
        </section>
    )
}