import { RequestHandler } from "express";
import * as verseService from "../services/verse";

export const getVerse: RequestHandler = async (req, res) => {
  const verse = await verseService.getVerse(Number(req.query.surah), Number(req.query.verse));
  const verseJson = await verse.json();
  res.send(verseService.formatVerse(verseJson));
}