import "dotenv/config"
import express from "express"
import { setStatic } from "./middleware/index.js"
import router from "./routes/index.js"
import sequelize from "./config/sequelize.js"
import setEvents from "./services/setEvents.js"

const app = express()
const PORT = process.env.PORT || 5000

setEvents()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(setStatic)
app.use(router)

sequelize.sync({ force: false, alter: false, logging: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
})