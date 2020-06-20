const mongoose = require('mongoose');
const campSchema = new mongoose.Schema({
    name : String,
    image : String,
    description: String,
    price: String,
    author : {
        id : {
            type : mongoose.Types.ObjectId,
            ref : 'User'
        },
        username : String
    },
    comments : [ {
        type : mongoose.Types.ObjectId,
        ref : "Comment"
    }]
});
module.exports = mongoose.model("Camp", campSchema)
