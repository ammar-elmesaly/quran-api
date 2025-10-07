import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import allRoutes from './routes';

const PORT: string = process.env.PORT || "3000";
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    "name": "Quran-API",
    "version": "1.0.0",
    "description": "A RESTful API for accessing and exploring Quranic text programmatically.",
    "docs": "https://github.com/ammar-elmesaly/quran-api#readme",
    "endpoints": {
      "quran": "/quran/:surah/:verse",
      "tafsir": "/quran/:surah/:verse/tafsir/:tafsir",
      "user": "/users"
    },
  });
});

app.use(allRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});