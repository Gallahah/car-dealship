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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
class CarModel {
    constructor(db) {
        this.conn = db.conn;
    }
    getAllCars() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield this.conn.query("SELECT * FROM cars ORDER BY id DESC");
            return rows;
        });
    }
    getCar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id)) {
                throw new Error("Invalid car ID");
            }
            const [rows] = yield this.conn.query("SELECT * FROM cars WHERE id = ?", [id]);
            return rows[0];
        });
    }
    createCar(carData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.query("INSERT INTO cars (type, make, model, year, price, image_url, owner_id, kilometres, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [carData.type, carData.make, carData.model, carData.year, carData.price, carData.imageUrl, carData.ownerId, carData.kilometres, carData.description]);
        });
    }
    updateCarPrice(id, price) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.execute("UPDATE cars SET price = ? WHERE id = ?", [price, id]);
            return true;
        });
    }
    editCar(id, carData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.execute("UPDATE cars SET type = ?, make = ?, model = ?, year = ?, price = ?, image_url = ?, kilometres = ?, description = ? WHERE id = ?", [carData.type, carData.make, carData.model,
                carData.year, carData.price, carData.imageUrl,
                carData.kilometres, carData.description, id]);
            return true;
        });
    }
    deleteCar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.conn.query("DELETE FROM cars WHERE id = ?", [id]);
        });
    }
}
exports.CarModel = CarModel;
