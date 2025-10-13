import { RequestHandler } from 'express';
import { GetTafsirParams } from "../types/params";
import { AppError } from '../types/errors';

export const validateTafsirParams: RequestHandler<GetTafsirParams> = (req, res, next): void => {
  const { surah, verse, tafsir } = req.params;

  if (typeof surah !== 'string' || typeof verse !== 'string' || typeof tafsir !== 'string')
    throw new AppError('Missing or invalid params', 400, 'INVALID_PARAMS');

  const surahNum = parseInt(surah, 10);
  const verseNum = parseInt(verse, 10);
  const tafsirId = parseInt(tafsir, 10);

  if (isNaN(surahNum) || isNaN(verseNum) || isNaN(tafsirId))
    throw new AppError('Surah, verse, and tafsir_id must be numbers', 400, 'INVALID_PARAMS');

  next();
}