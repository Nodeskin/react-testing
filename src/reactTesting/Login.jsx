import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./login.css"


const Login = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")


  const handleClick = async (e) =>{ 
    e.preventDefault();
    setLoading(true)
        try{
        const {data} = await axios.get("https://jsonplaceholder.typicode.com/users/1");
        setUser(data) 
         } catch(error){
        setError(true)}

        setLoading(false)
        setUsername("")
        setPassword("")
      } 

  return (
    <div className='container'>

      <span className='user'>{user.name}</span>
     
      <form className='form-container'>
        <div className="login-container">
          <input
          className='login-input'
           type="text"
            placeholder='username'
            value={username}
            onChange={(e )=> setUsername(e.target.value)}
            />

          <input
          className='login-input'
          type="password"
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
           />

          <button
          data-testid='button' 
          className='login-button'
          disabled={!username || !password}
          onClick={handleClick}
          >{ loading ? "Please wait..." : "Login"}
          </button>
        </div>

        <span
         data-testid='error' 
         style={{visibility: error ? "visible" : "hidden"}}
         >Something went wrong
         </span>
      </form>

    </div>
  )
}

export default Login
