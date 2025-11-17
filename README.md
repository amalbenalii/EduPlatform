# 🎓 Platform Educative API

> API REST complète pour une plateforme éducative permettant la gestion d'utilisateurs, de cours, de profils et d'avis.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

---

## 📑 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies-utilisées)
- [Architecture](#-architecture-du-projet)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Documentation API](#-documentation-api)
- [Modèles de données](#-modèles-de-données)
- [Relations entre modèles](#-relations-entre-modèles)
- [Gestion des erreurs](#-gestion-des-erreurs)
- [Exemples de requêtes](#-exemples-de-requêtes)
- [Développement](#-développement)
- [Roadmap](#-roadmap)

---

## 🎯 À propos

**Platform Educative API** est une API REST backend développée avec Node.js et Express.js. Elle permet de gérer une plateforme éducative complète avec :

- Gestion des utilisateurs et de leurs profils
- Création et gestion de cours
- Système d'inscription aux cours (Many-to-Many)
- Système d'avis et de notation (1-5 étoiles)

L'API suit les principes RESTful et utilise MongoDB comme base de données avec Mongoose pour la modélisation des données.

---

## ✨ Fonctionnalités

### 🔐 Gestion des utilisateurs
- Création et récupération d'utilisateurs
- Validation des données (email, username)
- Consultation des cours suivis par un utilisateur

### 📚 Gestion des cours
- Création et consultation de cours
- Association d'instructeurs aux cours
- Suivi des étudiants inscrits

### 👤 Profils utilisateurs
- Création de profils personnalisés (relation 1-to-1)
- Mise à jour de biographie et site web
- Validation des URLs

### 🎓 Inscriptions
- Système d'inscription Many-to-Many
- Prévention des inscriptions multiples
- Consultation des étudiants par cours

### ⭐ Système d'avis
- Notation des cours (1-5 étoiles)
- Commentaires optionnels
- Un seul avis par utilisateur et par cours

---

## 🛠 Technologies utilisées

| Technologie | Version | Description |
|------------|---------|-------------|
| **Node.js** | 18+ | Environnement d'exécution JavaScript |
| **Express.js** | 5.1.0 | Framework web minimaliste et flexible |
| **MongoDB** | 6.0+ | Base de données NoSQL orientée documents |
| **Mongoose** | 8.19.2 | ODM (Object Data Modeling) pour MongoDB |
| **dotenv** | 17.2.3 | Gestion des variables d'environnement |
| **express-async-handler** | 1.2.0 | Gestion asynchrone des erreurs |
| **nodemon** | 3.1.10 | Outil de développement (rechargement auto) |

---

## 🏗 Architecture du projet

```
platformeducative/
│
├── config/
│   └── db.js                    # Configuration MongoDB
│
├── controllers/                 # Logique métier
│   ├── courseController.js     # Gestion des cours
│   ├── profileController.js     # Gestion des profils
│   ├── reviewController.js      # Gestion des avis
│   └── userController.js        # Gestion des utilisateurs
│
├── middleware/
│   └── errorMiddleware.js       # Gestion centralisée des erreurs
│
├── models/                      # Schémas Mongoose
│   ├── Course.js                # Modèle Course
│   ├── Profile.js               # Modèle Profile
│   ├── Review.js                # Modèle Review
│   └── User.js                  # Modèle User
│
├── routes/                      # Définition des routes
│   ├── courseRoutes.js          # Routes /api/courses
│   └── userRoutes.js            # Routes /api/users
│
├── server.js                    # Point d'entrée de l'application
├── package.json                 # Dépendances et scripts
├── .env                         # Variables d'environnement (à créer)
└── README.md                    # Documentation
```

### Structure MVC

Le projet suit une architecture **MVC (Model-View-Controller)** :

- **Models** : Définition des schémas de données (Mongoose)
- **Controllers** : Logique métier et traitement des requêtes
- **Routes** : Définition des endpoints et routage vers les contrôleurs
- **Middleware** : Gestion des erreurs et validation

---

## 📦 Installation

### Prérequis

Assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure) - [Télécharger](https://nodejs.org/)
- **npm** (inclus avec Node.js)
- **MongoDB** (local ou MongoDB Atlas) - [Télécharger](https://www.mongodb.com/try/download/community) ou [Atlas](https://www.mongodb.com/cloud/atlas)

### Étapes d'installation

1. **Cloner ou télécharger le projet**

```bash
cd platformeducative
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Créer le fichier `.env`** (voir section Configuration)

4. **Démarrer le serveur**

```bash
npm run dev
```

---

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Port du serveur
PORT=5000

# URI de connexion MongoDB
MONGO_URI=mongodb://localhost:27017/platformeducative

# Environnement
NODE_ENV=development
```

### Configuration MongoDB

#### Option 1 : MongoDB Local

```env
MONGO_URI=mongodb://localhost:27017/platformeducative
```

Assurez-vous que MongoDB est démarré localement :
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```


## ▶️ Utilisation

### Démarrage en mode développement

```bash
npm run dev
```

Le serveur démarre avec **nodemon** pour le rechargement automatique lors des modifications.

### Démarrage en mode production

```bash
npm start
```

### Vérification

Une fois le serveur démarré, vous devriez voir :

```
Serveur démarré sur http://localhost:5000
Mode: development
MongoDB connecté: localhost:27017
```

Testez l'API en accédant à : `http://localhost:5000`

---

## 📡 Documentation API

### Base URL

```
http://localhost:5000/api
```

### Endpoints disponibles

#### 🏠 Route racine

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/` | Informations sur l'API |

**Réponse :**
```json
{
  "message": "Bienvenue sur l'API Platform Educative",
  "version": "1.0.0",
  "endpoints": {
    "users": "/api/users",
    "courses": "/api/courses"
  }
}
```

---

#### 👥 Utilisateurs

| Méthode | Endpoint | Description | Body requis |
|---------|----------|-------------|-------------|
| `POST` | `/api/users` | Créer un utilisateur | `username`, `email` |
| `GET` | `/api/users` | Liste tous les utilisateurs | - |
| `GET` | `/api/users/:id` | Récupérer un utilisateur | - |
| `GET` | `/api/users/:userId/courses` | Cours d'un utilisateur | - |

---

#### 📚 Cours

| Méthode | Endpoint | Description | Body requis |
|---------|----------|-------------|-------------|
| `POST` | `/api/courses` | Créer un cours | `title`, `description`, `instructor` |
| `GET` | `/api/courses` | Liste tous les cours | - |
| `GET` | `/api/courses/:id` | Récupérer un cours | - |
| `POST` | `/api/courses/:courseId/enroll` | Inscrire un utilisateur | `userId` |
| `GET` | `/api/courses/:courseId/students` | Étudiants d'un cours | - |

---

#### 👤 Profils

| Méthode | Endpoint | Description | Body requis |
|---------|----------|-------------|-------------|
| `POST` | `/api/users/:userId/profile` | Créer un profil | `bio`, `website` (optionnels) |
| `GET` | `/api/users/:userId/profile` | Récupérer un profil | - |
| `PUT` | `/api/users/:userId/profile` | Mettre à jour un profil | `bio`, `website` (optionnels) |

---

#### ⭐ Avis

| Méthode | Endpoint | Description | Body requis |
|---------|----------|-------------|-------------|
| `POST` | `/api/courses/:courseId/reviews` | Ajouter un avis | `rating`, `userId`, `comment` (optionnel) |
| `GET` | `/api/courses/:courseId/reviews` | Liste des avis d'un cours | - |

---

## 🗄 Modèles de données

### User (Utilisateur)

```javascript
{
  _id: ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  courses: [ObjectId],  // Références vers Course
  createdAt: Date,
  updatedAt: Date
}
```

### Course (Cours)

```javascript
{
  _id: ObjectId,
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 1000
  },
  instructor: {
    type: String,
    required: true,
    minlength: 3
  },
  students: [ObjectId],  // Références vers User
  createdAt: Date,
  updatedAt: Date
}
```

### Profile (Profil)

```javascript
{
  _id: ObjectId,
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  website: {
    type: String,
    match: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Review (Avis)

```javascript
{
  _id: ObjectId,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxlength: 500
  },
  course: {
    type: ObjectId,
    ref: 'Course',
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Contrainte** : Index unique sur `(course, user)` - Un utilisateur ne peut laisser qu'un seul avis par cours.

---

## 🔗 Relations entre modèles

### Diagramme de relations

```
┌─────────┐         Many-to-Many        ┌─────────┐
│  User   │◄──────────────────────────►│ Course │
└────┬────┘                             └────┬────┘
     │                                       │
     │ One-to-One                           │ One-to-Many
     │                                       │
     ▼                                       ▼
┌─────────┐                            ┌─────────┐
│ Profile │                            │ Review  │
└─────────┘                            └────┬────┘
                                            │
                                            │ Many-to-One
                                            │
                                     ┌──────┴──────┐
                                     │    User     │
                                     └─────────────┘
```

### Détails des relations

1. **User ↔ Course (Many-to-Many)**
   - Un utilisateur peut s'inscrire à plusieurs cours
   - Un cours peut avoir plusieurs étudiants
   - Stockage bidirectionnel : `User.courses[]` et `Course.students[]`

2. **User ↔ Profile (One-to-One)**
   - Un utilisateur a exactement un profil
   - Un profil appartient à un seul utilisateur
   - Contrainte d'unicité garantie par l'index unique

3. **Course ↔ Review (One-to-Many)**
   - Un cours peut avoir plusieurs avis
   - Un avis appartient à un seul cours

4. **User ↔ Review (One-to-Many avec contrainte)**
   - Un utilisateur peut laisser plusieurs avis (sur différents cours)
   - Un avis appartient à un seul utilisateur
   - **Contrainte** : Un utilisateur ne peut laisser qu'un seul avis par cours

---

## ⚠️ Gestion des erreurs

### Codes de statut HTTP

| Code | Description | Cas d'usage |
|------|-------------|-------------|
| `200` | OK | Requête réussie |
| `201` | Created | Ressource créée avec succès |
| `400` | Bad Request | Validation échouée, ID invalide, doublon |
| `404` | Not Found | Ressource non trouvée |
| `500` | Internal Server Error | Erreur serveur |

### Format de réponse d'erreur

```json
{
  "message": "Message d'erreur descriptif en français",
  "stack": "Stack trace (uniquement en mode développement)"
}
```

### Exemples d'erreurs

**Validation échouée (400)**
```json
{
  "message": "Le nom d'utilisateur doit contenir au moins 3 caractères."
}
```

**Ressource non trouvée (404)**
```json
{
  "message": "Utilisateur non trouvé."
}
```

**Doublon (400)**
```json
{
  "message": "email existe déjà. Veuillez en choisir un autre."
}
```

**ID invalide (400)**
```json
{
  "message": "ID invalide ou mal formaté."
}
```

---

## 💡 Exemples de requêtes

### 1. Créer un utilisateur

**Requête :**
```http
POST http://localhost:5000/api/users
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john.doe@example.com"
}
```

**Réponse (201) :**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "johndoe",
  "email": "john.doe@example.com",
  "courses": [],
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

### 2. Créer un cours

**Requête :**
```http
POST http://localhost:5000/api/courses
Content-Type: application/json

{
  "title": "Introduction à Node.js",
  "description": "Un cours complet pour apprendre les bases de Node.js, Express.js et la création d'APIs REST. Ce cours couvre les concepts fondamentaux jusqu'aux techniques avancées.",
  "instructor": "Jane Smith"
}
```

**Réponse (201) :**
```json
{
  "_id": "507f191e810c19729de860ea",
  "title": "Introduction à Node.js",
  "description": "Un cours complet pour apprendre les bases de Node.js...",
  "instructor": "Jane Smith",
  "students": [],
  "createdAt": "2024-01-15T10:35:00.000Z",
  "updatedAt": "2024-01-15T10:35:00.000Z"
}
```

---

### 3. Inscrire un utilisateur à un cours

**Requête :**
```http
POST http://localhost:5000/api/courses/507f191e810c19729de860ea/enroll
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439011"
}
```

**Réponse (200) :**
```json
{
  "message": "Inscription réussie.",
  "course": "Introduction à Node.js",
  "student": "johndoe"
}
```

---

### 4. Créer un profil utilisateur

**Requête :**
```http
POST http://localhost:5000/api/users/507f1f77bcf86cd799439011/profile
Content-Type: application/json

{
  "bio": "Développeur full-stack passionné par les technologies web modernes",
  "website": "https://johndoe.dev"
}
```

**Réponse (201) :**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "user": "507f1f77bcf86cd799439011",
  "bio": "Développeur full-stack passionné par les technologies web modernes",
  "website": "https://johndoe.dev",
  "createdAt": "2024-01-15T10:40:00.000Z",
  "updatedAt": "2024-01-15T10:40:00.000Z"
}
```

---

### 5. Ajouter un avis à un cours

**Requête :**
```http
POST http://localhost:5000/api/courses/507f191e810c19729de860ea/reviews
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent cours ! Les explications sont claires et les exemples pratiques très utiles.",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Réponse (201) :**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "rating": 5,
  "comment": "Excellent cours ! Les explications sont claires...",
  "course": {
    "_id": "507f191e810c19729de860ea",
    "title": "Introduction à Node.js"
  },
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john.doe@example.com"
  },
  "createdAt": "2024-01-15T10:45:00.000Z",
  "updatedAt": "2024-01-15T10:45:00.000Z"
}
```

---

### 6. Récupérer tous les cours avec leurs étudiants

**Requête :**
```http
GET http://localhost:5000/api/courses
```

**Réponse (200) :**
```json
[
  {
    "_id": "507f191e810c19729de860ea",
    "title": "Introduction à Node.js",
    "description": "Un cours complet...",
    "instructor": "Jane Smith",
    "students": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "username": "johndoe",
        "email": "john.doe@example.com"
      }
    ],
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:35:00.000Z"
  }
]
```

---

### 7. Récupérer les avis d'un cours

**Requête :**
```http
GET http://localhost:5000/api/courses/507f191e810c19729de860ea/reviews
```

**Réponse (200) :**
```json
{
  "count": 1,
  "reviews": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "rating": 5,
      "comment": "Excellent cours !...",
      "course": {
        "_id": "507f191e810c19729de860ea",
        "title": "Introduction à Node.js"
      },
      "user": {
        "_id": "507f1f77bcf86cd799439011",
        "username": "johndoe",
        "email": "john.doe@example.com"
      },
      "createdAt": "2024-01-15T10:45:00.000Z",
      "updatedAt": "2024-01-15T10:45:00.000Z"
    }
  ]
}
```

---

## 🛠 Développement

### Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm start` | Démarre le serveur en mode production |
| `npm run dev` | Démarre le serveur en mode développement avec nodemon |

### Structure des contrôleurs

Les contrôleurs utilisent `express-async-handler` pour gérer les erreurs asynchrones :

```javascript
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(async (req, res) => {
  // Logique métier
});
```

### Middleware d'erreurs

Les erreurs sont gérées de manière centralisée via `errorMiddleware.js` :

- Détection automatique des erreurs Mongoose (ValidationError, CastError)
- Gestion des doublons (code 11000)
- Messages d'erreur en français
- Stack trace uniquement en développement

---

## 🗺 Roadmap

### Améliorations prévues

- [ ] **Authentification & Autorisation**
  - [ ] JWT (JSON Web Tokens)
  - [ ] Hashage des mots de passe (bcrypt)
  - [ ] Système de rôles (admin, instructeur, étudiant)

- [ ] **Validation avancée**
  - [ ] express-validator ou Joi
  - [ ] Validation des fichiers uploadés

- [ ] **Fonctionnalités**
  - [ ] Pagination pour les listes
  - [ ] Recherche et filtres
  - [ ] Tri et tri multiple
  - [ ] Upload de fichiers (images de profil, vidéos de cours)

- [ ] **Sécurité**
  - [ ] Rate limiting
  - [ ] Helmet.js pour les en-têtes de sécurité
  - [ ] CORS configuré
  - [ ] Sanitization des entrées

- [ ] **Documentation**
  - [ ] Swagger/OpenAPI
  - [ ] Postman Collection
  - [ ] Diagrammes UML

- [ ] **Tests**
  - [ ] Tests unitaires (Jest)
  - [ ] Tests d'intégration
  - [ ] Tests E2E

- [ ] **DevOps**
  - [ ] Docker & Docker Compose
  - [ ] CI/CD (GitHub Actions)
  - [ ] Logging avancé (Winston)
  - [ ] Monitoring (PM2)

- [ ] **Performance**
  - [ ] Cache (Redis)
  - [ ] Index MongoDB optimisés
  - [ ] Compression (gzip)

---

## 📝 Notes importantes

### Limitations actuelles

- ❌ Pas d'authentification (toutes les routes sont publiques)
- ❌ Pas de validation avancée des entrées
- ❌ Pas de pagination (peut être problématique avec beaucoup de données)
- ❌ Pas de tests automatisés

### Bonnes pratiques implémentées

- ✅ Architecture MVC claire
- ✅ Gestion centralisée des erreurs
- ✅ Validation des données au niveau des modèles
- ✅ Messages d'erreur en français
- ✅ Relations MongoDB bien définies
- ✅ Timestamps automatiques (createdAt, updatedAt)

---

## 📄 Licence

Ce projet est sous licence **ISC**.

---

## 👤 Auteur

Développé dans le cadre d'un projet éducatif.

---

## 📚 Ressources

- [Documentation Express.js](https://expressjs.com/)
- [Documentation Mongoose](https://mongoosejs.com/)
- [Documentation MongoDB](https://docs.mongodb.com/)
- [REST API Best Practices](https://restfulapi.net/)

---

**Note** : Ce projet est une API backend. Pour une application complète, vous devrez créer un frontend (React, Vue, Angular, etc.) qui consomme cette API.
