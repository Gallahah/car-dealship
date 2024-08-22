import dotenv from 'dotenv';
import express, { Application, json } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { carRouter } from './routes/car.router';
import { userRouter } from './routes/user.router';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: 'https://namcar.site' || 'http://localhost:5173',
    credentials: true,
}));


app.use(json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(carRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
