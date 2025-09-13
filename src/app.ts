import express from 'express';
import dotenv from 'dotenv';
import allRoutes from './routes';

dotenv.config();

const PORT: string = process.env.PORT || "5000";
const app = express();

app.use(allRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});