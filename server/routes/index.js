import { Router } from "express"
import apiRouter from "./api/router.js"
import mainRouter from "./router.js"

const router = new Router()

router.use("/api", apiRouter)
router.use("/", mainRouter)

export default router