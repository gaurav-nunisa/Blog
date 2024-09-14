const mongoose = require("mongoose")
const {Schema, model} = require("mongoose")
const commentSchema = new mongoose.Schema({
    content:{
        type : String,
        required : true
    },
    createdBy : {
        // type : Schema.Types.ObjectId,
        type : String,
        ref : "user",
        required : true
    },
    blogId:{
        type : Schema.Types.ObjectId,
        ref : "blog",
        required : true
    }
}, {timestamps : true})

const COMMENT = model("comment", commentSchema)
module.exports = {COMMENT}