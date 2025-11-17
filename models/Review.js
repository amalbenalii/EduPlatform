// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, 'La note est requise.'],
      min: [1, 'La note minimale est 1.'],
      max: [5, 'La note maximale est 5.']
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, 'Le commentaire ne peut pas dépasser 500 caractères.']
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Le cours est requis pour créer une critique.']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'L\'utilisateur est requis pour créer une critique.']
    }
  },
  {
    timestamps: true
  }
);

// Index pour éviter qu'un utilisateur laisse plusieurs critiques pour le même cours
reviewSchema.index({ course: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);