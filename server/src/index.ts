import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import morgan from 'morgan';
import path from 'path';

import initDB from './db';
import authRouter from './routes/auth';
import unitsRouter from './routes/units';

const options = {
  info: {
    title: 'Unit Review API',
    description: "API server for group AE's COMP3120 Assignment 2 app",
    version: '1.0.0',
  },
  filesPattern: ['./**.js', './**.ts', './routes/**.js', './routes/**.ts'],
  baseDir: __dirname,
};

const PORT = Number(process.env.PORT) || 5001;
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

initDB();

expressJSDocSwagger(app)(options);

app.use('/api/units', unitsRouter);
app.use('/api/auth', authRouter);

app.use(express.static('public'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
