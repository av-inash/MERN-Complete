const jwt =require("jsonwebtoken")
const express = require("express")
const router=express.Router();
const bcrypt=require('bcryptjs')
const authenticate =require('../middleware/authenticate')

require('../db/conn')  // database se connection k liye
const User =require('../model/userSchema')  //User k pas saara  data hai

router.get('/',(req,res)=>{
    res.send(`Hello world from the server router.js`)
})

//Using promises


// router.post('/register',(req,res)=>{
//     const{name,email,phone,work,password,cpassword}=req.body;// we use this 
//      // console.log(req.nody.name);// is tarah ek ek kar k sara value nahi niklenge .we use here es6 concept
    
//     if(!name || !email||!phone||!work||!password || !cpassword){   // this is for to must fill all the details
//         return res.status(422).json({error: "plz fill all the filled"})
        
//     }

//     User.findOne({email:email})     // email:Database,email:postman
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email already exist"})
//         }

//         const user=new User({name,email,phone,work,password,cpassword})// when both keys and value are same write only one
//         user.save().then(()=>{
//             res.status(201).json({message:"user register succesfully"})
//         }).catch((err)=>res.status(500).json({error:"Failed to registered"}))
//     }).catch((err)=>{console.log(err)})// if find error to execute findOne then 

// })


// using Async await 

router.post('/register',async(req,res)=>{
    const{name,email,phone,work,password,cpassword}=req.body;// we use this 
     // console.log(req.nody.name);// is tarah ek ek kar k sara value nahi niklenge .we use here es6 concept
    
    if(!name || !email||!phone||!work||!password || !cpassword){   // this is for to must fill all the details
        return res.status(422).json({error: "plz fill all the filled"})
        
    }

    try{
        
    const userExist= await User.findOne({email:email})     // email:Database,email:postman
    if(userExist){
        return res.status(422).json({error:"Email already exist"})
    }else if(password != cpassword){
        return res.status(422).json({error:"password are not matching"})

    }else{
        const user=new User({name,email,phone,work,password,cpassword})// when both keys and value are same write only one
    
    //yaha pe
    await user.save();
   
        res.status(201).json({message:"user register succesfully"})
    
    }
    }catch(err){
        console.log(err) // if find error to execute findOne then
    }

})


//login route
router.post('/signin',async(req,res)=>{
   // console.log(req.body)
   try{
    const{email,password}=req.body;  // jo user ne enter kiya email
    if(!email||!password){
        return res.status(400).json({error:"Pleeze filled the data"})
    }

    const userLogin=await User.findOne({email:email});   // means future me jo data ayega usko wait krne k liye ready hu aur  jo data ayega  mai usko findOne me store kr dunga
    // console.log(userlogin) // sara data mil rha tha
if(userLogin){
    const isMatch = await bcrypt.compare(password,userLogin.password)

    token =await userLogin.generateAuthToken();
    console.log(token)

    res.cookie("jwtoken",token,{   // cookie name,value kya hai
        expires:new Date(Date.now() + 25892000000),   // means 30 din k baad user ka token expire ho jyega
        httpOnly:true
    })


    if(!isMatch){
        res.status(400).json({error:"Invalid Credential"})
    }else{
        res.status(200).json({message:"user signin successfully"})
    }


}else{
res.status(400).json({error:"Invalid Credential"})
}
   
   }catch(err){

    console.log(err);

   }
})
//About us page
router.get('/about',authenticate,(req,res)=>{
        console.log("hello about")
        res.send(req.rootUser)
    })

module.exports=router;