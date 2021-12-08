const mongoose = require('mongoose')
const {isEmail} = require('validator')
const homeSchema= require('../schema/homeInfo').schema
const Schema = mongoose.Schema

 
const hostSchema = new Schema({
    userName:{ 
        type: String,
        required: [true, "user should be provided"],
        unique: true,
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
    type:Number,
    minLength:[6,"pass more than 6"],
    required: [true, "pass should be provided"],
 },
 homes:[homeSchema],

})

const Host = mongoose.model("host",hostSchema)
module.exports = Host