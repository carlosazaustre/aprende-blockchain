import express from 'express';
import bodyParser from 'body-parser';

import { log } from 'util';
import Blockchain from '../blockchain';

const { HTTP_PORT = 3000 } = process.env;

const app = express();
const blockchain = new Blockchain();

app.use(bodyParser.json());

app.listen(HTTP_PORT, () => {
  console.log(`Service HTTP:${HTTP_PORT} listening...`);
});
