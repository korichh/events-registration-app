import { Router } from "express"
import mainController from "../controllers/mainController.js"

const mainRouter = Router()

mainRouter.get("/*", mainController.get)

export default mainRouter