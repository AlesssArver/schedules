const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  // name: {
  //   type: String,
  //   required: true
  // },
  // surname: {
  //   type: String,
  //   required: true
  // },
  googleId: String,
  name: String,
  email: String,
  password: String,
  avatar: String,
  schedule: [{
    type: Types.ObjectId,
    ref: 'Schedule'
  }],
  todos: [{
    type: Types.ObjectId,
    ref: 'Todo'
  }]
});

module.exports = model('User', schema)