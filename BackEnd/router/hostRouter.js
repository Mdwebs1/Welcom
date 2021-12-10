const express = require("express");
let router = express.Router();
const Host = require('../schema/host')
const Home = require('../schema/homeInfo')
const jwt = require('jsonwebtoken')
const validatePhoneNumber = require('validate-phone-number-node-js');




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
    if(err.message.includes("host validation failed")){
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
   
    Host.find({}, (err, host) => {
      res.send(host);
       });
});



//endpoint
router.get("/:id", (req, res) => {
    console.log(req.params.id);
    Host.find({_id: req.params.id},(err, hosts)=>{
        res.send(hosts)
     }) 

  });

  //post for gues login
router.post("/login", async(req, res) => {
  const {email, password} = req.body;
  console.log("welcome")
  try{

    const hostUser= await Host.login(email, password)
    const token =createToken(hostUser._id)
    res.cookie('jwt',token,{httpOnly:true , maxAge: maxAge * 1000})
    res.status(200).json({hostUser : hostUser,token:token})
  }
  catch(err){
      const errors = handleError(err);
    res.status(400).json({errors})
  }
});




   //post for Host signup
router.post("/signup",async (req, res) => {
    const {userName,name,email, password} = req.body;
    try{
      
      const hostUser= await Host.create({userName,name,email, password})
      const token =createToken(hostUser._id)
      res.cookie('jwt',token,{httpOnly:true , maxAge: maxAge * 1000})
      res.status(201).json({hostUser : hostUser,token:token,name : userName})
    }
    catch(err){
      const error = handleError(err)

        res.status(400).json(error)
    }
    //console.log(email, password)
    //res.send('new signup');
});





//post

// router.post("/", async (req, res) => {
//   const host= new Host({
//       name:req.body.name,
//       userName:req.body.userName,
//       email:req.body.email,
//       password:req.body.password
//   })

// try{
//   await host.save()
//   const host=await Host.find()
//   res.status(201).send(host)
// }
// catch(e){
//   console.error(e)
// }
// console.log("added")
     
// });




//post
// router.post("/", (req, res) => {
//   console.log(req.body)
//   Host.create(req.body, () => {
//       res.send("saved!");
//       });
// });


//add home to specific host
router.post("/addHome/:id", async (req, res) => {
  const _id = req.params.id
  const host =  await Host.findById({_id})
  // console.log(host)
  const result = validatePhoneNumber.validate(req.body.phoneNumber)
  if(result) {  const newHome = new Home({
        
    phoneNumber: req.body.phoneNumber,
    image: req.body.image,
    informations:req.body.informations
})

host.homes.push(newHome)

await host.save()
res.send(host)
}else{
  res.send("الرقم يالطيب غلط !!!!")
}

});


//ubdate information for host like change image...

router.patch("/updateHomes", (req, res) => {
  Host.update({'homes._id': req.body.id},{
  "$set": { 
    'homes.$.phoneNumber': req.body.phoneNumber,
    'homes.$.image': req.body.image,
    'homes.$.informations':req.body.informations}
   
      
  }, () => {
      res.send("updated!");
      });
});



//host can delet hes information
router.delete("/deleteProfile/:id", (req, res) => {
  Host.deleteOne({_id:req.params.id}, ( ) => {
      Host.find({}, (err, host) => {
          res.send("deleted");
          });

      });
});


//home delete

//host can delet hes information
router.delete("/deleteHome", async(req, res) => {

  const hoomeId = req.body.homeId;
try{
  const host = await Host.findById(req.body.hostId);
  if(!host){
    return res.status(404).send()
  }
  await host.homes.pull({_id:hoomeId})
  await host.save()
  res.status(201).send(host)
}

catch(e){
  res.status(500).send();
  console.error(e);
}


      });




module.exports = router;