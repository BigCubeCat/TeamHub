import { getConfig, config } from './config';
getConfig();

import express from 'express';
import cors from 'cors';

import { f } from "./database/db";

f().catch(console.error)
const app = express();

const allowedOrigins = ['*']; // TODO ТОЛЬКО с контейнера с java бэком

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));

app.use(express.json());

// POST method route
app.post('/:name', (req, res) => {
  const userId = req.params.name;
  res.sendStatus(200);
})

app.listen(config.PORT, () => {
  console.log(`Express server listening on port ${config.PORT}`);
});

