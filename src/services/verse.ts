import pool from "./db";

export const getVerse = (surahNumber: number, verseNumber: number) => {
  return fetch(`http://api.quran-tafseer.com/quran/${surahNumber}/${verseNumber}`);
}

export const saveVerse = async (surahNumber: number, verseNumber: number, userId: number) => {
  const verse = await getVerse(surahNumber, verseNumber);
  const verseJson = await verse.json();
  return pool.query(
    'INSERT INTO "SaveVerse" (user_id, surah_index, surah_name, verse_number, text) VALUES ($1, $2, $3, $4, $5)',
    [userId, verseJson.sura_index, verseJson.sura_name, verseJson.ayah_number, verseJson.text]
  );
}

export const getSaved = async (userId: number) => {
  const saved = await pool.query(
    'SELECT * FROM "SaveVerse" WHERE user_id = $1',
    [userId]
  );

  return saved.rows;
}