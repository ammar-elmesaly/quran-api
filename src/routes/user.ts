import express from "express";
import { loginUser, registerUser, deleteUser, updateUser, ipLoginLimiter, userLoginLimiter, ipRegisterLimiter } from "../handlers/user";
import { registerValidate, updateUserValidate } from "../validators/validators";
import { handleValidation } from "../middlewares/validation";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

// POST /users/new
router.post('/new', ipRegisterLimiter, registerValidate, handleValidation, registerUser);

// PUT /users/update
router.put('/update', verifyToken, updateUserValidate, handleValidation, updateUser);

// DELETE /users/delete
router.delete('/delete', verifyToken, deleteUser);

// POST /users/login
router.post('/login', ipLoginLimiter, userLoginLimiter, loginUser);

export default router;