const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  enrollUserInCourse,
  getCourseStudents
} = require('../controllers/courseController');
const {
  addReview,
  getCourseReviews
} = require('../controllers/reviewController');

// Routes cours
router.route('/').post(createCourse).get(getAllCourses);
router.route('/:id').get(getCourseById);

// Routes inscriptions (relation Many-to-Many)
router.route('/:courseId/enroll').post(enrollUserInCourse);
router.route('/:courseId/students').get(getCourseStudents);

// Routes critiques (relation 1-to-Many)
router.route('/:courseId/reviews')
  .post(addReview)
  .get(getCourseReviews);

module.exports = router;