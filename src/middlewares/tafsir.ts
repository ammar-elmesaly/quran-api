import { RequestHandler } from 'express';
import { GetTafsirParams } from "../types/params";

export const validateTafsirParams: RequestHandler<GetTafsirParams> = (req, res, next): void => {
  const { surah, verse, tafsir } = req.params;

  if (typeof surah !== 'string' || typeof verse !== 'string' || typeof tafsir !== 'string') {
    res.status(400).json({ error: 'Missing or invalid params' });
    return;
  }

  const surahNum = parseInt(surah, 10);
  const verseNum = parseInt(verse, 10);
  const tafsirId = parseInt(tafsir, 10);

  if (isNaN(surahNum) || isNaN(verseNum) || isNaN(tafsirId)) {
    res.status(400).json({ error: 'Surah, verse, and tafsir_id must be numbers' });
    return;
  }

  next();
}