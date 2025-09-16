import jwt from 'jsonwebtoken';
import { EnvironmentError } from '../types/errors';
import { AuthRequestHandler } from '../types/requestHandlers';
import { User } from '../types/models/user';

// Middleware to protect routes
export const verifyToken: AuthRequestHandler = (req, res, next) => {

  if (!process.env.JWT_SECRET) throw new EnvironmentError("No JWT Secret Provided!");
  const JWT_SECRET = process.env.JWT_SECRET as string;

  // Get token from cookies
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Access Denied" });
    return;
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    res.locals.user = verified as User;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
    return;
  }
};