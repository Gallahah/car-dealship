export class UserModel {
    conn;

    constructor(db: any) {
        this.conn = db.conn;
    }

    async getAllUsers() {
        const [rows] = await this.conn.query("SELECT * FROM users ORDER BY id");
        return rows;
    }

    async getUser(id: number) {
        if (isNaN(id)) {
            throw new Error("Invalid user ID");
        }

        const [rows] = await this.conn.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0];
    }

    async createUser(userData: any) {
        await this.conn.query("INSERT INTO users (username, password) VALUES (?, ?)",
            [userData.username, userData.password]);
    }

    async deleteUser(id: number) {
        await this.conn.query("DELETE FROM users WHERE id = ?", [id]);
    }
}