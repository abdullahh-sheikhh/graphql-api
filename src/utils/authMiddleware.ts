import { verifyToken } from './auth.ts';

export const authenticate = (token) => {
  if (token) {
    return verifyToken(token);
  }
  throw new Error('Authentication Failed');
};

export const getRole = (required) => (req) => {
  const token = req.headers['Authorization']?.split(' ')[1];
  if (!token) {
    throw new Error('token is null');
  }
  const decoded = verifyToken(token);
  if (decoded.role === required) {
    return decoded;
  }
  throw new Error('permission failed');
};
