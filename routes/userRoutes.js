const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  getUserCourses
} = require('../controllers/userController');
const {
  createProfile,
  getUserProfile,
  updateUserProfile
} = require('../controllers/profileController');

// Routes utilisateurs
router.route('/').post(createUser).get(getAllUsers);
router.route('/:id').get(getUserById);

// Routes profils (relation 1-to-1)
router.route('/:userId/profile')
  .post(createProfile)
  .get(getUserProfile)
  .put(updateUserProfile);

// Route pour récupérer les cours d'un utilisateur
router.route('/:userId/courses').get(getUserCourses);

module.exports = router;