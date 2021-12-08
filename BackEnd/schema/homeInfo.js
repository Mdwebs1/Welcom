const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const homeSchema = new Schema({

 image:{
    type:String,
    required: [true, "be provided"],
}, 
 phoneNumber:{
    type:Number,
    required: [true, "be provided"],
 },
 informations:{
     type:String,
     required: [true, "be provided"],

 }
 
})

const Home = mongoose.model("homeInfo",homeSchema)
module.exports = Home