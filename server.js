// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenue sur l\'API Platform Educative',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      courses: '/api/courses'
    }
  });
});

// Importer les routes
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');

// Utiliser les routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// Middlewares de gestion d'erreurs (doivent être en dernier)
app.use(notFound);
app.use(errorHandler);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Mode: ${process.env.NODE_ENV || 'development'}`);
});