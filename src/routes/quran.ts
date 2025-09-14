import express from "express";

import { getVerse } from "../handlers/verse";
import { getVerseTafsir } from "../handlers/tafsir";
import { getAllTafsirs } from "../handlers/tafsir";
import { validateVerseParams } from "../middlewares/verse";
import { validateTafsirParams } from "../middlewares/tafsir";

const router = express.Router();

router.get('/:surah/:verse', validateVerseParams, getVerse);
router.get('/:surah/:verse/tafsir/:tafsir', validateTafsirParams, getVerseTafsir);
router.get('/tafsir', getAllTafsirs);

export default router;