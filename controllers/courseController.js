const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Créer un nouveau cours
// @route   POST /api/courses

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, instructor } = req.body;

  // Validation manuelle
  if (!title || !description || !instructor) {
    res.status(400);
    throw new Error('Veuillez fournir un titre, une description et un instructeur.');
  }

  const course = await Course.create({ title, description, instructor });
  res.status(201).json(course);
});

// @desc    Récupérer tous les cours
// @route   GET /api/courses

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().populate('students', 'username email');
  res.status(200).json(courses);
});

// @desc    Récupérer un cours par ID
// @route   GET /api/courses/:id
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('students', 'username email');

  if (!course) {
    res.status(404);
    throw new Error('Cours non trouvé.');
  }

  res.status(200).json(course);
});

// @desc    Inscrire un utilisateur à un cours (Many-to-Many)
// @route   POST /api/courses/:courseId/enroll
const enrollUserInCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req.body;

  // Validation
  if (!userId) {
    res.status(400);
    throw new Error('L\'ID de l\'utilisateur est requis.');
  }

  const course = await Course.findById(courseId);
  const user = await User.findById(userId);

  if (!course || !user) {
    res.status(404);
    throw new Error('Cours ou utilisateur non trouvé.');
  }

  // Vérifier si l'utilisateur est déjà inscrit
  if (course.students.includes(userId)) {
    res.status(400);
    throw new Error('L\'utilisateur est déjà inscrit à ce cours.');
  }

  // Ajout de l'utilisateur au cours
  course.students.push(userId);
  await course.save();

  // Ajout du cours à l'utilisateur
  user.courses.push(courseId);
  await user.save();

  res.status(200).json({ 
    message: 'Inscription réussie.',
    course: course.title,
    student: user.username
  });
});

// @desc    Récupérer les étudiants d'un cours
// @route   GET /api/courses/:courseId/students
const getCourseStudents = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.courseId).populate(
    'students',
    'username email'
  );

  if (!course) {
    res.status(404);
    throw new Error('Cours non trouvé.');
  }

  res.status(200).json(course.students);
});

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  enrollUserInCourse,
  getCourseStudents
};