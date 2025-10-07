import express from "express";
import { getUsers, loginUser, registerUser } from "../handlers/user";
import { registerValidate } from "../validators/registerValidator";
import { handleValidation } from "../middlewares/validation";

const router = express.Router();

// GET /users
router.get('/', getUsers);

// POST /users/new
router.post('/new', registerValidate, handleValidation, registerUser);

// POST /users/login
router.post('/login', loginUser);

export default router;