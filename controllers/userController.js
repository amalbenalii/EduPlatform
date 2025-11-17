const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Créer un nouvel utilisateur
// @route   POST /api/users
const createUser = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    res.status(400);
    throw new Error('Veuillez fournir un nom d\'utilisateur et un email.');
  }

  const user = await User.create({ username, email });
  res.status(201).json(user);
});

// @desc    Récupérer tous les utilisateurs
// @route   GET /api/users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate('courses', 'title instructor');
  res.status(200).json(users);
});

// @desc    Récupérer un utilisateur par ID
// @route   GET /api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate('courses', 'title instructor');

  if (!user) {
    res.status(404);
    throw new Error('Utilisateur non trouvé.');
  }

  res.status(200).json(user);
});

// @desc    Récupérer les cours d'un utilisateur
// @route   GET /api/users/:userId/courses
const getUserCourses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).populate('courses');

  if (!user) {
    res.status(404);
    throw new Error('Utilisateur non trouvé.');
  }

  res.status(200).json(user.courses);
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserCourses
};