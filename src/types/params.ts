export interface GetVerseParams {
  surah: string,
  verse: string
}

export interface GetTafsirParams extends GetVerseParams {
  tafsir: string
}