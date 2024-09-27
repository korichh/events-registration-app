import path from "path"
import winston from "winston"

const { combine, timestamp, printf, errors } = winston.format

export default winston.createLogger({
    level: "info",
    format: combine(
        timestamp(),
        errors({ stack: true }),
        printf(({ level, message, timestamp, stack }) => {
            return stack
                ? `${timestamp} [${level.toUpperCase()}]: ${message} \nStack: ${stack}\n`
                : `${timestamp} [${level.toUpperCase()}]: ${message}\n`;
        })
    ),
    transports: [new winston.transports.File({ filename: path.join(process.cwd(), "logs/server.log") })],
})