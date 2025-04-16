import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-for-jwt',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h'
};
