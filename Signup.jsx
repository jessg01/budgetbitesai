import {useNavigate, Link} from 'react-router-dom'
import React from 'react'
import "./Signup.css"
export default function Signup(){
    const [email, setEmail] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [firstname, setFirstname] = React.useState("")
    const [lastname, setLastname] = React.useState("")
    const [errormessage, setErrormessage] = React.useState("")
    const navigate = useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const res = await fetch("http://localhost:5000/signup", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({email: email, username: username, password: password, firstname: firstname, lastname: lastname})
            })
            if(res.ok){
                const data = res.json()
                navigate('/login')
                console.log(data.message)
                setErrormessage('')
            }
            else{
                const errorMessage = res.json()
                setErrormessage(errorMessage)
            }
        }catch(error){
            setErrormessage(error);
        }
    }
    return(
        <section className="box">
            <div className="side-nav"><Link to="/login" className="login-signup">Here</Link></div>
            <form className="container" onSubmit={handleSubmit}>
                    <div className='subcon-1'>
                        <h1>Sign Up</h1>
                        <div className='subcon-1-1'>
                            <label>First Name:</label>
                            <input type="text" name="firstname" value={firstname} onChange={(e)=> setFirstname(e.target.value)}/>
                            <label>Email:</label>
                            <input type="text" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>                 
                            <label>Password</label>
                            <input type="password" name="psswrd" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className='subcon-2'>
                        <div className='subcon-2-1'>
                            <label>Last Name:</label>
                            <input type="text" name="lastname" value={lastname} onChange={(e)=> setLastname(e.target.value)}/>
                            <label>Username</label>
                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                    </div>
                    <div className='subcon-3'>
                        <button className="signup-home">Submit</button>  
                        {errormessage && <p className="error-message">{errormessage}</p>}                  
                    </div>
            </form>
        </section>
    )
}