import { RequestHandler } from "express";
import { validationResult } from "express-validator";

export const handleValidation: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array()[0]!.msg });
    return;
  }
  next();
}