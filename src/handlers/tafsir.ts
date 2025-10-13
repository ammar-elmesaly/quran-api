import { RequestHandler } from "express";
import * as tafsirService from "../services/tafsir";
import { GetTafsirParams } from "../types/params";
import { AppError } from "../types/errors";

export const getAllTafsirs: RequestHandler = async (req, res) => {
  const tafsirs = await tafsirService.getAllTafsirs();
  const tafsirsJson = await tafsirs.json();
  res.status(200).json(tafsirsJson);
}

export const getVerseTafsir: RequestHandler<GetTafsirParams> = async (req, res) => {
  const verseTafsirResponse = await tafsirService.getVerseTafsir(
    Number(req.params.tafsir),
    Number(req.params.surah),
    Number(req.params.verse)
  );

  if (!verseTafsirResponse.ok) {
    const errorBody = await verseTafsirResponse.json();
    throw new AppError(errorBody?.message || 'Verse not found', 404, 'VERSE_NOT_FOUND_ERROR');
  }

  const verseTafsirJson = await verseTafsirResponse.json();

  res.status(200).json(verseTafsirJson);
}