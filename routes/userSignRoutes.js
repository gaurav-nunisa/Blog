const {Router} = require('express')
const router = Router()


const USER = require('../models/userModel')
const { sign } = require('crypto')

router.get("/signin", (req, res)=>{
    return res.render("signin")
})
router.post("/signin", async (req, res)=>{
    const {email, password} = req.body
    const user = USER.matchPassword(email, password)
    console.log("USER", user)

    if(!user){
        res.render("signin", {message : "Incorrect email or password"})
    }

    return res.redirect("/")
})

router.get("/signup", (req, res)=>{
    return res.render("signup")
})
router.post("/signup", async (req, res)=>{
    const{fullname, email, password} = req.body
    await USER.create({
        email,
        password,
        fullname, 

    })
    return res.redirect("/")

    
})


module.exports = router

