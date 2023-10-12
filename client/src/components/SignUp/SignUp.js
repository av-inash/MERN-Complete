import React,{useState} from 'react'
// import styles from './SignUp.module.css'
import {Link,useNavigate} from 'react-router-dom'
import './SignUp.scss'

const SignUp = () => {

  const navigate =useNavigate();    //history.push   directly use nhi kr skta isly ye use krte hain

  const[user,setUser]=useState({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
  })

  let name,value;
  const handleInput=(e)=>{
    console.log(e)
    name=e.target.name;
    value=e.target.value;

    setUser({...user,[name]:value})
}
const PostData=async(e)=>{
  e.preventDefault();

  const {name, email,phone,work,password,cpassword}=user; 
     //object destructuring// jo user data dala wo get kr liya
 const res = await fetch('/register',{      // Using fetch Api,promise return krta hai islye await
  method:"POST",   
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({       // stringify becauz jbb bhi humm server me data send kr rhe hote hain data has to be string
    name, email,phone,work,password,cpassword        //name:name


  })

 })
 const data  =await res.json();   // res ko verify krna pdega data perfectly aa rha hai ya nhi
 if(res.status===422 || !data){
  window.alert("Invalid Registration");
  console.log("Invalid Registration")
 }else{
  window.alert("Registration succesfull")
  console.log("Registration Successfull")

  navigate('/login');     // jab registration successfull ho jye toh directly login page pe chla jaye 
 }


  
}
  return (
    
    <div>
    {/* <div className={styles.componentContainer}> */}
    <div className="container">
    <div class="signup-box">
      <h1>Sign Up</h1>
      
      <form method='POST'>
        <label><i class="zmdi zmdi-account material-icons-name"></i></label>
        <input type="text" placeholder="Your Name" name='name' autoComplete="off" value={user.name} onChange={handleInput}/>

        <label><i class="zmdi zmdi-email"></i></label>
        <input type="email" placeholder="Your Email"name='email'  autoComplete='off' value={user.email} onChange={handleInput}/>

        <label><i class="zmdi zmdi-phone"></i></label>
        <input type="Number" placeholder="Mobile Number" name ='phone' autoComplete='off' value={user.phone}onChange={handleInput} />

        <label><i class="zmdi zmdi-slideshow"></i></label>
        <input type="text" placeholder="Your Profession"name='work' autoComplete='off' value={user.work}onChange={handleInput} />

        <label><i class="zmdi zmdi-lock"></i></label>
        <input type="password" placeholder="Enter Password"name='password'autoComplete='off' value={user.password}onChange={handleInput} />

        <label><i class="zmdi zmdi-lock"></i></label>
        <input type="password" placeholder="Confirm Password" name='cpassword'autoComplete='off' value={user.cpassword}onChange={handleInput} />

        <input type="button" value="Submit" onClick={PostData}/>
      </form>
      
    </div>
    </div>
    <p class="para-2">
      Already have an account? <Link to="/login">Login here</Link>
    </p>
    
    
    </div>
    // </div>
  )
}

export default SignUp
