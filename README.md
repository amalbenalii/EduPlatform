#  Platform Educative API

> API REST complète pour une plateforme éducative permettant la gestion d'utilisateurs, de cours, de profils et d'avis.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)


---

##  À propos

**Platform Educative API** est une API REST backend développée avec Node.js et Express.js. Elle permet de gérer une plateforme éducative complète avec :

- Gestion des utilisateurs et de leurs profils
- Création et gestion de cours
- Système d'inscription aux cours (Many-to-Many)
- Système d'avis et de notation (1-5 étoiles)

L'API suit les principes RESTful et utilise MongoDB comme base de données avec Mongoose pour la modélisation des données.

---

## Fonctionnalités

###  Gestion des utilisateurs
- Création et récupération d'utilisateurs
- Validation des données (email, username)
- Consultation des cours suivis par un utilisateur

###  Gestion des cours
- Création et consultation de cours
- Association d'instructeurs aux cours
- Suivi des étudiants inscrits

###  Profils utilisateurs
- Création de profils personnalisés (relation 1-to-1)
- Mise à jour de biographie et site web
- Validation des URLs

###  Inscriptions
- Système d'inscription Many-to-Many
- Prévention des inscriptions multiples
- Consultation des étudiants par cours

###  Système d'avis
- Notation des cours (1-5 étoiles)
- Commentaires optionnels
- Un seul avis par utilisateur et par cours

---

##  Technologies utilisées

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

##  Architecture du projet

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

##  Installation

### Prérequis

Assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure) - [Télécharger](https://nodejs.org/)
- **npm** (inclus avec Node.js)
- **MongoDB** (local ou MongoDB Atlas) - [Télécharger](https://www.mongodb.com/try/download/community) ou [Atlas](https://www.mongodb.com/cloud/atlas)

### Étapes d'installation

1. **Cloner ou télécharger le projet**

```bash
cd EduPlatform
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

##  Configuration

### Configuration MongoDB

```env
MONGO_URI=mongodb://localhost:27017/platformeducative
```


## Utilisation

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

#### Route racine

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

####  Utilisateurs

| Méthode | Endpoint | Description | Body requis |
|---------|----------|-------------|-------------|
| `POST` | `/api/users` | Créer un utilisateur | `username`, `email` |
| `GET` | `/api/users` | Liste tous les utilisateurs | - |
| `GET` | `/api/users/:id` | Récupérer un utilisateur | - |
| `GET` | `/api/users/:userId/courses` | Cours d'un utilisateur | - |

---

####  Cours

| Méthode | Endpoint | Description | Body requis |
|---------|----------|-------------|-------------|
| `POST` | `/api/courses` | Créer un cours | `title`, `description`, `instructor` |
| `GET` | `/api/courses` | Liste tous les cours | - |
| `GET` | `/api/courses/:id` | Récupérer un cours | - |
| `POST` | `/api/courses/:courseId/enroll` | Inscrire un utilisateur | `userId` |
| `GET` | `/api/courses/:courseId/students` | Étudiants d'un cours | - |

---

####  Profils

| Méthode | Endpoint | Description | Body requis |
|---------|----------|-------------|-------------|
| `POST` | `/api/users/:userId/profile` | Créer un profil | `bio`, `website` (optionnels) |
| `GET` | `/api/users/:userId/profile` | Récupérer un profil | - |
| `PUT` | `/api/users/:userId/profile` | Mettre à jour un profil | `bio`, `website` (optionnels) |

---

####  Avis

| Méthode | Endpoint | Description | Body requis |
|---------|----------|-------------|-------------|
| `POST` | `/api/courses/:courseId/reviews` | Ajouter un avis | `rating`, `userId`, `comment` (optionnel) |
| `GET` | `/api/courses/:courseId/reviews` | Liste des avis d'un cours | - |

---


##  Relations entre modèles

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

### Middleware d'erreurs

Les erreurs sont gérées de manière centralisée via `errorMiddleware.js` :

- Détection automatique des erreurs Mongoose (ValidationError, CastError)
- Gestion des doublons (code 11000)
- Messages d'erreur en français
- Stack trace uniquement en développement


