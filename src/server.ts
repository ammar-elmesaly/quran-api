import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import  { createStream } from 'rotating-file-stream';
import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';

if (process.env.NODE_ENV === "prod") {
  const logDir = path.join(__dirname, 'logs');

  if (!fs.existsSync(logDir))
    fs.mkdirSync(logDir);

  const accessLogStream = createStream('access.log', { interval: '1d',  path: logDir });
  app.use(morgan('combined', { stream: accessLogStream }));
}

const PORT: string = process.env.PORT || "3000";

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
