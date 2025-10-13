import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { AppError } from "../types/errors";

export const handleValidation: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new AppError(errors.array()[0]!.msg, 400, 'BAD_REQUEST_VALIDATION');
  
  next();
}