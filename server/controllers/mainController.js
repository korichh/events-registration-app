import path from "path"

const mainController = {
    get: (req, res) => {
        res.status(200).sendFile(path.join(process.cwd(), "client/dist/index.html"))
    }
}

export default mainController