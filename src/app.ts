import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import allRoutes from './routes';

const PORT: string = process.env.PORT || "5000";
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(allRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});