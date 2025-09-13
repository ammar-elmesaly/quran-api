import { VerseJson } from "../types/verse";

export const getVerse = (surah: number, verse: number) => {
  return fetch(`http://api.alquran.cloud/v1/ayah/${surah}:${verse}`);
}

export const formatVerse = (verseJson: VerseJson) => ({
  surahName: verseJson.data.surah.name,
  surahNameEnglish: verseJson.data.surah.englishName,
  content: verseJson.data.text
});