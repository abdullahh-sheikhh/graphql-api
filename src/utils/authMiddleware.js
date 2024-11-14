import { verifyToken } from './auth.js';

export const authenticate = (req) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    return verifyToken(token);
  }
  throw new Error('Authentication Failed');
};

export const getRole = (required) => (req) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    throw new Error('token is null');
  }
  const decoded = verifyToken(token);
  if (decoded.role === required) {
    return decoded;
  }
  throw new Error('permission failed');
};
