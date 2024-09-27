import { Router } from "express"
import eventsRoutes from "./eventsRoutes.js"

const apiRouter = Router()

apiRouter.use("/events", eventsRoutes)

export default apiRouter