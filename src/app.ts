import express from 'express';
import 'express-async-errors';
import routeCars from './routes/cars';
import errorHandler from './middlewares/error';

const app = express();

app.use(express.json());
app.use(routeCars);
app.use(errorHandler);

export default app;
