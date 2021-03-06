const mongoose = require('mongoose');
const passwordLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username : String,
    password : String
})
UserSchema.plugin(passwordLocalMongoose);
module.exports = mongoose.model('User', UserSchema);