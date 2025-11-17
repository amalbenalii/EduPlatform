const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Créer un profil pour un utilisateur
// @route   POST /api/users/:userId/profile
const createProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { bio, website } = req.body;

  // Vérifier que l'utilisateur existe
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('Utilisateur non trouvé.');
  }

  // Vérifier si un profil existe déjà pour cet utilisateur
  const existingProfile = await Profile.findOne({ user: userId });
  if (existingProfile) {
    res.status(400);
    throw new Error('Un profil existe déjà pour cet utilisateur.');
  }

  const profile = await Profile.create({
    user: userId,
    bio,
    website
  });

  res.status(201).json(profile);
});

// @desc    Récupérer le profil d'un utilisateur
// @route   GET /api/users/:userId/profile
const getUserProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.params.userId }).populate(
    'user',
    'username email'
  );

  if (!profile) {
    res.status(404);
    throw new Error('Profil non trouvé pour cet utilisateur.');
  }

  res.status(200).json(profile);
});

// @desc    Mettre à jour le profil d'un utilisateur
// @route   PUT /api/users/:userId/profile

const updateUserProfile = asyncHandler(async (req, res) => {
  const { bio, website } = req.body;

  const profile = await Profile.findOne({ user: req.params.userId });

  if (!profile) {
    res.status(404);
    throw new Error('Profil non trouvé pour cet utilisateur.');
  }

  profile.bio = bio || profile.bio;
  profile.website = website || profile.website;

  const updatedProfile = await profile.save();
  res.status(200).json(updatedProfile);
});

module.exports = {
  createProfile,
  getUserProfile,
  updateUserProfile
};