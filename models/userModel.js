const {createHmac} = require("node:crypto")
const {randomBytes} = require("node:crypto")
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    profileImageURL:{
        type: String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        
    },
    fullname:{
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
    const salt = "123"
    const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex")

    this.salt = salt
    this.password = hashedPassword
    next()
    
})

userSchema.static("matchPassword", async function(email, password){ //return true or false
    const user =  await this.findOne({email})
    console.log(user)
    if(!user) throw new Error("email not found")
    const hashedPassword = user.password

    const salt = "123"

   

    const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex")
  
    console.log("PASSWORD", password)
    console.log("GIVEN",hashedPassword )
    console.log("HASHED", userProvidedHash)

    if (hashedPassword !== userProvidedHash) throw new Error("Incorrect password")
    
    return {...user, password : undefined, salt : undefined}



    



})

const USER = mongoose.model("user",userSchema)
module.exports = USER