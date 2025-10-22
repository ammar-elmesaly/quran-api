import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import allRoutes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import  { createStream } from 'rotating-file-stream';
import rateLimit from 'express-rate-limit';

export const app = express();

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());

const logDir = path.join(__dirname, 'logs');

if (!fs.existsSync(logDir))
  fs.mkdirSync(logDir);

const accessLogStream = createStream('access.log', { interval: '1d',  path: logDir });
app.use(morgan('combined', { stream: accessLogStream }));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

app.use(limiter);

app.get('/', (req, res) => {
  res.json({
    name: "Quran-API",
    version: "1.0.0",
    description: "A RESTful API for accessing and exploring Quranic text programmatically.",
    docs: "https://github.com/ammar-elmesaly/quran-api#readme",
    endpoints: {
      quran: "/quran/:surah/:verse",
      tafsir: "/quran/:surah/:verse/tafsir/:tafsir",
      user: "/users"
    },
  });
});

app.use(allRoutes);
app.use(errorHandler);