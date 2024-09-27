import mysql from "mysql2/promise"

const DB = {
    NAME: process.env.DB_NAME || "events_registration_app",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "root",
    HOST: process.env.DB_HOST || "localhost",
    PORT: Number(process.env.DB_PORT) || 3306,
}

const pool = mysql.createPool({
    database: DB.NAME,
    user: DB.USER,
    password: DB.PASSWORD,
    host: DB.HOST,
    port: DB.PORT
})

const query = {
    str: "",
    getTitle: (num) => `Title ${num}`,
    getDescription: (num) => `description ${num}`,
    getDate: (num) => { const date = new Date(); date.setDate(new Date().getDate() + num); return date.toLocaleDateString("en-CA") },
    getOrganizer: (num) => `organizer ${num}`,
    run: async () => {
        try {
            await pool.query(query.str)
        } catch (e) {
            console.error(e)
        } finally {
            await pool.end()
        }
    }
}

query.str = "INSERT INTO `Events` (`event_id`, `event_title`, `event_description`, `event_date`, `event_organizer`) VALUES"
for (let i = 0; i < 120; i++) {
    query.str += ` ("id_${i + 1}", "${query.getTitle(i + 1)}", "${query.getDescription(i + 1)}", "${query.getDate(i + 1)}", "${query.getOrganizer(i + 1)}"),`
}
query.str = query.str.replace(/.$/, ";")
query.run()