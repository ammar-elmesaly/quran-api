import { Request, Response } from "express"
import { GetTafsirParams, GetVerseParams } from "../types/params";

export const mockRequests = {
  getVerse: {
    params: {
      surah: "2",
      verse: "255",
    }
  } as Request<GetVerseParams>,

  tafsir: {
    params: {
      surah: "2",
      verse: "255",
      tafsir: "1",
    }
  } as Request<GetTafsirParams>,

  saveVerse: {
    params: {
      surah: "2",
      verse: "255",
    },
    query: {
      note: "test"
    }
  } as unknown as Request,

  deleteSaved: {
    params: {
      verse_id: "12"
    }
  } as unknown as Request
}

export const mockRes = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
  cookie: jest.fn(),
  locals: {
    user: {id: "2"},
    note: "test"
  }

} as unknown as Response;

export const mockNext = () => {};

