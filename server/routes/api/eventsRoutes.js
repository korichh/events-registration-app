import { Router } from "express"
import eventsController from "../../controllers/api/eventsController.js"

const eventsRoutes = Router()

eventsRoutes.get("/", eventsController.getEvents)
eventsRoutes.get("/:eventId", eventsController.getEvent)
eventsRoutes.get("/:eventId/participants", eventsController.getEventParticipants)
eventsRoutes.post("/:eventId/register", eventsController.registerParticipant)

export default eventsRoutes