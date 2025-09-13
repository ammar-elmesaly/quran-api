import express from "express";
import { getVerse } from "../handlers/verse";
import { validateVerseQuery } from "../middlewares/verse";
import { GetVerseQueryParams } from "../types/query-params";

const router = express.Router();

router.get<{}, {}, {}, {}, GetVerseQueryParams>('/', validateVerseQuery, getVerse);

export default router;