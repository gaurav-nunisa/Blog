const {Router} = require('express')
const router = Router()


const USER = require('../models/userModel')
const { sign } = require('crypto')

router.get("/signin", (req, res)=>{
    return res.render("signin")
})
router.post("/signin", async (req, res)=>{
    const {email, password} = req.body
    try {
        const token = await USER.matchPasswordAndGenerateToken(email, password)
        console.log(token)
        return res.cookie("Cookie token", token).redirect("/")
     
        
    } catch (error) {
        return res.render("signin", {error : "Invalid email or password"})
        
    }
   
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
router.get("/logout", (req, res)=>{
    res.clearCookie("Cookie token").redirect("/")
})


module.exports = router

