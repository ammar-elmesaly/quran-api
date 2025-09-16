import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { EnvironmentError } from '../types/errors';

// Middleware to protect routes
export const verifyToken: RequestHandler = (req, res, next) => {

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
    (req as any).user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};