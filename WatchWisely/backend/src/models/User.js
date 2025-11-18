const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to hash the password before saving
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();

  try {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    return next();
  } catch (error) {
    return next(error);
  }
});

// Instance Methods
userSchema.methods.isPasswordMatch = function isPasswordMatch(plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.storeRefreshToken = async function storeRefreshToken(token) {
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
  this.refreshToken = await bcrypt.hash(token, saltRounds);
};

userSchema.methods.isRefreshTokenValid = function isRefreshTokenValid(token) {
  if (!this.refreshToken) return false;
  return bcrypt.compare(token, this.refreshToken);
};

module.exports = mongoose.model('User', userSchema);
