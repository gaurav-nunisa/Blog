const mongoose = require("mongoose")
const path = require("path")
const express = require("express")
const app = express()
const port = 3000
const userSignRoute = require("./routes/userSignRoutes")

mongoose.connect("mongodb://localhost:27017/blogDB").then(console.log("Database connected")).catch((err) => console.log(err))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended : true}))

app.get("/",  (req, res) => {
    return res.render("home")
    
})
app.use("/user", userSignRoute)
app.listen(port, () => console.log(`Server running on port ${port}`))