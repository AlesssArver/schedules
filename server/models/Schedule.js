const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  owner: {
      type: Types.ObjectId,
      ref: 'User'
  }
});

module.exports = model('Schedule', schema)