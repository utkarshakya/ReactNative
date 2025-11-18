const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  register,
  login,
  refresh,
  logout,
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', authMiddleware, logout);

module.exports = router;
