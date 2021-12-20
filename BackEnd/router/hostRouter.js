const express = require("express");
let router = express.Router();
const Host = require('../schema/host')
const Home = require('../schema/homeInfo')
const Schedule = require('../schema/schedule')
const jwt = require('jsonwebtoken')
const validatePhoneNumber = require('validate-phone-number-node-js');
const md5 = require('md5')


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
const createToken =(id ,email,name,userName)=>{
  let typeOfUser='hostUser'
    return jwt.sign({id ,email,name,userName,typeOfUser}, 'masha aldossari secret',{
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
// search for city
  router.get("/findCity/:city", (req, res) => {
    console.log("paramss",req.params);
    Host.find({city: req.params.city},(err, host)=>{
        res.send(host)
     }) 

  });

  //endpoint for booking
router.get("/booking/:id", async(req, res) => {
  console.log(req.params.id);
  try{
    const schedule= await Schedule.find({$or:[{host: req.params.id},{guest: req.params.id}]}).populate('host guest','name')
      
      if(!schedule){
                res.send("ther is no schedule")
      }
      res.send(schedule)
  }
      catch (errors) {
        res.status(400).json({errors})
      } 

    })

  //post for host login
router.post("/login", async(req, res) => {
  const {email, password} = req.body;
  console.log("welcome")
  try{

    const hostUser = await Host.login(email, password)
    console.log(hostUser)
    const token =createToken(hostUser._id,hostUser.email,hostUser.name,hostUser.userName)
    console.log(token)
    res.cookie('jwt',token,{httpOnly:true , maxAge: maxAge * 1000})
    res.status(200).json({hostUser:token})
  }
  catch(err){
      const errors = handleError(err);
    res.status(400).json({errors})
  }
});




   //post for Host signup
router.post("/signup",async (req, res) => {
    const {userName,name,email, password,hostImage} = req.body;
    try{
      
      const hostUser= await Host.create({userName,name,email, password: md5(password),hostImage})
      const token =createToken(hostUser._id,hostUser.email,hostUser.name,hostUser.userName,hostUser)
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
       res.status(201).json({hostUser:token})
    }
    catch(err){
      const error = handleError(err)

        res.status(400).json(error)
    }
    //console.log(email, password)
    //res.send('new signup');
});




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

router.put("/updateHomes", (req, res) => {
  Host.update({'homes._id': req.body.id},{
  "$set": { 
    'homes.$.phoneNumber': req.body.phoneNumber,
    'homes.$.image':   req.body.homeImage,
    'homes.$.informations':req.body.informations
  }
   
      
  }, () => {
      res.send("updated!");
      });
});

//update host profile

  router.patch('/updateProdile/:id', async (req,res)=> {
    const allowedUpdates = ['userName', 'email', 'name','password','hostImage','city'];
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation) {
        return res.status(400).send({erro: 'Invalid updates'});
        // anything not expected from the todos
    }
    try{
        const host = await Host.findOne({_id: req.params.id});
        // find id passed into the function
        if(!host) {return res.status(404).send(404).send()}
        updates.forEach((update)=> {
          host[update] = req.body[update]
            // update the values and keys dynamically
        })
        await host.save()
        res.status(200).send(host)
    } catch(e){
        res.status(400).send(e)
        console.error(e)
    }
  })
   
  //chnge request
  
  router.patch('/acceptedBokking', async (req,res)=> {
  const schedule =  await Schedule.findById({_id:req.body.id});
       console.log(schedule.bookingStatues)
     if(schedule.bookingStatues==="Pending" || schedule.bookingStatues==="Rejected"){
      schedule.bookingStatues="Accepted" 
      await schedule.save()
      const schedules= await Schedule.find({host: req.body.hostID}).populate('host guest','name')
      res.status(200).send(schedules) 

     }
            
  })

  router.patch('/rejectedBooking', async (req,res)=> {
    const schedule =  await Schedule.findById({_id:req.body.id});
         console.log(schedule.bookingStatues )
       if(schedule.bookingStatues==="Pending" || schedule.bookingStatues==="Accepted"){
        schedule.bookingStatues="Rejected" 
        await schedule.save()
        const schedules= await Schedule.find({host: req.body.hostID}).populate('host guest','name')
        res.status(200).send(schedules) 
       }
              
    })
  


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

router.get("/logout", (req, res) => {
   
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
});


module.exports = router;