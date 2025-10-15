import { AppError } from "../types/errors";
import { VerseJson } from "../types/quran";
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

export const updateSaved = async (verseId: number, userId: number, surahNumber: number, verseNumber: number, note?: string) => {
  const verseResponse = await getVerse(surahNumber, verseNumber);

  if (!verseResponse.ok) {
    const errorBody = await verseResponse.json();
    throw new AppError(errorBody?.message || 'Verse not found', 404, 'VERSE_NOT_FOUND');
  }
  
  const verseToSave: VerseJson = await verseResponse.json();

  const { sura_name, text } = verseToSave;
  
  const result = await pool.query(`
    UPDATE "SaveVerse"
    SET
      surah_index = $1,
      surah_name = $2,
      verse_number = $3,
      text = $4,
      note = COALESCE($5, note)
    WHERE id = $6 AND user_id = $7
    RETURNING *;
  `, [surahNumber, sura_name, verseNumber, text, note, verseId, userId]);

  return result.rows[0];
}

export const deleteSaved = async (verseId: number, userId: number) => {
  const result = await pool.query(
    'DELETE FROM "SaveVerse" WHERE id = $1 AND user_id = $2',
    [verseId, userId]
  )

  return result;
}