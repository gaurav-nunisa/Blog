const mongoose = require("mongoose")
const { Schema, model } = require("mongoose");
const BlogSchema = new Schema({
    title :{
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true,

    },
    createdBy : {
        type : String,
        ref : "user",
        required : true
    },
    coverImageURL:{
        type : String,
        required : false
    }
}, {timestamps : true})

const BLOG = model("Blog", BlogSchema)
module.exports = {
    BLOG
}