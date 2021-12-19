const express = require("express");
let router = express.Router();
const Guest = require('../schema/guest')
const Host = require('../schema/host')
const Schedule = require('../schema/schedule')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcrypt')




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
const createToken =(id,email,name,userName)=>{
  let typeOfUser='guestUser'
  return jwt.sign({id ,email,name,userName,typeOfUser}, 'masha aldossari secret',{
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
      
      const salt = await bcrypt.genSalt()
      let myPassword = await bcrypt.hash(this.password, salt)

      const guestUser= await Guest.create({name,userName,email, password: myPassword})
      const token =createToken(guestUser._id,guestUser.email,guestUser.name,guestUser.userName)
      res.cookie('jwt',token,{httpOnly:true , maxAge: maxAge * 1000})
      res.status(201).json({guestUser:token})
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
    console.log("login")
    try{
      const guestUser= await Guest.login(email, password)
      const token =createToken(guestUser._id,guestUser.email,guestUser.name,guestUser.userName)
      res.cookie('jwt',token,{httpOnly:true , maxAge: maxAge * 1000})
      res.status(200).json({guestUser:token})
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



router.post("/booking", (req, res) => {
   
  Host.findById({_id:req.body.hostId}).then((host) => {
    const findHost= host;
    console.log('host'+host);
 Guest.findById({_id:req.body.guestId}).then((guest) => {
   const findGuest= guest;
   console.log(findGuest);
   Schedule.findOne({host:findHost, date:req.body.date}).then((schedule) => {
     console.log(req.body.date+"jjj")
     if(!schedule){
      Schedule.create({host:findHost,guest:findGuest,date:req.body.date}).then((schedule) =>{
        res.send(schedule);
      })
     }else{
      res.send("والله شوووف انا مش مش عايز انا ماعنديش")

     }
   })
 
 })
  })
   
});
//logout

router.get("/logout", (req, res) => {
   
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
});

module.exports = router;