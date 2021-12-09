const mongoose = require('mongoose')
const {isEmail} = require('validator')
const Schema = mongoose.Schema
const bcrypt= require('bcrypt')



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
    type:String,
    minLength:[6,"pass more than 6"],
    required: [true, "pass should be provided"],
 }
})

//fire a function after doc saved to db

guestSchema.post('save', function (doc, next) {
    console.log('new user was created & saved', doc);
    next()
})

//fire a function befor doc saved to db
guestSchema.pre('save',async function ( next) {
 const salt = await bcrypt.genSalt()
 this.password = await bcrypt.hash(this.password, salt)
    next()
})

guestSchema.statics.login= async function (email,password){
    
    const guest= await this.findOne({ email: email});
    if(guest){
       const guests= await bcrypt.compare(password,guest.password)
       if(guests){
           return guest
       }
       throw Error('incorect password')
    }
    throw Error('incorect email')
}

const Guest = mongoose.model("guest",guestSchema)
module.exports = Guest 