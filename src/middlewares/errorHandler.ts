import { ErrorRequestHandler } from 'express';
import { AppError } from '../types/errors';

export const errorHandler: ErrorRequestHandler = (err: AppError, req, res, next) => {
  console.error(err);

  const status = err.statusCode || 500;
  const response = {
    message: err.message,
    code: err.code,
  };

  res.status(status).json(response);
}