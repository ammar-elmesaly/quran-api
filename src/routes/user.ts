import express from "express";
import { getUsers, loginUser, registerUser, deleteUser, updateUser } from "../handlers/user";
import { registerValidate, updateValidate } from "../validators/registerValidator";
import { handleValidation } from "../middlewares/validation";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

// GET /users
router.get('/', getUsers);

// POST /users/new
router.post('/new', registerValidate, handleValidation, registerUser);

// PUT /users/update
router.put('/update', verifyToken, updateValidate, handleValidation, updateUser);

// DELETE /users/delete
router.delete('/delete', verifyToken, deleteUser);

// POST /users/login
router.post('/login', loginUser);

export default router;