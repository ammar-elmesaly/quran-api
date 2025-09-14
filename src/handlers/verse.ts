import { RequestHandler } from "express";
import * as verseService from "../services/verse";
import { GetVerseParams } from "../types/params";

export const getVerse: RequestHandler<GetVerseParams> = async (req, res) => {
  const verse = await verseService.getVerse(Number(req.params.surah), Number(req.params.verse));
  const verseJson = await verse.json();
  res.send(verseJson);
}