const mongoose = require('mongoose')
const {isEmail} = require('validator')
const Schema = mongoose.Schema
 const ScheduleSchema = require('../schema/schedule')

const hostSchema = new Schema({
    userName:{ 
        type: String,
        required: [true, "user should be provided"]
    }, 
    name:{
        type: String,
        required: [true, "name should be provided"]
    },
    email:{
        type:String,
        required: [true, " email should be provided"],
        unique: true,
        lowercase: true,
        validate:[isEmail,"is invalid"]
    },
    password:{
    type:String,
    minLength:[6,"pass more than 6"],
    required: [true, "pass should be provided"],
 },
 image:{
    type:String,
},
 availableDays:{
    type:[ ScheduleSchema ]
 }
})

const Host = mongoose.model("host",hostSchema)
module.exports = Host