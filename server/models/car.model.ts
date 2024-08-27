export class CarModel {
    conn;

    constructor(db: any) {
        this.conn = db.conn;
    }

    async getAllCars() {
        const [rows] = await this.conn.query("SELECT * FROM cars ORDER BY id DESC");
        return rows;
    }

    async getCar(id: number) {
        if (isNaN(id)) {
            throw new Error("Invalid car ID");
        }

        const [rows] = await this.conn.query("SELECT * FROM cars WHERE id = ?", [id]);
        return rows[0];
    }

    async createCar(carData: any) {
        await this.conn.query("INSERT INTO cars (type, make, model, year, price, image_url, owner_id, kilometres, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [carData.type, carData.make, carData.model, carData.year, carData.price, carData.imageUrl, carData.ownerId, carData.kilometres, carData.description]);
    }

    async updateCarPrice(id: number, price: number): Promise<boolean> {
        await this.conn.execute("UPDATE cars SET price = ? WHERE id = ?", [price, id]);
        return true;
    }

    async editCar(id: number, carData: any): Promise<boolean> {
        const [existingCar] = await this.conn.query('SELECT * FROM cars WHERE id = ?', [id]);

        const parameters = [
            carData?.type ?? existingCar[0].type,
            carData?.make ?? existingCar[0].make,
            carData?.model ?? existingCar[0].model,
            carData?.year ?? existingCar[0].year,
            carData?.price ?? existingCar[0].price,
            carData?.imageUrl ?? existingCar[0].image_url,
            carData?.kilometres ?? existingCar[0].kilometres,
            carData?.description ?? existingCar[0].description,
            id
        ];

        await this.conn.execute("UPDATE cars SET type = ?, make = ?, model = ?, year = ?, price = ?, image_url = ?, kilometres = ?, description = ? WHERE id = ?",
            parameters);
        return true;
    }

    async deleteCar(id: number) {
        await this.conn.query("DELETE FROM cars WHERE id = ?", [id]);
    }
}