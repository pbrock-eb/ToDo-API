var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    dateCreated: Date,
})

UserSchema.plugin(mongoosePaginate)
var User= mongoose.model('User', UserSchema)

module.exports = User;