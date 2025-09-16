import { RequestHandler } from "express";
import { User } from "./models/user";
import { UserBody } from "./body";

export type AuthRequestHandler = RequestHandler<
  any,
  any,
  any,
  any,
  { user?: User }
>;

export type RegisterRequestHandler = RequestHandler<any, any, UserBody>;