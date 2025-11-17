// middleware/errorMiddleware.js

// Middleware pour les routes non trouvées (404)
const notFound = (req, res, next) => {
  const error = new Error(`Route non trouvée - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware de gestion d'erreurs global
const errorHandler = (err, req, res, next) => {
  // Parfois, une erreur peut arriver avec un code de succès (200)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Erreur spécifique Mongoose : ID invalide (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = 'ID invalide ou mal formaté.';
  }

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Erreur de duplication (ex: email ou username déjà existant)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} existe déjà. Veuillez en choisir un autre.`;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = { notFound, errorHandler };