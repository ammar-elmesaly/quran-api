import express from "express";
import { getUsers, loginUser, registerUser } from "../handlers/user";

const router = express.Router();

// GET /users
router.get('/', getUsers);

// POST /users/new
router.post('/new', registerUser);

// POST /users/login
router.post('/login', loginUser);
export default router;