const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Le nom d\'utilisateur est requis.'],
      unique: true,
      trim: true,
      minlength: [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères.'],
      maxlength: [30, 'Le nom d\'utilisateur ne peut pas dépasser 30 caractères.']
    },
    email: {
      type: String,
      required: [true, 'L\'email est requis.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Format d\'email invalide.']
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);