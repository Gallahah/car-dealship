import dotenv from 'dotenv';
import express, { Application, json } from 'express';
import cors from 'cors';
import { carRouter } from './routes/car.router';
import { userRouter } from './routes/user.router';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(json());
app.use(carRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
