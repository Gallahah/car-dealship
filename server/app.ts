import express, { Application, json } from 'express';
import { carRouter } from "./routes/car.router";
import cors from "cors";
import {userRouter} from "./routes/user.router";

const app: Application = express();

app.use(cors());
app.use(json());
app.use(carRouter);
app.use(userRouter);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});