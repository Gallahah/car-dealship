import { Router } from "express";
import multer from 'multer';
import { createCar, deleteCar, getCars, getCar, updateCar } from "../controllers/car.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

const carRouter = Router();
carRouter.get('/car', getCars);
carRouter.get('/car/:id', getCar);
carRouter.post('/car', upload.single('image'), createCar);
carRouter.put('/car/:id', updateCar);
carRouter.delete('/car/:id', deleteCar);

export { carRouter };