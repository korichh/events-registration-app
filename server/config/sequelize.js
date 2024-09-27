import "dotenv/config"
import { Sequelize } from "sequelize"

const DB = {
    NAME: process.env.DB_NAME || "events_registration_app",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "root",
    HOST: process.env.DB_HOST || "localhost",
    PORT: Number(process.env.DB_PORT) || 3306,
}

export default new Sequelize(
    DB.NAME,
    DB.USER,
    DB.PASSWORD,
    {
        host: DB.HOST,
        port: DB.PORT,
        dialect: "mysql",
        logging: false
    }
)