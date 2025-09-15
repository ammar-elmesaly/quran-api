import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';

import allRoutes from './routes';

const PORT: string = process.env.PORT || "5000";
const app = express();

app.use(bodyParser.json());

// app.get('/secret', verifyToken, (req, res) => {
//   console.log((req as any).user);
//   res.send({welcome: 'welcome abroad'});
// })

app.use(allRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});