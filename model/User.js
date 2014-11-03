// Generated by CoffeeScript 1.8.0
(function() {
  var mongoose, _User;

  mongoose = require('mongoose');

  _User = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  });

  module.exports = mongoose.model('User', _User);

}).call(this);

//# sourceMappingURL=User.js.map
