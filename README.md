# AI Explorer - Full Stack Authentication Application

![AI Explorer Banner](https://img.shields.io/badge/AI%20Explorer-Authentication%20System-purple)

A modern full-stack authentication system built with React and NestJS, featuring secure user registration and login functionality with JWT authentication.

## 🌐 Live Demo

The application is deployed and available for testing at:

- Frontend: [http://212.132.93.153:8080/](http://212.132.93.153:8080/)
- Backend API: [http://212.132.93.153:3000/](http://212.132.93.153:3000/)

Feel free to test the application with the following credentials:

- Email: demo@example.com
- Password: Demo@123

## 📚 Table of Contents

- Features
- Tech Stack
- Project Structure
- Getting Started
  - Prerequisites
  - Frontend Setup
  - Backend Setup
- API Documentation
- Authentication Flow
- Future Enhancements
- Contributing

## ✨ Features

- **Secure User Authentication System**

  - Registration with email validation
  - Login with JWT authentication
  - Protected routes for authenticated users
  - Responsive design across devices

- **Modern Frontend**

  - Clean and intuitive UI with Tailwind CSS
  - Form validation with meaningful error messages
  - Interactive components using shadcn/ui library
  - Toast notifications for user feedback

- **Robust Backend**
  - RESTful API architecture
  - TypeORM integration with MongoDB
  - JWT token-based authentication
  - Password hashing with bcrypt

## 🛠️ Tech Stack

### Frontend

- **React** - UI library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and state management
- **React Hook Form** - Form handling with validation
- **shadcn/ui** - UI component library
- **Zod** - Schema validation

### Backend

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type safety
- **TypeORM** - ORM for MongoDB
- **MongoDB** - NoSQL database
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Class Validator** - Input validation

## 🏗️ Project Structure

### Frontend Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   │   ├── button.tsx   # Button component
│   │   ├── form.tsx     # Form components
│   │   ├── input.tsx    # Input component
│   │   └── ...          # Other UI components
│   └── auth/            # Authentication components
├── contexts/            # Context providers
├── hooks/               # Custom hooks
├── lib/                 # Utilities and helpers
├── models/              # TypeScript interfaces
├── pages/               # Application pages
├── services/            # API services
└── App.tsx              # Main application component
```

### Backend Structure

```
backend/
├── src/
│   ├── modules/         # Feature modules
|   |   ├── auth/            # Authentication module
|   |   │   ├── auth.controller.ts
|   |   │   ├── auth.service.ts
|   |   │   └── jwt.strategy.ts
|   |   └── users/       # Users module
│   │       ├── user.entity.ts
│   │       ├── user.service.ts
│   │       └── mocks/   # Mock data
│   ├── entities/        # TypeORM entities
│   └── main.ts          # Application entry point
├── .env                 # Environment configuration
└── docker-compose.yml   # Docker configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Docker and Docker Compose (optional)

### Option 1: Local Development Setup

#### Frontend Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd ai-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:8080`.

#### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables as needed:

```
# Database
DATABASE_URL=mongodb://localhost:27017/authApp

# Auth
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-jwt-key-change-in-production"
```

4. Start the development server:

```bash
npm run start:dev
```

The backend API will be available at `http://localhost:3000`.

### Option 2: Docker Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd ai-explorer
```

2. Build and start the containers:

```bash
docker-compose up --build
```

This will:

- Start MongoDB container
- Build and start the backend container
- Build and start the frontend container

3. Access the applications:

- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:3000`
- MongoDB: `mongodb://localhost:27017`

4. To stop the containers:

```bash
docker-compose down
```

### Environment Variables

#### Frontend (.env)

```
VITE_API_URL=http://localhost:3000
```

#### Backend (.env)

```
# Database
DATABASE_URL=mongodb://mongo:27017/authApp

# Auth
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-jwt-key-change-in-production"

# Server
PORT=3000
```

## 📡 API Documentation

### Authentication Endpoints

#### Register a New User

```
POST /auth/register
Body: { "email": "user@example.com", "name": "User Name", "password": "securePassword" }
```

#### Login

```
POST /auth/login
Body: { "email": "user@example.com", "password": "securePassword" }
```

Responses include a JWT token that should be included in subsequent requests as a Bearer token.

## 🔐 Authentication Flow

1. User registers or logs in via the frontend
2. Backend validates credentials and issues a JWT token
3. Frontend stores the JWT token in memory
4. Protected routes check for token validity before rendering
5. Token is included in API requests to access protected resources

## 🔮 Future Enhancements

- **Theme Support**

  - Dark/Light mode toggle
  - Custom theme colors
  - System theme detection
  - Theme persistence

- **Localization**

  - Multi-language support
  - Dynamic language switching
  - RTL layout support
  - Localized date/time formats

- **Password Reset Functionality**

  - Implement forgot password flow with email verification

- **User Profile Management**

  - Add ability to update profile information
  - Upload profile pictures

- **OAuth Integration**

  - Enable social login with Google, Facebook, etc.

- **Role-based Access Control**

  - Admin dashboard for user management
  - Different permission levels

- **Email Verification**

  - Verify user email addresses during registration

- **Enhanced Security**

  - Implement refresh tokens
  - Add rate limiting to prevent brute force attacks
  - Two-factor authentication

- **Optimization**
  - Implement caching for improved performance
  - Bundle size optimization

- **Unit Test Cases**
  - Unit test cases for both FE and BE.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
