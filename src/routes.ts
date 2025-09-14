import express from 'express';
import userRouter from './routes/user';
import quranRouter from './routes/quran';

const router = express.Router();

router.use('/users', userRouter);
router.use('/quran', quranRouter);

export default router;