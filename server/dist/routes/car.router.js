"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const car_controller_1 = require("../controllers/car.controller");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
const carRouter = (0, express_1.Router)();
exports.carRouter = carRouter;
carRouter.get('/car', car_controller_1.getCars);
carRouter.get('/car/:id', car_controller_1.getCar);
carRouter.post('/car', upload.single('image'), car_controller_1.createCar);
carRouter.put('/car/:id/edit', car_controller_1.editCar);
carRouter.put('/car/:id', car_controller_1.updateCarPrice);
carRouter.delete('/car/:id', car_controller_1.deleteCar);
