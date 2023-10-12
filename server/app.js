const express=require('express');
const dotenv =require('dotenv');
const mongoose =require('mongoose');
const app= express();

dotenv.config({path:'./config.env'})
require('./db/conn');
//const User=require('./model/userSchema')

app.use(express.json());     //strigify krne k liye


// we link the router files to make our route easy
app.use(require('./router/auth'))


const PORT =process.env.PORT;


//Middlewre

const middleware =(req,res,next)=>{
    console.log(`Hello from Moddleware`);
    next();

}

// app.get('/',(req,res)=>{
//     res.send(`Hello from server`)
// })
app.get('/about',middleware,(req,res)=>{
    console.log("hello about")
    res.send(`Hello from server`)
})
app.get('/contact',(req,res)=>{
    res.send(`Hello from server`)
})
app.get('/signin',(req,res)=>{
    res.send(`Hello from server`)
})
app.get('/signup',(req,res)=>{
    res.send(`Hello from server`)
})
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})