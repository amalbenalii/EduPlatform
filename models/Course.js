// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre du cours est requis.'],
      unique: true,
      trim: true,
      minlength: [5, 'Le titre doit contenir au moins 5 caractères.'],
      maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères.']
    },
    description: {
      type: String,
      required: [true, 'La description du cours est requise.'],
      trim: true,
      minlength: [20, 'La description doit contenir au moins 20 caractères.'],
      maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères.']
    },
    instructor: {
      type: String,
      required: [true, 'Le nom de l\'instructeur est requis.'],
      trim: true,
      minlength: [3, 'Le nom de l\'instructeur doit contenir au moins 3 caractères.']
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Course', courseSchema);