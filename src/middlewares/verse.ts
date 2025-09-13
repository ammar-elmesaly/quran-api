import { RequestHandler } from 'express';

export const validateVerseQuery: RequestHandler = (req, res, next): void => {
  const { surah, verse } = req.query;

  if (typeof surah !== 'string' || typeof verse !== 'string') {
    res.status(400).json({ error: 'Missing or invalid query params' });
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