const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hostSchema = require('../schema/host').schema
const guestSchema = require('../schema/guest').schema



const scheduleSchema = new Schema({
    host:{type:mongoose.Schema.Types.ObjectId,ref:'host'}, 
    guest:{type:mongoose.Schema.Types.ObjectId,ref:'guest'}, 
    date: {type: Date,default:Date.now},
    bookingStatues:{type:String,default:"Pending"}
   
})

const Schedule = mongoose.model("schedule",scheduleSchema)
module.exports = Schedule