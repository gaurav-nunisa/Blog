const { timeStamp } = require("console")
const {Schema, model} = require("mongoose")
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    profileImageURL:{
        type: String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        
    },
    name:{
        type : String,
        required : true,
    
    },
    email:{
        type: String,
        required : true,
        unique : true
    },role :{
        type : String,
        enum :["USER", "ADMIN"],
        default : "USER"
    

    },
    salt:{
        type : String
    },
    password:{
        type : String,
        required : true

    }
}, {timestamps : true})

userSchema.pre('save', function(next){
    const user = this
    if (!user.isModified("password")){
        return 
    }
    
})

const USER = mongoose.model("user",userSchema)
module.exports = USER