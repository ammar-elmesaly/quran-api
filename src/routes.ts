import express from 'express';
import userRouter from './routes/user';
import verseRouter from './routes/verse';

const router = express.Router();

router.use('/users', userRouter);
router.use('/verse', verseRouter);

export default router;