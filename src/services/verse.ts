export const getVerse = (surahNumber: number, verseNumber: number) => {
  return fetch(`http://api.quran-tafseer.com/quran/${surahNumber}/${verseNumber}`);
}