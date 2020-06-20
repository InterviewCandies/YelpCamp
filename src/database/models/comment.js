const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    author : {
        id : {
            type : mongoose.Types.ObjectId,
            ref : 'User'
        },
        username : String
    },
    content : String
})

module.exports = mongoose.model("Comment", commentSchema);