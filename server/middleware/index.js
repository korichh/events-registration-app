import path from "path"
import express from "express"

export const setStatic = express.static(path.join(process.cwd(), "client/dist"))