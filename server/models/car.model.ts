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
        await this.conn.query("INSERT INTO cars (type, make, model, year, price) VALUES (?, ?, ?, ?, ?)",
            [carData.type, carData.make, carData.model, carData.year, carData.price]);
    }

    async updateCarPrice(id: number, price: number): Promise<boolean> {
        await this.conn.execute("UPDATE Cars SET price = ? WHERE id = ?", [price, id]);
        return true;
    }

    async deleteCar(id: number) {
        await this.conn.query("DELETE FROM cars WHERE id = ?", [id]);
    }
}