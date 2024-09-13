const express = require("express")
const { BLOG } = require("../models/blogModel")
const router = express.Router()
const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination :(req, file, cb)=>{
        cb(null, path.resolve(`./public/uploads`))
    },
    filename :(req, file, cb)=>{
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename)

    }
})
const upload = multer({storage : storage})

router.get("/add-new", (req, res)=>{
    return res.render("addBlog", {
        user : req.user
})
})

router.post("/", upload.single("profileImage") ,async  (req, res)=>{
    console.log("req.user from / ", req.user)
    console.log("req.user._id from / ", req.user._id)
  
    const {title, body} = req.body
    const blog = await BLOG.create({
            title, 
            body, 
            createdBy : req.user._id,
            profileImageURL :`/uploads/${req.file.filename}`,
            
    })
    return res.redirect(`/blog/${blog._id}`)

})


module.exports = router