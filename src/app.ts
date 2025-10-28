import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import allRoutes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

export const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(helmet());
app.use(cookieParser());

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