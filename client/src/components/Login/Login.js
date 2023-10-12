import React, { useState } from 'react'
// import styles from './Login.module.css';
import { Link,useNavigate } from 'react-router-dom'
import './Login.scss'

const Login = () => {

  const navigate=useNavigate();

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState("");



  const loginUser=async(e)=>{
    e.preventDefault(); // form kabhi kabhi reload ho jata jai toh uss se bchne k liye

    const res= await fetch('/signin',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,password:password
      })
    })

    const data=res.json()
if(res.status===400 || !data){
  window.alert("Invalid Credential");
}else{
  window.alert("Login Succesfully");
  navigate('/');          // agr succesfully login hogya toh home page redirect kr denge
}
  }





  return (
    
    <div>
       <div class="login-box">
      <h1>Login</h1>
      <form method='POST'> 
        <label><i class="zmdi zmdi-email"></i></label>
        <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}placeholder="Enter Email" />
        <label><i class="zmdi zmdi-lock"></i></label>
        <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password" />
        <input type="button" value="Submit" onClick={loginUser} /> 
      </form>
    </div>
    <p class="para-2">
      Not have an account? <Link to ="/signup">Sign Up Here</Link>
    </p>
    </div>
    // </div>
  )
}

export default Login

