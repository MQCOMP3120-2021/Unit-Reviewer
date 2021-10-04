import express from 'express';
import { initDB } from './db';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import morgan from 'morgan';
import cors from 'cors';
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

initDB();

expressJSDocSwagger(app)(options);

app.use('/api/units', unitsRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on http://0.0.0.0:${PORT}`);
});
