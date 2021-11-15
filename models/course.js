const mongoose = require('mongoose')
  const { Schema } = mongoose;

  const courseSchema = new Schema({
    id:Number,
    uniId:Number,
    name: String,
    profId: Number,
    studentIds :[Number]
  });

const courseModel = mongoose.model('courses', courseSchema)

module.exports.courseModel = courseModel
