const mongoose = require('mongoose')
const {isEmail} = require('validator')
const Schema = mongoose.Schema
//  const bcrypt= require('bcrypt')



const guestSchema = new Schema({
    userName:{ 
        type: String,
        required: [true, "user should be provided"],
        unique: true
    }, 
    name:{
        type: String,
       
    },
    email:{
        type:String,
        required: [true, " email should be provided"],
        unique: true,
        lowercase: true,
        validate:[isEmail,"is invalid"]
    },
    password:{
    type:Number,
    minLength:[6,"pass more than 6"],
    required: [true, "pass should be provided"],
 }
})



const Guest = mongoose.model("guest",guestSchema)
module.exports = Guest