import { Request, Response } from 'express';
import { DB } from "../core/DB";
import { CarModel } from "../models/car.model";
import { ParsedQs } from "qs";

const db = new DB();
const carModel = new CarModel(db);

const getCars = async (req: Request, res: Response) => {
    const { min, max, make, type } = req.query;

    let query = "SELECT * FROM cars WHERE 1=1";
    const queryParams: (number | string)[] = [];

    const parseQueryParam = (param: string | ParsedQs | string[] | ParsedQs[] | undefined, type: 'number' | 'string') => {
        if (param === undefined || Array.isArray(param)) {
            return undefined;
        }

        if (type === 'number') {
            const parsed = parseFloat(param as string);
            return isNaN(parsed) ? undefined : parsed;
        }

        return param as string;
    };

    const minPrice = parseQueryParam(min, 'number');
    const maxPrice = parseQueryParam(max, 'number');
    const makeParam = parseQueryParam(make, 'string');
    const typeParam = parseQueryParam(type, 'string');

    if (minPrice !== undefined) {
        query += " AND price >= ?";
        queryParams.push(minPrice);
    }

    if (maxPrice !== undefined) {
        query += " AND price <= ?";
        queryParams.push(maxPrice);
    }

    if (makeParam) {
        query += " AND make = ?";
        queryParams.push(makeParam);
    }

    if (typeParam) {
        query += " AND type = ?";
        queryParams.push(typeParam);
    }

    try {
        const [rows] = await db.conn.query(query, queryParams);
        res.send(rows);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).send("Error fetching cars");
    }
};

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