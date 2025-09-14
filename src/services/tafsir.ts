export const getAllTafsirs = () => {
  return fetch(`http://api.quran-tafseer.com/tafseer`);
}

export const getVerseTafsir = (tafsirId: number, surahNumber: number, verseNumber: number) => {
  return fetch(`http://api.quran-tafseer.com/tafseer/${tafsirId}/${surahNumber}/${verseNumber}`);
}