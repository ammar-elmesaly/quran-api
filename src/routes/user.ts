import express from "express";
import { getUsers } from "../handlers/user";

const router = express.Router();

router.get('/', getUsers);

export default router;