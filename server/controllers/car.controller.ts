import { Request, Response } from 'express';
import { DB } from "../core/DB";
import { CarModel } from "../models/car.model";

const db = new DB();
const carModel = new CarModel(db);

const getCars = async (req: Request, res: Response) => {
    const data = await carModel.getAllCars();
    res.send(data);
}

const getCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await carModel.getCar(parseInt(id));
    res.send(data);
}

const createCar = async (req: Request, res: Response) => {
    const data = req.body;
    await carModel.createCar(data);
    res.send(data);
}

const updateCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { price } = req.body;
    await carModel.updateCarPrice(parseInt(id), parseInt(price));
    res.send({ id, price });
}

const deleteCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    await carModel.deleteCar(parseInt(id));
    res.send(id);
}

export {
    getCar,
    getCars,
    createCar,
    updateCar,
    deleteCar
}