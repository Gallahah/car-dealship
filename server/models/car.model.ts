export class CarModel {
    conn;

    constructor(db: any) {
        this.conn = db.conn;
    }

    async getAllCars() {
        const [rows] = await this.conn.query("SELECT * FROM cars");
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

    async updateCar(id: number, CarData: any): Promise<boolean> {
        const updateCarDataArray = Object.entries(CarData);
        let setStatement = "";
        let preparedStatementData = [];
        for (let i = 0; i < updateCarDataArray.length; i++) {
            setStatement += `${updateCarDataArray[i][0]} = ?`;
            setStatement += (i + 1 !== updateCarDataArray.length) ? ", " : " ";
            preparedStatementData.push(updateCarDataArray[i][1]);
        }
        preparedStatementData.push(id);
        await this.conn.execute(`UPDATE Cars SET ${setStatement} WHERE id = ?`, preparedStatementData);
        return true;
    }

    async deleteCar(id: number) {
        await this.conn.query("DELETE FROM cars WHERE id = ?", [id]);
    }
}