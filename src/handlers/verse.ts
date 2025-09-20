import { RequestHandler } from "express";
import * as verseService from "../services/verse";
import { GetVerseParams } from "../types/params";
import { AuthRequestHandler } from "../types/requestHandlers";

export const getVerse: RequestHandler<GetVerseParams> = async (req, res) => {
  const verse = await verseService.getVerse(Number(req.params.surah), Number(req.params.verse));
  const verseJson = await verse.json();
  res.status(200).json(verseJson);
}

export const saveVerse: AuthRequestHandler = async (req, res) => {
  await verseService.saveVerse(Number(req.params.surah), Number(req.params.verse), res.locals.user!.id, req.query.note);
  res.status(201).json({ message: 'Verse saved successfully!' });
}

export const getSaved: AuthRequestHandler = async (req, res) => {
  const saved = await verseService.getSaved(res.locals.user!.id);
  res.status(200).json(saved);
}

export const deleteSaved: AuthRequestHandler = async (req, res) => {
  const result = await verseService.deleteSaved(req.params.verse_id, res.locals.user!.id);
  if (result.rowCount === 0) {
    res.status(200).json({message: 'Verse does not exist.'});
    return;
  }
  res.status(200).json({message: 'Verse deleted successfully.'});
}