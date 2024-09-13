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
        type : Schema.Types.ObjectId,
        ref : "user",
    },
    profileImageURL:{
        type : String,
        required : false
    }
}, {timestamps : true})

const BLOG = model("Blog", BlogSchema)
module.exports = {
    BLOG
}