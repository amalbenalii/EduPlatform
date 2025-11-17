const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Créer une critique pour un cours
// @route   POST /api/courses/:courseId/reviews
const addReview = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { rating, comment, userId } = req.body;

  if (!rating || !userId) {
    res.status(400);
    throw new Error('La note et l\'ID de l\'utilisateur sont requis.');
  }

  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404);
    throw new Error('Cours non trouvé.');
  }

  // Vérifier que l'utilisateur existe
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('Utilisateur non trouvé.');
  }

  // Vérifier si l'utilisateur a déjà laissé une critique pour ce cours
  const existingReview = await Review.findOne({ course: courseId, user: userId });
  if (existingReview) {
    res.status(400);
    throw new Error('Vous avez déjà laissé une critique pour ce cours.');
  }

  const review = await Review.create({
    rating,
    comment,
    course: courseId,
    user: userId
  });

  // Populer les informations pour la réponse
  await review.populate('user', 'username email');
  await review.populate('course', 'title');

  res.status(201).json(review);
});

// @desc    Récupérer toutes les critiques d'un cours
// @route   GET /api/courses/:courseId/reviews
const getCourseReviews = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404);
    throw new Error('Cours non trouvé.');
  }

  const reviews = await Review.find({ course: courseId })
    .populate('user', 'username email')
    .populate('course', 'title')
    .sort({ createdAt: -1 }); // Tri par date décroissante

  res.status(200).json({
    count: reviews.length,
    reviews
  });
});

module.exports = {
  addReview,
  getCourseReviews
};