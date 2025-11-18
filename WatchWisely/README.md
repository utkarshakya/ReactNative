# WatchWisely

A movie streaming app with React Native frontend and Node.js backend.

## Project Structure

```
watchwisely/
├── frontend/          # React Native (Expo) app
├── backend/           # Node.js Express API
└── package.json       # Root package.json for monorepo management
```

## Development

### Install all dependencies
```bash
npm run install:all
```

### Start both frontend and backend
```bash
npm run dev
```

### Start individually
```bash
# Frontend (React Native)
npm run dev:frontend

# Backend (Node.js)
npm run dev:backend
```

## Environment Setup

### Backend
Copy `backend/.env.example` to `backend/.env` and configure:
- MONGO_URI
- JWT secrets
- PORT

### Frontend  
Copy `frontend/.env.example` to `frontend/.env` and configure:
- TMDB API credentials
- Backend API URL

## Tech Stack

**Frontend:** React Native, Expo, Redux Toolkit, React Navigation  
**Backend:** Node.js, Express, MongoDB, JWT Authentication