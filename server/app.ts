import express, {Application, json} from 'express';
import { carRouter } from "./routes/car.router";
import cors from "cors";

const app: Application = express();
const port = 3001;

app.use(cors());
app.use(json());
app.use(carRouter);

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});