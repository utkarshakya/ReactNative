const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
    },
    authMethod: {
      google: {
        id: {
          type: String,
          unique: true,
        },
        refreshToken: {
          type: String,
        }
      },
    }
  },
  {
    timestamps: true,
  }
);

// Middleware to hash the password before saving
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password') || !this.password) return next();

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
  this.authMethod.google.refreshToken = await bcrypt.hash(token, saltRounds);
};

userSchema.methods.isRefreshTokenValid = function isRefreshTokenValid(token) {
  if (!this.authMethod.google.refreshToken) return false;
  return bcrypt.compare(token, this.authMethod.google.refreshToken);
};

module.exports = mongoose.model('User', userSchema);
