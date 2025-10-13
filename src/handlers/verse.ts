import { RequestHandler } from "express";
import * as verseService from "../services/verse";
import { GetVerseParams } from "../types/params";
import { AuthRequestHandler } from "../types/requestHandlers";
import { AppError } from "../types/errors";

export const getVerse: RequestHandler<GetVerseParams> = async (req, res) => {
  const verseResponse = await verseService.getVerse(Number(req.params.surah), Number(req.params.verse));

  if (!verseResponse.ok) {
    const errorBody = await verseResponse.json();
    throw new AppError(errorBody?.message || 'Verse not found', 404, 'VERSE_NOT_FOUND');
  }
  
  const verseJson = await verseResponse.json();
  res.status(200).json(verseJson);
}

export const saveVerse: AuthRequestHandler = async (req, res) => {
  try {
    await verseService.saveVerse(Number(req.params.surah), Number(req.params.verse), res.locals.user!.id, req.query.note);
    res.status(201).json({ message: 'Verse saved successfully!' });

  } catch (err) {
    if ((err as Error).message.includes("unique_user_verse"))
      throw new AppError("User cannot save the same verse multiple times", 400, "DUPLICATE_VERSE");

    throw err;
  }
}

export const getSaved: AuthRequestHandler = async (req, res) => {
  const saved = await verseService.getSaved(res.locals.user!.id);
  res.status(200).json(saved);
}

export const deleteSaved: AuthRequestHandler = async (req, res) => {
  const result = await verseService.deleteSaved(req.params.verse_id, res.locals.user!.id);

  if (result.rowCount === 0)
    throw new AppError('Verse does not exist', 404, 'VERSE_NOT_FOUND');

  res.status(200).json({message: 'Verse deleted successfully.'});
}