import { RequestHandler } from "express";
import * as tafsirService from "../services/tafsir";
import { GetTafsirParams } from "../types/params";

export const getAllTafsirs: RequestHandler = async (req, res) => {
  const tafsirs = await tafsirService.getAllTafsirs();
  const tafsirsJson = await tafsirs.json();
  res.status(200).json(tafsirsJson);
}

export const getVerseTafsir: RequestHandler<GetTafsirParams> = async (req, res) => {
  const verseTafsir = await tafsirService.getVerseTafsir(
    Number(req.params.tafsir),
    Number(req.params.surah),
    Number(req.params.verse)
  );

  const verseTafsirJson = await verseTafsir.json();

  res.status(200).json(verseTafsirJson);
}