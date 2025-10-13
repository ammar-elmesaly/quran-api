import jwt from 'jsonwebtoken';
import { AppError, EnvironmentError } from '../types/errors';
import { AuthRequestHandler } from '../types/requestHandlers';
import { User } from '../types/models/user';
import { findUser } from '../services/user';

// Middleware to protect routes
export const verifyToken: AuthRequestHandler = async (req, res, next) => {

  if (!process.env.JWT_SECRET) throw new EnvironmentError("No JWT Secret Provided!");
  
  const JWT_SECRET = process.env.JWT_SECRET;

  // Get token from cookies
  const token = req.cookies.token;

  if (!token)
    throw new AppError('Access denied', 401, 'INVALID_TOKEN');

  try {
    const verified: User = jwt.verify(token, JWT_SECRET) as User;

    const user = await findUser((verified).username);

    if (!user || user.token_version !== verified.token_version )
      throw new AppError('Access denied', 401, 'TOKEN_INVALIDATED')  // Invalidating token after user deletion or password change

    res.locals.user = user;
    next();

  } catch (err) {
    if (err instanceof AppError)
      throw err;  
    
    throw new AppError('Access denied', 401, 'INVALID_TOKEN')
  }
};