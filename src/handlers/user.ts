import { RequestHandler } from "express";
import * as userService from '../services/user';
import { UserBody } from "../types/body";
import { verifyPassword } from "../services/hash";
import { User } from "../types/models/user";
import { RegisterRequestHandler } from "../types/requestHandlers";
import { AppError } from "../types/errors";
import rateLimit from "express-rate-limit";

export const loginUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const user: User = await userService.findUser(username);

  if (!user)
    throw new AppError('Invalid credentials', 404, 'USER_NOT_FOUND');

  const isPasswordValid = await verifyPassword(password, user.password_hash);

  if (!isPasswordValid)
    throw new AppError('Invalid credentials', 401, 'PASSWORD_INVALID');

  const token = userService.genToken(username, user.id, user.token_version);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      username: user.username,
      created_at: user.created_at
    }
  });
}

export const registerUser: RegisterRequestHandler = async (req, res) => {
  try {
    const user: UserBody = {
      username: req.body.username,
      password: req.body.password
    };

    await userService.registerUser(user);

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (err) {
    if ((err as Error).message.includes("Users_username_key"))
      throw new AppError("Username already used", 400, "DUPLICATE_USERNAME");

    throw err;
  }
}

export const updateUser: RequestHandler = async (req, res) => {
  const { id, username, password_hash } = res.locals.user;
  const { new_username, new_password } = req.body;

  const result = await userService.updateUser(id, username, password_hash, new_username, new_password);

  if (!result)
    throw new AppError('No updates specified', 400, 'NO_UPDATES_SPECIFIED');

  const token = userService.genToken(result.username, result.id, result.token_version);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  });

  res.status(200).json({ message: "User updated successfully" });
};

export const deleteUser: RequestHandler = async (req, res) => {
  const result = await userService.deleteUser(res.locals.user.id);
  
  if (result.rowCount === 0)
    throw new AppError('User does not exist', 401, 'USER_NOT_FOUND');

  res.status(200).json({message: 'User deleted successfully.'});
}

export const ipLoginLimiter = rateLimit({  // Rate limiting by IP
  windowMs: 5 * 60 * 100,  // 5 minutes
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

export const userLoginLimiter = rateLimit({  // Rate limiting by username
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  keyGenerator: (req) => req.body.username,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

export const ipRegisterLimiter = rateLimit({
  windowMs: 15 * 60 * 100,  // 5 minute
  limit: 1,  // 1 Account per 5 minutes
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});