import jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret';

export const generateToken = (user) => {
  return jwt.sign({ id: user.ID, role: user.role }, JWT_SECRET, {
    expiresIn: '60m',
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
