const express = require("express");
let router = express.Router();
const Guest = require('../schema/guest')
const Host = require('../schema/host')
const Schedule = require('../schema/schedule')
const jwt = require('jsonwebtoken')


//handle errors
const handleError = (err)=>{
    
    console.log(err.message, err.code);
  let error = { email: '', password: '' };

  //incorrect email
  if (err.message === 'incorrect email') {
    error.email = 'that email is not registered';
  }

    //incorrect password
    if (err.message === 'incorrect password') {
        error.password = 'that password is not correct';
      }

  // duplicate email error
  if (err.code === 11000) {
    error.email = 'that email is already registered';
    return error;
  }

    //validate errors
    if(err.message.includes("guest validation failed")){
       Object.values(err.errors).forEach(({properties})=> {
        error[properties.path] = properties.message;
       })
    }
    return error;
}
const maxAge = 3 * 24 * 60 * 60;
const createToken =(id)=>{
    return jwt.sign({id}, 'masha aldossari secret',{
        expiresIn:maxAge
    });
}

//get
router.get("/", (req, res) => {
   
  Guest.find({}, (err, gueste) => {
      res.send(gueste);
       });
});


//endpoint
router.get("/:id", (req, res) => {
    console.log(req.params.id);
    Guest.find({_id: req.params.id},(err, gueste)=>{
        res.send(gueste)
     }) 

  });



   //post for guest signup;
router.post("/signup",async (req, res) => {
    const {name,userName,email, password} = req.body;
    try{
      
      const guestUser= await Guest.create({name,userName,email, password})
      const token =createToken(guestUser._id)
      res.cookie('jwt',token,{httpOnly:true , maxAge: maxAge * 1000})
      res.status(201).json({guestUser : guestUser,token:token,name : userName})
    }
    catch(err){
      const error = handleError(err)

        res.status(400).json(error)
    }
    //console.log(email, password)
    //res.send('new signup');
});



//post for guesglogin
router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try{
  
      const guestUser= await Guest.login(email, password)
      const token =createToken(authorUser._id)
      res.cookie('jwt',token,{httpOnly:true , maxAge: maxAge * 1000})
      res.status(200).json({guestUser : guestUser,token:token})
    }
    catch(err){
        const errors = handleError(err);
      res.status(400).json({errors})
    }
  });


//logout for guest

router.get("/logout", (req, res) => {
   
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
});

router.post("/reservation", (req, res) => {
   
  Host.findById({_id:req.body.hostId}).then((host) => {
    const findHost= host;
    console.log('host',+findHost);
 Guest.findById({_id:req.body.guestId}).then((guest) => {
   const findGuest= guest;
   console.log(findGuest);
   Schedule.findOne({host:findHost, data:req.body.date}).then((schedule) => {
     if(schedule){
       res.send("والله شوووف انا مش مش عايز انا ماعنديش")
     }else{
      Schedule.create({host:findHost,guest:findGuest}).then((schedule) =>{
        res.send("create successfully"+schedule);
      })
     }
   })
 
 })
  })
   
});

module.exports = router;