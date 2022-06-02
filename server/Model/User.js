const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username : String,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})
module.exports = mongoose.model('User', userSchema);