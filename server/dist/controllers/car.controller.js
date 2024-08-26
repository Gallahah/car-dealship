"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.editCar = exports.updateCarPrice = exports.createCar = exports.getCars = exports.getCar = void 0;
const DB_1 = require("../core/DB");
const car_model_1 = require("../models/car.model");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const db = new DB_1.DB();
const carModel = new car_model_1.CarModel(db);
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const DEFAULT_IMAGE_KEY = 'default-car-image.svg';
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { min, max, make, type } = req.query;
    let query = "SELECT * FROM cars WHERE 1=1";
    const queryParams = [];
    const parseQueryParam = (param, type) => {
        if (param === undefined || Array.isArray(param)) {
            return undefined;
        }
        if (type === 'number') {
            const parsed = parseFloat(param);
            return isNaN(parsed) ? undefined : parsed;
        }
        return param;
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
        const [rows] = yield db.conn.query(query, queryParams);
        res.send(rows);
    }
    catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).send("Error fetching cars");
    }
});
exports.getCars = getCars;
const getCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield carModel.getCar(parseInt(id));
    res.send(data);
});
exports.getCar = getCar;
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    if (req.file) {
        if (!process.env.AWS_BUCKET) {
            res.status(500).json({ error: 'Bucket name is not defined in environment variables' });
            return;
        }
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: `${Date.now()}_${req.file.originalname}`,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            };
            const uploadResult = yield s3.upload(params).promise();
            data.imageUrl = uploadResult.Location;
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to upload image' });
            return;
        }
    }
    else {
        try {
            data.imageUrl = `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${DEFAULT_IMAGE_KEY}`;
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch default image' });
            return;
        }
    }
    try {
        yield carModel.createCar(data);
        res.send(data);
    }
    catch (error) {
        console.error("Error creating car:", error);
        res.status(500).send("Error creating car");
    }
});
exports.createCar = createCar;
const updateCarPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { price } = req.body;
    yield carModel.updateCarPrice(parseInt(id), parseInt(price));
    res.send({ id, price });
});
exports.updateCarPrice = updateCarPrice;
const editCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    yield carModel.editCar(parseInt(id), data);
    res.send({ id, data });
});
exports.editCar = editCar;
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield carModel.deleteCar(parseInt(id));
    res.send(id);
});
exports.deleteCar = deleteCar;
