const express = require("express")
const { BLOG } = require("../models/blogModel")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const {COMMENT} = require("../models/commentModel")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(`./public/uploads`));
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single("coverImage"), async (req, res) => {
    console.log(req.file); // Should log the uploaded file details
    const userIdBlog = req.user.id
  
    const {title, body} = req.body
    const blog = await BLOG.create({
            title, 
            body, 
            createdBy : userIdBlog,
            coverImageURL :`/uploads/${req.file.filename}`,


            
    })
    console.log("createdBY in Blog", blog.createdBy)
    return res.redirect(`/blog/${blog._id}`)

})

router.get("/add-new", (req, res)=>{
    return res.render("addBlog", {
        user : req.user
})
})


router.post("/comment/:blogId", async(req, res)=>{


       // Log req.user to verify its structure
       console.log("req.user from COMMENT.CREATE", req.user);
       console.log("req.user._id", req.user.id);

       // Explicitly extract the user ID
       const userIdComment = req.user ? req.user.id : null;
       console.log("userId", userIdComment);
   
       // Validate that the userId is present
       if (!userIdComment) {
           return res.status(400).send("User not authenticated or missing user ID");
       }



    await COMMENT.create({
        content : req.body.content,
        createdBy : userIdComment,//createdBy is mentioned in the comment model and references the user db
        blogId : req.params.blogId
    })
    

    return res.redirect(`/blog/${req.params.blogId}`)

})

router.get("/:id", async(req, res)=>{
    const {id} = req.params
    const blogById = await BLOG.findById(id).populate("createdBy")
    const comments = await COMMENT.find({blogId: req.params.id}).populate("createdBy")

    console.log("BLOGBYID-------------", blogById)
    console.log("comments", comments)
    
    console.log("req.user", req.user)

    return res.render("blog", {
        blogById,
        user : req.user,
        comments
    })
   
})



module.exports = router