const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  original: {
    type: String,
    required: true
  },
  shorted: {
    type: String,
    required: true
  }
})

module.export = mongoose.model('Url', urlSchema)