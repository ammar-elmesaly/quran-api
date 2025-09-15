import express from "express";

import { getVerse } from "../handlers/verse";
import { getVerseTafsir } from "../handlers/tafsir";
import { getAllTafsirs } from "../handlers/tafsir";
import { validateVerseParams } from "../middlewares/verse";
import { validateTafsirParams } from "../middlewares/tafsir";

const router = express.Router();

// GET /quran/:surah/:verse
router.get('/:surah/:verse', validateVerseParams, getVerse);

// GET /quran/:surah/:verse/tafsir/:tafsir
router.get('/:surah/:verse/tafsir/:tafsir', validateTafsirParams, getVerseTafsir);

// GET /quran/tafsir
router.get('/tafsir', getAllTafsirs);

export default router;