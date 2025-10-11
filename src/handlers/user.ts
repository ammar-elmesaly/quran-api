import { RequestHandler } from "express";
import * as userService from '../services/user';
import { UserBody } from "../types/body";
import { hashPassword, verifyPassword } from "../services/hash";
import { User } from "../types/models/user";
import { RegisterRequestHandler } from "../types/requestHandlers";

export const getUsers: RequestHandler = async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json(users);
}

export const loginUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  const user: User = await userService.findUser(username);

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const isPasswordValid = await verifyPassword(password, user.password_hash);

  if (!isPasswordValid) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

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

  const user: UserBody = {
    username: req.body.username,
    password: req.body.password
  };

  await userService.registerUser(user);

  res.status(201).json({ message: 'User registered successfully!' });
}

export const updateUser: RequestHandler = async (req, res) => {
  const { new_username, new_password } = req.body;

  let new_password_hash;
  if (new_password)
    new_password_hash = await hashPassword(new_password);

  const result = await userService.updateUser(res.locals.user.id, new_username, new_password_hash);

  if (!result) {
    res.json({ message: "No updates specified" });
    return;
  }

  const token = userService.genToken(result.username, result.id, result.token_version);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  });

  res.json({ message: "User updated successfully!" });
};

export const deleteUser: RequestHandler = async (req, res) => {
  const result = await userService.deleteUser(res.locals.user.id);
  if (result.rowCount === 0) {
    res.status(200).json({message: 'User does not exist.'});
    return;
  }
  res.status(200).json({message: 'User deleted successfully.'});
}