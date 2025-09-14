import { RequestHandler } from 'express';
import { GetVerseParams } from "../types/params";

export const validateVerseParams: RequestHandler<GetVerseParams> = (req, res, next): void => {
  const { surah, verse } = req.params;

  if (typeof surah !== 'string' || typeof verse !== 'string') {
    res.status(400).json({ error: 'Missing or invalid params' });
    return;
  }

  const surahNum = parseInt(surah, 10);
  const verseNum = parseInt(verse, 10);

  if (isNaN(surahNum) || isNaN(verseNum)) {
    res.status(400).json({ error: 'Surah and verse must be numbers' });
    return;
  }

  next();
}