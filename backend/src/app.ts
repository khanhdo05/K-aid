import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import verifyRouter from './routes/verify';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  })
);

app.use(express.json());

app.use('/api', verifyRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
