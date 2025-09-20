export interface saveVerse {
  id: number,
  user_id: number,
  surah_index: number,
  surah_name: string,
  verse_number: number,
  text: string,
  note?: string,
  created_at: string
}