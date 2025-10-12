import { UserBody } from "../types/body";
import { hashPassword, verifyPassword } from "../services/hash";
import jwt from 'jsonwebtoken';
import { EnvironmentError } from "../types/errors";
import pool from "./db";

export const getUsers = async () => {
  const result = await pool.query('SELECT username, created_at FROM "Users"');
  return result.rows ?? null;
};

export const findUser = async (username: string) => {
  const result = await pool.query('SELECT * FROM "Users" WHERE username=$1', [username]);
  return result.rows[0] ?? null;
};

export const registerUser = async (user: UserBody) => {
  const { username, password } = user;

  const hashedPassword = await hashPassword(password);

  return pool.query(
    'INSERT INTO "Users" (username, password_hash) VALUES ($1, $2)',
    [username, hashedPassword]
  );
};

export const updateUser = async (
  userId: number,
  oldUsername: string,
  oldPasswordHash: string,
  newUsername?: string,
  newPassword?: string
) => {
  const fields: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (newUsername && newUsername !== oldUsername) {
    fields.push(`username = $${paramIndex++}`);
    values.push(newUsername);
  }

  if (newPassword) {
    const isSamePassword = await verifyPassword(newPassword, oldPasswordHash);
    if (!isSamePassword) {
      fields.push(`password_hash = $${paramIndex++}`);

      const newPasswordHash = await hashPassword(newPassword);
      values.push(newPasswordHash);
    }
  }

  if (fields.length === 0) {
    return null; // Nothing to update
  }

  fields.push('token_version = token_version + 1');

  values.push(userId); // last parameter for WHERE clause

  const query = `
    UPDATE "Users"
    SET ${fields.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *;
  `;

  const result = await pool.query(query, values);
  return result.rows[0];
};


export const deleteUser = async (userId: number) => {
  const result = await pool.query(
    'DELETE FROM "Users" WHERE id = $1',
    [userId]
  )

  return result;
};

export const deleteUserByUsername = async (username: string) => {
  const result = await pool.query(
    'DELETE FROM "Users" WHERE username = $1',
    [username]
  )

  return result;
};

export const genToken = (username: string, id: number, token_version: number) => {
  if (!process.env.JWT_SECRET) throw new EnvironmentError("No JWT Secret Provided!");

  const token = jwt.sign({ username, id, token_version }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};