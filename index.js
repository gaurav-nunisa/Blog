const mongoose = require("mongoose")
const path = require("path")
const express = require("express")
const app = express()
const port = 3000

const {BLOG} = require("./models/blogModel")
const userSignRoute = require("./routes/userSignRoutes")
const cookieParser = require("cookie-parser")
const { checkForAuthenticationCookie } = require("./middlewares/checkUserOnline")
const blogRoute = require("./routes/blogRoutes")
mongoose.connect("mongodb://localhost:27017/blogDB").then(console.log("Database connected")).catch((err) => console.log(err))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cookieParser())
app.use(checkForAuthenticationCookie("Cookie token"))


app.use(express.static("public"))
app.get("/",  async(req, res) => {
    const allBlogs = await BLOG.find({})
    res.render("home", {
        user : req.user,
        blogs : allBlogs
        })
    })
    
app.use("/user", userSignRoute)
app.use("/blog", blogRoute)

app.listen(port, () => console.log(`Server running on port ${port}`))


