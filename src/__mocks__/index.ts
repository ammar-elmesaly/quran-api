import { Request, Response } from "express"

export const mockReq = {
  body: {
    username: "bob",
    password: "pass123"
  }
} as Request;

export const mockRes = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
  cookie: jest.fn()

} as unknown as Response;

export const mockNext = () => {};

