const User = require('../models/User');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../utils/token');

const buildUserResponse = (user) => ({
  id: user._id,
  email: user.email,
});

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = new User({ email, password });
    await user.save();

    const accessToken = generateAccessToken({ sub: user._id });
    const refreshToken = generateRefreshToken({ sub: user._id });

    await user.storeRefreshToken(refreshToken);
    await user.save();

    return res.status(201).json({
      user: buildUserResponse(user),
      tokens: { accessToken, refreshToken },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.isPasswordMatch(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken({ sub: user._id });
    const refreshToken = generateRefreshToken({ sub: user._id });

    await user.storeRefreshToken(refreshToken);
    await user.save();

    return res.json({
      user: buildUserResponse(user),
      tokens: { accessToken, refreshToken },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.sub);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isValid = await user.isRefreshTokenValid(refreshToken);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken({ sub: user._id });
    const newRefreshToken = generateRefreshToken({ sub: user._id });

    await user.storeRefreshToken(newRefreshToken);
    await user.save();

    return res.json({
      tokens: { accessToken: newAccessToken, refreshToken: newRefreshToken },
    });
  } catch (error) {
    return res.status(401).json({ message: 'Refresh token invalid', error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.sub);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isValid = await user.isRefreshTokenValid(refreshToken);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    user.refreshToken = undefined;
    await user.save();

    return res.status(204).send();
  } catch (error) {
    return res.status(401).json({ message: 'Logout failed', error: error.message });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
