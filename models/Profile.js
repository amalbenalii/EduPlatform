// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'L\'utilisateur est requis pour créer un profil.'],
      unique: true // Un utilisateur ne peut avoir qu'un seul profil
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'La biographie ne peut pas dépasser 500 caractères.']
    },
    website: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
        'Format d\'URL invalide.'
      ]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Profile', profileSchema);