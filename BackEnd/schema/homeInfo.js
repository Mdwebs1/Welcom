const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
const homeSchema = new Schema({

 image:{
    type:String,
    required: [true, "image be provided"],
}, 
 phoneNumber:{
    type:Number,
    required: [true, "phoneNumber be provided"],
 },
 informations:{
     type:String,
     required: [true, "informations be provided"],

 }
 
})

const Home = mongoose.model("homeInfo",homeSchema)
module.exports = Home