import { RequestHandler } from 'express';
import { GetVerseParams } from "../types/params";
import { AppError } from '../types/errors';

export const validateVerseParams: RequestHandler<GetVerseParams> = (req, res, next): void => {
  const { surah, verse } = req.params;

  if (typeof surah !== 'string' || typeof verse !== 'string')
    throw new AppError('Missing or invalid params', 400, 'INVALID_PARAMS');

  const surahNum = parseInt(surah, 10);
  const verseNum = parseInt(verse, 10);

  if (isNaN(surahNum) || isNaN(verseNum))
    throw new AppError('Surah and verse must be numbers', 400, 'INVALID_PARAMS');

  next();
}