import express from "express";

import { getVerse, saveVerse, getSaved, deleteSaved, updateSaved } from "../handlers/verse";
import { getVerseTafsir, getAllTafsirs } from "../handlers/tafsir";
import { validateVerseParams } from "../middlewares/verse";
import { validateTafsirParams } from "../middlewares/tafsir";
import { verifyToken } from "../middlewares/auth";
import { deleteVerseValidate, updateVerseValidate } from "../validators/validators";
import { handleValidation } from "../middlewares/validation";

const router = express.Router();

// GET /quran/:surah/:verse
router.get('/:surah/:verse', validateVerseParams, getVerse);

// GET /quran/:surah/:verse/tafsir/:tafsir
router.get('/:surah/:verse/tafsir/:tafsir', validateTafsirParams, getVerseTafsir);

// GET /quran/tafsir
router.get('/tafsir', getAllTafsirs);

// POST /quran/:surah/:verse/save
router.post('/:surah/:verse/save', verifyToken, validateVerseParams, saveVerse);

// GET /quran/saved
router.get('/saved', verifyToken, getSaved);

// PUT /quran/:verse_id/update
router.put('/:verse_id/update', verifyToken, updateVerseValidate, handleValidation, updateSaved);

// DELETE /quran/:verse_id/delete
router.delete('/:verse_id/delete', verifyToken, deleteVerseValidate, handleValidation, deleteSaved);

export default router;