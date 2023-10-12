import React, { useEffect } from 'react'
import './About.scss'
import { useNavigate } from 'react-router-dom'
const About = () => {
    const navigate=useNavigate();

    const callAboutPage=async()=>{
        try{
            const res =await fetch('/about',{
                method:"GET",
                header:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
const data = await res.json();
console.log(data)
if(res.status===200){
    const error=new Error(res.error)
    throw error;
}
        }catch(err){
            console.log(err)
            navigate('/login')

        }
    }

    useEffect(() => {
        callAboutPage();      // useEffect k andr async fun use nhi kr skte
      
    
    
    }, [])

    
    return (
        <>
           
           <h1>Welcome to About Us</h1>
           <p> We come back soon with this feature.......</p>

        </>
    )
}

export default About
