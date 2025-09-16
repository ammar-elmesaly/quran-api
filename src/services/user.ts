import { UserBody } from "../types/body";
import { hashPassword } from "../services/hash";
import jwt from 'jsonwebtoken';
import { EnvironmentError } from "../types/errors";
import pool from "./db";

export const getUsers = async () => {
  const result = await pool.query('SELECT * FROM "Users"');
  return result.rows ?? null;
}

export const findUser = async (username: string) => {
  const result = await pool.query('SELECT * FROM "Users" WHERE username=$1', [username]);
  return result.rows[0] ?? null;
}

export const registerUser = async (user: UserBody) => {
  const { username, password } = user;

  const hashedPassword = await hashPassword(password);

  return pool.query(
    'INSERT INTO "Users" (username, password_hash) VALUES ($1, $2)',
    [username, hashedPassword]
  );
}

export const genToken = (username: string, id: number) => {
  if (!process.env.JWT_SECRET) throw new EnvironmentError("No JWT Secret Provided!");

  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}