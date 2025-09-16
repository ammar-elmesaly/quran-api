import express from "express";
import { getUsers, loginUser, registerUser } from "../handlers/user";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

// GET /users
router.get('/', getUsers);

// POST /users/new
router.post('/new', registerUser);

// POST /users/login
router.post('/login', loginUser);

router.get('/secret', verifyToken, (req, res) => {
  res.send({great: "Great!"});
});

export default router;