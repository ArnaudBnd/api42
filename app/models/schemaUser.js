var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({  
  name: String,
  gender: String
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
