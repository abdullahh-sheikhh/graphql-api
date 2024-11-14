import jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret';

export const generateToken = (user) => {
  const payload = { userID: user.ID, role: user.role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '60m' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
