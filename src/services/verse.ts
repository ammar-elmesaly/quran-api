import { AppError } from "../types/errors";
import pool from "./db";

export const getVerse = (surahNumber: number, verseNumber: number) => {
  return fetch(`http://api.quran-tafseer.com/quran/${surahNumber}/${verseNumber}`);
}

export const saveVerse = async (surahNumber: number, verseNumber: number, userId: number, note?: string) => {
  const verseResponse = await getVerse(surahNumber, verseNumber);
  
  if (!verseResponse.ok) {
    const errorBody = await verseResponse.json();
    throw new AppError(errorBody?.message || 'Verse not found', 404, 'VERSE_NOT_FOUND');
  }
  
  const verseJson = await verseResponse.json();
  
  if (note === '') note = undefined;

  return pool.query(
    'INSERT INTO "SaveVerse" (user_id, surah_index, surah_name, verse_number, text, note) VALUES ($1, $2, $3, $4, $5, $6)',
    [userId, verseJson.sura_index, verseJson.sura_name, verseJson.ayah_number, verseJson.text, note]
  );
}

export const getSaved = async (userId: number) => {
  const saved = await pool.query(
    'SELECT * FROM "SaveVerse" WHERE user_id = $1',
    [userId]
  );

  return saved.rows;
}

export const deleteSaved = async (verseId: number, userId: number) => {
  const result = await pool.query(
    'DELETE FROM "SaveVerse" WHERE id = $1 AND user_id = $2',
    [verseId, userId]
  )

  return result;
}