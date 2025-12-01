# WatchWisely

**WatchWisely** is a modern movie streaming application designed to provide users with a seamless experience for discovering and watching movies. This project is structured as a monorepo, encompassing both a React Native (Expo) frontend for mobile platforms and a robust Node.js (Express) backend API.

## Features

-   **Movie Discovery:** Browse a wide selection of movies.
-   **User Authentication:** Secure user registration and login using JWT.
-   **Personalized Profiles:** User-specific settings and preferences.
-   *(Further features can be added here as the application develops)*

## Project Structure

This project is organized as a monorepo, managed using npm workspaces, facilitating unified dependency management and development workflows.

```
.
├── frontend/          # React Native (Expo) mobile application
├── backend/           # Node.js Express API server
└── package.json       # Root package.json for monorepo scripts and dependencies
```

## Tech Stack

### Frontend (React Native with Expo)

-   **Framework:** React Native
-   **Platform:** Expo
-   **Navigation:** Expo Router
-   **State Management:** Redux Toolkit
-   **HTTP Client:** Axios
-   **Styling:** React Native's built-in styling
-   **Linting:** ESLint with `eslint-config-expo`

### Backend (Node.js with Express)

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB with Mongoose ODM
-   **Authentication:** JSON Web Tokens (JWT)
-   **Password Hashing:** bcrypt
-   **Environment Variables:** dotenv
-   **Development Server:** nodemon (for automatic restarts during development)

## Building and Running

### Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/en/) (LTS version recommended) and npm
-   A running [MongoDB](https://www.mongodb.com/) instance (local or cloud-hosted)

You will also need to obtain API keys for:

-   [TMDB API](https://www.themoviedb.org/documentation/api) (for movie data on the frontend)

### Installation

To set up the project, navigate to the root directory and install all dependencies for both the frontend and backend:

```bash
npm run install:all
```

### Environment Setup

Both the frontend and backend require specific environment variables to function correctly.

1.  **Backend Configuration:**
    *   Navigate to the `backend/` directory.
    *   Copy `backend/.env.example` to `backend/.env`.
    *   Open `backend/.env` and fill in the following required variables:
        *   `MONGO_URI`: Your MongoDB connection string.
        *   `JWT_SECRET`: A strong, random string for JWT signing.
        *   `PORT`: The port on which the backend server will run (e.g., `5000`).

2.  **Frontend Configuration:**
    *   Navigate to the `frontend/` directory (or the project root if using root `.env`).
    *   Copy `frontend/.env.example` to `frontend/.env`.
    *   Open `frontend/.env` and fill in the following required variables:
        *   `TMDB_API_KEY`: Your API key from The Movie Database (TMDB).
        *   `API_URL`: The URL of your running backend server (e.g., `http://localhost:5000` or your deployed API URL).

### Running the Application

To start both the frontend and backend development servers concurrently, run this command from the project root:

```bash
npm run dev
```

You can also run them individually:

-   **Frontend (React Native Expo):**
    ```bash
    npm start
    # or
    npm run android # to run on Android emulator/device
    npm run ios     # to run on iOS simulator/device
    npm run web     # to run in web browser
    ```
-   **Backend (Node.js Express):**
    ```bash
    npm run dev:backend
    ```

## Development Conventions

-   **Monorepo Management:** `concurrently` is used in the root `package.json` to streamline the execution of multiple development commands.
-   **Linting:** ESLint is configured for code quality and consistency across the frontend.
-   **Code Structure:** Follows a modular structure with clear separation of concerns (e.g., `controllers`, `models`, `routes` in the backend; `components`, `screens`, `store` in the frontend).

*(Add more specific development conventions here if applicable, e.g., testing setup, commit message guidelines, etc.)*
