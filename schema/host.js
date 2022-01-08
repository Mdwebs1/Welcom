const mongoose = require('mongoose')
const {isEmail} = require('validator')
const homeSchema= require('../schema/homeInfo').schema
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
const md5 = require('md5')

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
    city:{
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
    type:String,
    minLength:[6,"pass more than 6"],
    required: [true, "pass should be provided"]
 },
 hostImage:{
    type:String
 },
 homes:[homeSchema],

})


//fire a function after doc saved to db
hostSchema.post('save', function (doc, next) {
    console.log('new user was created & saved', doc);
    next()
})

hostSchema.statics.login = async function (email,password){
    
    const host= await this.findOne({ email: email});
   
    if(host){
       const hostes = md5(password) === host.password;
    //    console.log(hostes, password, host.password, md5(password))
    console.log(md5(password))
       if(hostes){
           return host
        }
       throw Error('incorrect password')   
    }
    throw Error('incorrect email')


}

const Host = mongoose.model("host",hostSchema)
module.exports = Host 