# Platform Educative API

Une API REST complète pour une plateforme éducative, développée avec Node.js, Express et MongoDB. Cette application permet de gérer des utilisateurs, des cours, des profils utilisateurs, des inscriptions aux cours et des avis/notes.

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [API Endpoints](#api-endpoints)
- [Modèles de données](#modèles-de-données)
- [Relations entre modèles](#relations-entre-modèles)
- [Gestion des erreurs](#gestion-des-erreurs)
- [Exemples d'utilisation](#exemples-dutilisation)
- [Scripts disponibles](#scripts-disponibles)
- [Auteur](#auteur)

## ✨ Fonctionnalités

- **Gestion des utilisateurs** : Création, récupération et consultation des utilisateurs
- **Gestion des cours** : Création et consultation des cours avec instructeurs
- **Profils utilisateurs** : Création et mise à jour de profils (biographie, site web)
- **Inscriptions aux cours** : Système d'inscription Many-to-Many entre utilisateurs et cours
- **Système d'avis** : Ajout et consultation d'avis/notes pour les cours (1-5 étoiles)
- **Validation des données** : Validation complète avec messages d'erreur personnalisés
- **Gestion d'erreurs** : Middleware de gestion d'erreurs centralisé

## 🛠 Technologies utilisées

- **Node.js** : Environnement d'exécution JavaScript
- **Express.js** (v5.1.0) : Framework web pour Node.js
- **MongoDB** : Base de données NoSQL
- **Mongoose** (v8.19.2) : ODM (Object Data Modeling) pour MongoDB
- **dotenv** (v17.2.3) : Gestion des variables d'environnement
- **express-async-handler** (v1.2.0) : Gestion asynchrone des erreurs
- **nodemon** (v3.1.10) : Outil de développement pour rechargement automatique

## 📁 Structure du projet

```
platformeducative/
├── config/
│   └── db.js                 # Configuration de la connexion MongoDB
├── controllers/
│   ├── courseController.js   # Contrôleurs pour les cours
│   ├── profileController.js  # Contrôleurs pour les profils
│   ├── reviewController.js   # Contrôleurs pour les avis
│   └── userController.js     # Contrôleurs pour les utilisateurs
├── middleware/
│   └── errorMiddleware.js    # Middleware de gestion d'erreurs
├── models/
│   ├── Course.js             # Modèle de données Course
│   ├── Profile.js            # Modèle de données Profile
│   ├── Review.js             # Modèle de données Review
│   └── User.js               # Modèle de données User
├── routes/
│   ├── courseRoutes.js       # Routes pour les cours
│   └── userRoutes.js         # Routes pour les utilisateurs
├── server.js                 # Point d'entrée de l'application
├── package.json              # Dépendances et scripts
└── README.md                 # Documentation du projet
```

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 14 ou supérieure)
- **npm** (généralement inclus avec Node.js)
- **MongoDB** (localement ou une instance MongoDB Atlas)

## 🚀 Installation

1. **Cloner le dépôt** (ou naviguer vers le dossier du projet)

```bash
cd platformeducative
```

2. **Installer les dépendances**

```bash
npm install
```

## ⚙️ Configuration

1. **Créer un fichier `.env`** à la racine du projet :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/platformeducative
NODE_ENV=development
```

**Pour MongoDB Atlas** (cloud) :
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/platformeducative?retryWrites=true&w=majority
```

2. **Ajuster les variables d'environnement** selon votre configuration :
   - `PORT` : Port sur lequel le serveur écoutera (par défaut: 5000)
   - `MONGO_URI` : URI de connexion à votre base de données MongoDB
   - `NODE_ENV` : Environnement d'exécution (development, production)

## ▶️ Démarrage

### Mode développement (avec rechargement automatique)

```bash
npm run dev
```

### Mode production

```bash
npm start
```

Le serveur démarre sur `http://localhost:5000` (ou le port spécifié dans `.env`).

Vous devriez voir dans la console :
```
Serveur démarré sur http://localhost:5000
Mode: development
MongoDB connecté: ...
```

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Route racine
- **GET** `/` - Message de bienvenue et informations sur l'API

### 👥 Utilisateurs (`/api/users`)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/users` | Créer un nouvel utilisateur |
| GET | `/api/users` | Récupérer tous les utilisateurs |
| GET | `/api/users/:id` | Récupérer un utilisateur par ID |
| GET | `/api/users/:userId/courses` | Récupérer les cours d'un utilisateur |

### 📚 Cours (`/api/courses`)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/courses` | Créer un nouveau cours |
| GET | `/api/courses` | Récupérer tous les cours |
| GET | `/api/courses/:id` | Récupérer un cours par ID |
| POST | `/api/courses/:courseId/enroll` | Inscrire un utilisateur à un cours |
| GET | `/api/courses/:courseId/students` | Récupérer les étudiants d'un cours |

### 👤 Profils (`/api/users/:userId/profile`)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/users/:userId/profile` | Créer un profil pour un utilisateur |
| GET | `/api/users/:userId/profile` | Récupérer le profil d'un utilisateur |
| PUT | `/api/users/:userId/profile` | Mettre à jour le profil d'un utilisateur |

### ⭐ Avis (`/api/courses/:courseId/reviews`)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/courses/:courseId/reviews` | Ajouter un avis à un cours |
| GET | `/api/courses/:courseId/reviews` | Récupérer tous les avis d'un cours |

## 🗄 Modèles de données

### User (Utilisateur)
```javascript
{
  username: String (requis, unique, 3-30 caractères),
  email: String (requis, unique, format email valide),
  courses: [ObjectId] (références vers Course),
  createdAt: Date,
  updatedAt: Date
}
```

### Course (Cours)
```javascript
{
  title: String (requis, unique, 5-100 caractères),
  description: String (requis, 20-1000 caractères),
  instructor: String (requis, min 3 caractères),
  students: [ObjectId] (références vers User),
  createdAt: Date,
  updatedAt: Date
}
```

### Profile (Profil)
```javascript
{
  user: ObjectId (requis, unique, référence vers User),
  bio: String (optionnel, max 500 caractères),
  website: String (optionnel, format URL valide),
  createdAt: Date,
  updatedAt: Date
}
```

### Review (Avis)
```javascript
{
  rating: Number (requis, 1-5),
  comment: String (optionnel, max 500 caractères),
  course: ObjectId (requis, référence vers Course),
  user: ObjectId (requis, référence vers User),
  createdAt: Date,
  updatedAt: Date
}
```

**Note** : Un utilisateur ne peut laisser qu'un seul avis par cours (index unique sur `course` et `user`).

## 🔗 Relations entre modèles

1. **User ↔ Course (Many-to-Many)**
   - Un utilisateur peut s'inscrire à plusieurs cours
   - Un cours peut avoir plusieurs étudiants
   - Relation bidirectionnelle via les tableaux `courses` (User) et `students` (Course)

2. **User ↔ Profile (One-to-One)**
   - Un utilisateur a un seul profil
   - Un profil appartient à un seul utilisateur
   - Contrainte d'unicité sur le champ `user` dans Profile

3. **Course ↔ Review (One-to-Many)**
   - Un cours peut avoir plusieurs avis
   - Un avis appartient à un seul cours

4. **User ↔ Review (One-to-Many)**
   - Un utilisateur peut laisser plusieurs avis (sur différents cours)
   - Un avis appartient à un seul utilisateur
   - Un utilisateur ne peut laisser qu'un seul avis par cours

## ⚠️ Gestion des erreurs

L'API utilise un middleware de gestion d'erreurs centralisé qui gère :

- **404** : Route non trouvée
- **400** : Erreurs de validation, ID invalide, doublons
- **500** : Erreurs serveur

Format de réponse d'erreur :
```json
{
  "message": "Message d'erreur descriptif",
  "stack": "Stack trace (uniquement en développement)"
}
```

## 💡 Exemples d'utilisation

### Créer un utilisateur
```bash
POST http://localhost:5000/api/users
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com"
}
```

### Créer un cours
```bash
POST http://localhost:5000/api/courses
Content-Type: application/json

{
  "title": "Introduction à Node.js",
  "description": "Un cours complet pour apprendre les bases de Node.js et Express.js",
  "instructor": "Jane Smith"
}
```

### Inscrire un utilisateur à un cours
```bash
POST http://localhost:5000/api/courses/COURSE_ID/enroll
Content-Type: application/json

{
  "userId": "USER_ID"
}
```

### Créer un profil
```bash
POST http://localhost:5000/api/users/USER_ID/profile
Content-Type: application/json

{
  "bio": "Développeur passionné par les technologies web",
  "website": "https://johndoe.dev"
}
```

### Ajouter un avis
```bash
POST http://localhost:5000/api/courses/COURSE_ID/reviews
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent cours, très bien expliqué !",
  "userId": "USER_ID"
}
```

### Récupérer tous les cours avec leurs étudiants
```bash
GET http://localhost:5000/api/courses
```

### Récupérer les avis d'un cours
```bash
GET http://localhost:5000/api/courses/COURSE_ID/reviews
```

## 📜 Scripts disponibles

- `npm start` : Démarrer le serveur en mode production
- `npm run dev` : Démarrer le serveur en mode développement avec nodemon (rechargement automatique)

## 🔒 Sécurité et améliorations futures

**Recommandations pour la production :**

- [ ] Ajouter l'authentification (JWT)
- [ ] Implémenter l'autorisation (rôles utilisateurs)
- [ ] Ajouter la validation avec des bibliothèques comme `express-validator` ou `joi`
- [ ] Implémenter la pagination pour les listes
- [ ] Ajouter le rate limiting
- [ ] Configurer CORS correctement
- [ ] Ajouter des tests unitaires et d'intégration
- [ ] Implémenter la documentation Swagger/OpenAPI
- [ ] Ajouter le logging avec Winston ou Morgan
- [ ] Configurer HTTPS

## 📝 Auteur

Développé dans le cadre d'un projet éducative.

## 📄 Licence

ISC

---

**Note** : Ce projet est une API backend. Pour une application complète, vous devrez créer un frontend (React, Vue, Angular, etc.) qui consomme cette API.

