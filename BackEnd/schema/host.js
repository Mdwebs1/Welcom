const mongoose = require('mongoose')
const {isEmail} = require('validator')
const homeSchema= require('../schema/homeInfo').schema
const Schema = mongoose.Schema
const bcrypt= require('bcrypt')

 
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
    type:String,
    minLength:[6,"pass more than 6"],
    required: [true, "pass should be provided"],
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

//fire a function befor doc saved to db
hostSchema.pre('save',async function ( next) {
 const salt = await bcrypt.genSalt()
 this.password = await bcrypt.hash(this.password, salt)
    next()
})

hostSchema.statics.login= async function (email,password){
    
    const host= await this.findOne({ email: email});
    console.log(host) 
    if(host){
       const hostes= await bcrypt.compare(password,host.password)
       if(hostes){
           return host
        }
       throw Error('incorect password')
    }
    throw Error('incorect email')
}

const Host = mongoose.model("host",hostSchema)
module.exports = Host