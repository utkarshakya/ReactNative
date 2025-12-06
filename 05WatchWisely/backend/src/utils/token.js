const jwt = require('jsonwebtoken');

const getEnvOrThrow = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is not defined in environment variables`);
  }
  return value;
};

const getAccessSecret = () => getEnvOrThrow('JWT_ACCESS_SECRET');
const getRefreshSecret = () => getEnvOrThrow('JWT_REFRESH_SECRET');

const generateAccessToken = (payload = {}) => {
  return jwt.sign(payload, getAccessSecret(), {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  });
};

const generateRefreshToken = (payload = {}) => {
  return jwt.sign(payload, getRefreshSecret(), {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  });
};

const verifyAccessToken = (token) => jwt.verify(token, getAccessSecret());
const verifyRefreshToken = (token) => jwt.verify(token, getRefreshSecret());

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
