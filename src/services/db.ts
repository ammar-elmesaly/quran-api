import pg from 'pg';
import { EnvironmentError } from '../types/errors';

const { Pool } = pg;

if (!process.env.DATABASE_URL) throw new EnvironmentError("Database URL is missing.");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Needed for Neon and most cloud hosts
  }
});

export default pool;
