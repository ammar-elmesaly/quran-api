import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

// Middleware to protect routes
export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return;
  }

  if (!process.env.JWT_SECRET) throw new Error("No JWT Secret Provided!");

  try {

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    (req as any).user = verified;
    next();
    
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};